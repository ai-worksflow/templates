# Maintenance Guide

## Branch Model

- `main` is the index and guide branch.
- Every template is a standalone branch.
- A template branch root is the template root.
- Never merge template implementation files into `main`.

## Update Cadence

| Area | Frequency | Action |
| --- | --- | --- |
| Security audit | weekly or on demand | Run production dependency audit for Node templates, `pip check` for Python, `go mod verify` for Go. |
| Dependency refresh | monthly | Update lockfiles and rerun validation gates. |
| Framework major versions | quarterly review | Evaluate upgrade cost in a separate branch before replacing a template branch. |
| Profile and decision matrix | whenever product coverage changes | Update `TEMPLATE_INDEX.json`, `DECISION_MATRIX.json`, and docs together. |
| Validation reports | after every template update | Re-run startup/build/browser checks and update validation summaries. |

## Adding A Template

1. Create a new branch named `<runtime-or-framework>-<ui-or-framework>-template`.
2. Add a complete runnable template at the branch root.
3. Include:
   - `README.md`
   - `template.json`
   - `profiles/index.json`
   - `docs/ENGINEERING_SPEC.md`
   - dependency lockfile if the ecosystem supports one
4. Run the validation gates.
5. Push the branch.
6. Update `main`:
   - `TEMPLATE_INDEX.json`
   - `VALIDATION_SUMMARY.md`
   - `DECISION_MATRIX.json` if the new template changes selection behavior

## Deprecating A Template

Do not delete branches immediately.

1. Mark the template as `deprecated` in `TEMPLATE_INDEX.json`.
2. Add a replacement branch in the template entry.
3. Add a note to `VALIDATION_SUMMARY.md`.
4. Keep the branch available until all known downstream workflows migrate.

## Security Rules

- High or critical production dependency vulnerabilities block `ready` status.
- If an upstream package has a delayed patch, use explicit dependency overrides only when tests, build, startup, and smoke checks pass.
- Record security fixes in the template branch commit message and in validation notes.

## Validation Rules

Backend template updates should pass:

- dependency restore,
- compile/typecheck,
- tests,
- startup smoke,
- health endpoint smoke,
- dependency integrity check.

Frontend template updates should pass:

- `npm ci`,
- unit tests,
- typecheck,
- production build,
- desktop and mobile browser smoke,
- production dependency audit.

## Versioning

This repository does not use one global semantic version because each branch is independent.

Use branch commit hashes as immutable template versions. When a product fork records provenance, store:

- repository URL,
- template branch,
- commit hash,
- selected profile,
- validation date.
