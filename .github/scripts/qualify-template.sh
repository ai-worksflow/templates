#!/usr/bin/env bash
set -Eeuo pipefail

readonly MODE="${1:-validate}"
readonly MANIFEST='worksflow-template-manifest.json'
readonly OUT_DIR="${QUALIFICATION_OUT_DIR:-${RUNNER_TEMP:-/tmp}/worksflow-template-qualification-${GITHUB_RUN_ID:-local}}"
readonly LOCAL_IMAGE="worksflow-template:${GITHUB_SHA:-local}"
readonly SYFT_IMAGE='anchore/syft@sha256:e86b0ba0b1d2fe8a2e9f96ed9b22033df9781f43b9a7eb27c57e6c89234946bc'
readonly TRIVY_IMAGE='aquasec/trivy@sha256:cffe3f5161a47a6823fbd23d985795b3ed72a4c806da4c4df16266c02accdd6f'
readonly GITLEAKS_IMAGE='zricethezav/gitleaks@sha256:cdbb7c955abce02001a9f6c9f602fb195b7fadc1e812065883f695d1eeaba854'
readonly REGCTL_IMAGE='ghcr.io/regclient/regctl@sha256:d0cda0dabd3c328ff5649502b18913109ecbb4a169db6a91e7089f6f89cd958b'

mkdir -p "$OUT_DIR"

sha256_file() {
  printf 'sha256:%s' "$(sha256sum "$1" | awk '{print $1}')"
}

record_gate() {
  local gate="$1"
  local digest="$2"
  local reference="$3"
  jq -cn \
    --arg gate "$gate" \
    --arg digest "$digest" \
    --arg reference "$reference" \
    --arg invocationId "${GITHUB_RUN_ID:-local}-${GITHUB_RUN_ATTEMPT:-1}" \
    --arg observedAt "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    '{gate:$gate,outcome:"passed",digest:$digest,reference:$reference,producer:"github-actions",invocationId:$invocationId,observedAt:$observedAt}' \
    >> "$OUT_DIR/gates.ndjson"
}

run_manifest_command() {
  local command_name="$1"
  local gate_name="$2"
  local working_directory
  local log_file="$OUT_DIR/${gate_name}.log"
  local toolchain_image
  local -a command

  working_directory="$(jq -er --arg name "$command_name" '.commands[$name].workingDirectory' "$MANIFEST")"
  toolchain_image="$(jq -er '.toolchains[0].image' "$MANIFEST")"
  mapfile -t command < <(jq -er --arg name "$command_name" '.commands[$name].argv[]' "$MANIFEST")
  if [[ ${#command[@]} -eq 0 ]]; then
    echo "manifest command ${command_name} has no argv" >&2
    return 1
  fi
  mkdir -p "$OUT_DIR/toolchain-cache/home" "$OUT_DIR/toolchain-cache/go-mod" "$OUT_DIR/toolchain-cache/go-build" "$OUT_DIR/toolchain-cache/npm"
  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --env HOME=/toolchain-cache/home \
    --env GOMODCACHE=/toolchain-cache/go-mod \
    --env GOCACHE=/toolchain-cache/go-build \
    --env NPM_CONFIG_CACHE=/toolchain-cache/npm \
    --volume "$OUT_DIR/toolchain-cache:/toolchain-cache" \
    --volume "$PWD:/workspace" \
    --workdir "/workspace/${working_directory}" \
    "$toolchain_image" "${command[@]}" \
    2>&1 | tee "$log_file"
  record_gate "$gate_name" "$(sha256_file "$log_file")" "urn:github-actions:${GITHUB_RUN_ID:-local}:${gate_name}"
}

regctl() {
  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --env HOME=/tmp/regctl-home \
    --volume "$HOME/.docker:/tmp/regctl-home/.docker:ro" \
    --volume "$PWD:/work" \
    --volume "$OUT_DIR:/qualification" \
    --workdir /work \
    "$REGCTL_IMAGE" "$@"
}

validate() {
  : > "$OUT_DIR/gates.ndjson"
  mkdir -p "$OUT_DIR/syft-home" "$OUT_DIR/tmp"

  jq -e '
    . as $manifest |
    .schemaVersion == "template-manifest/v1" and
    (.templateId | test("^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")) and
    (.services | length > 0) and
    (.toolchains | length > 0) and
    (["install","lint","typecheck","test","build","start"] | all(. as $name | ($manifest.commands[$name].argv | length > 0))) and
    (.ports | length > 0) and
    (.healthChecks | length > 0) and
    (.lockfiles | length > 0) and
    (.profileDigest | test("^sha256:[0-9a-f]{64}$"))
  ' "$MANIFEST" > "$OUT_DIR/manifest-schema.log"
  record_gate 'manifest_schema' "$(sha256_file "$MANIFEST")" "git:${GITHUB_REPOSITORY:-local}@${GITHUB_SHA:-local}:$MANIFEST"

  git ls-tree -r --full-tree -z HEAD | sha256sum | awk '{print "sha256:" $1}' > "$OUT_DIR/source-tree-digest.txt"
  record_gate 'source_identity' "$(< "$OUT_DIR/source-tree-digest.txt")" "git:${GITHUB_REPOSITORY:-local}@${GITHUB_SHA:-local}"

  test -s LICENSE
  record_gate 'license_spdx' "$(sha256_file LICENSE)" "git:${GITHUB_REPOSITORY:-local}@${GITHUB_SHA:-local}:LICENSE"

  while IFS=$'\t' read -r path expected_digest; do
    test -f "$path"
    actual_digest="$(sha256_file "$path")"
    if [[ "$actual_digest" != "$expected_digest" ]]; then
      echo "lock digest mismatch for $path: got $actual_digest, expected $expected_digest" >&2
      return 1
    fi
  done < <(jq -er '.lockfiles[] | [.path, .digest] | @tsv' "$MANIFEST")
  jq -c '.lockfiles' "$MANIFEST" > "$OUT_DIR/dependency-lock.log"
  record_gate 'dependency_lock' "$(sha256_file "$OUT_DIR/dependency-lock.log")" "git:${GITHUB_REPOSITORY:-local}@${GITHUB_SHA:-local}:locks"

  printf '%s\n' 'ghcr.io/ai-worksflow/templates' > "$OUT_DIR/registry-policy.log"

  run_manifest_command install install
  run_manifest_command lint lint
  run_manifest_command typecheck typecheck
  run_manifest_command test unit_test
  run_manifest_command build build

  docker build --pull --provenance=false --sbom=false \
    --label "org.opencontainers.image.source=https://github.com/${GITHUB_REPOSITORY:-ai-worksflow/templates}" \
    --tag "$LOCAL_IMAGE" . \
    2>&1 | tee "$OUT_DIR/container-build.log"

  local container_id
  local service_id
  local port
  local health_path
  local host_port
  service_id="$(jq -er '.healthChecks[0].serviceId' "$MANIFEST")"
  health_path="$(jq -er '.healthChecks[0].path' "$MANIFEST")"
  port="$(jq -er --arg service "$service_id" '.ports[] | select(.serviceId == $service) | .number' "$MANIFEST" | head -n1)"
  container_id="$(docker run --detach --publish "127.0.0.1::${port}" "$LOCAL_IMAGE")"
  trap 'docker rm -f "$container_id" >/dev/null 2>&1 || true' RETURN
  host_port="$(docker port "$container_id" "${port}/tcp" | awk -F: 'NR==1 {print $NF}')"
  for attempt in $(seq 1 30); do
    if curl --fail --silent --show-error "http://127.0.0.1:${host_port}${health_path}" > "$OUT_DIR/health-response.txt"; then
      break
    fi
    if [[ "$attempt" -eq 30 ]]; then
      docker logs "$container_id" >&2
      return 1
    fi
    sleep 1
  done
  docker rm -f "$container_id" >/dev/null
  trap - RETURN
  record_gate 'start_health' "$(sha256_file "$OUT_DIR/health-response.txt")" "http://container${health_path}"

  jq -e --arg service "$service_id" --argjson port "$port" '
    any(.services[]; .id == $service) and
    any(.ports[]; .serviceId == $service and .number == $port) and
    any(.healthChecks[]; .serviceId == $service) and
    all(.protectedPaths[]; length > 0) and
    all(.extensionPaths[]; length > 0)
  ' "$MANIFEST" > "$OUT_DIR/contract-smoke.log"
  record_gate 'contract_smoke' "$(sha256_file "$OUT_DIR/contract-smoke.log")" "git:${GITHUB_REPOSITORY:-local}@${GITHUB_SHA:-local}:contract"

  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --volume "$PWD:/src:ro" \
    --workdir /src \
    "$GITLEAKS_IMAGE" dir . --no-banner --redact --exit-code=1 \
    2>&1 | tee "$OUT_DIR/secret-scan.log"
  record_gate 'secret_scan' "$(sha256_file "$OUT_DIR/secret-scan.log")" "urn:gitleaks:${GITHUB_SHA:-local}"

  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --group-add "$(stat -c '%g' /var/run/docker.sock)" \
    --env HOME=/out/syft-home \
    --env TMPDIR=/out/tmp \
    --env SYFT_CHECK_FOR_APP_UPDATE=false \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$OUT_DIR:/out" \
    "$SYFT_IMAGE" "$LOCAL_IMAGE" \
      --output spdx-json=/out/syft.spdx.json \
      --output syft-json=/out/syft.json \
    2>&1 | tee "$OUT_DIR/sbom.log"
  jq '
    walk(
      if type == "object" then
        with_entries(select(.value != "NOASSERTION" and .value != "NONE"))
      elif type == "array" then
        map(select(. != "NOASSERTION" and . != "NONE"))
      else . end
    )
  ' "$OUT_DIR/syft.spdx.json" > "$OUT_DIR/admission.spdx.json"
  jq -e '
    .spdxVersion == "SPDX-2.3" and
    .dataLicense == "CC0-1.0" and
    .SPDXID == "SPDXRef-DOCUMENT" and
    (.packages | length > 0)
  ' "$OUT_DIR/admission.spdx.json" > /dev/null

  mkdir -p "$OUT_DIR/trivy-cache"
  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --group-add "$(stat -c '%g' /var/run/docker.sock)" \
    --env HOME=/out/syft-home \
    --env TMPDIR=/out/tmp \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$OUT_DIR:/out" \
    "$TRIVY_IMAGE" image \
      --cache-dir /out/trivy-cache \
      --scanners vuln \
      --severity HIGH,CRITICAL \
      --exit-code 1 \
      --format json \
      --output /out/runtime-vulnerability.json \
      "$LOCAL_IMAGE"
  docker run --rm \
    --user "$(id -u):$(id -g)" \
    --env HOME=/out/syft-home \
    --env TMPDIR=/out/tmp \
    --volume "$PWD:/src:ro" \
    --volume "$OUT_DIR:/out" \
    --workdir /src \
    "$TRIVY_IMAGE" filesystem \
      --cache-dir /out/trivy-cache \
      --scanners vuln \
      --severity HIGH,CRITICAL \
      --exit-code 1 \
      --include-dev-deps \
      --skip-dirs node_modules \
      --format json \
      --output /out/source-vulnerability.json \
      .
  jq -s '{schemaVersion:"worksflow-vulnerability-evidence/v1",reports:.}' \
    "$OUT_DIR/runtime-vulnerability.json" "$OUT_DIR/source-vulnerability.json" \
    > "$OUT_DIR/vulnerability.json"
  jq -e '
    (.reports | length == 2) and
    all(.reports[]; .SchemaVersion >= 2 and (.Results == null or (.Results | type == "array")))
  ' "$OUT_DIR/vulnerability.json" > /dev/null
  record_gate 'vulnerability' "$(sha256_file "$OUT_DIR/vulnerability.json")" "urn:trivy:${GITHUB_SHA:-local}"

  jq -s 'sort_by(.gate)' "$OUT_DIR/gates.ndjson" > "$OUT_DIR/gates.json"
}

publish() {
  if [[ -z "${GHCR_TOKEN:-}" || -z "${GITHUB_ACTOR:-}" || -z "${GITHUB_REPOSITORY:-}" || -z "${GITHUB_SHA:-}" ]]; then
    echo 'GHCR_TOKEN, GITHUB_ACTOR, GITHUB_REPOSITORY, and GITHUB_SHA are required for publish' >&2
    return 1
  fi
  if [[ "${GITHUB_EVENT_NAME:-}" != 'push' || "${GITHUB_REF_NAME:-}" != codex/qualify-* ]]; then
    echo 'publishing is restricted to a push on codex/qualify-*' >&2
    return 1
  fi

  local repository
  local image_tag
  local image_digest
  local image_reference
  local sbom_tag
  local sbom_digest
  local sbom_reference
  repository="ghcr.io/${GITHUB_REPOSITORY,,}"
  image_tag="${repository}:qualified-${GITHUB_SHA}"
  sbom_tag="${repository}:sbom-${GITHUB_SHA}"

  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io --username "$GITHUB_ACTOR" --password-stdin
  docker tag "$LOCAL_IMAGE" "$image_tag"
  docker push "$image_tag" 2>&1 | tee "$OUT_DIR/image-push.log"
  regctl image mod "$image_tag" --to-oci --replace
  image_digest="$(regctl manifest head "$image_tag" --require-digest)"
  image_reference="${repository}@${image_digest}"
  record_gate 'registry_policy' "$(sha256_file "$OUT_DIR/registry-policy.log")" "$image_reference"
  record_gate 'container_build' "$image_digest" "$image_reference"

  jq -n \
    --arg name "$image_reference" \
    --arg digest "${image_digest#sha256:}" \
    --slurpfile predicate "$OUT_DIR/admission.spdx.json" \
    '{_type:"https://in-toto.io/Statement/v1",subject:[{name:$name,digest:{sha256:$digest}}],predicateType:"https://spdx.dev/Document",predicate:$predicate[0]}' \
    > "$OUT_DIR/sbom.intoto.json"
  printf '{}\n' > "$OUT_DIR/empty-oci-config.json"
  regctl artifact put \
    --artifact-type 'application/vnd.in-toto+json' \
    --subject "$image_reference" \
    --config-type 'application/vnd.oci.empty.v1+json' \
    --config-file '/qualification/empty-oci-config.json' \
    --file '/qualification/sbom.intoto.json' \
    --file-media-type 'application/vnd.in-toto+json' \
    "$sbom_tag"
  sbom_digest="$(regctl manifest head "$sbom_tag" --require-digest)"
  sbom_reference="${repository}@${sbom_digest}"

  jq -n \
    --arg imageReference "$image_reference" \
    --arg referrerReference "$sbom_reference" \
    --arg sourceCommit "$GITHUB_SHA" \
    '{schemaVersion:"worksflow-template-qualification-refs/v1",sourceCommit:$sourceCommit,imageReference:$imageReference,referrerReference:$referrerReference}' \
    > "$OUT_DIR/registry-refs.json"
  record_gate 'sbom' "$(sha256_file "$OUT_DIR/sbom.intoto.json")" "$sbom_reference"
  jq -s 'sort_by(.gate)' "$OUT_DIR/gates.ndjson" > "$OUT_DIR/gates.json"
  docker logout ghcr.io >/dev/null
}

case "$MODE" in
  validate) validate ;;
  publish) publish ;;
  *) echo "usage: $0 validate|publish" >&2; exit 2 ;;
esac
