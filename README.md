# Go Kratos Template

Advanced Go backend template using Kratos directly.

## Upstream

- `go-kratos/kratos`, MIT License.

## Quick Start

```bash
go mod tidy
go test ./...
go run ./cmd/server
```

## Structure

```text
cmd/server/        Process entrypoint.
internal/conf/     Typed config.
internal/server/   HTTP/gRPC transport wiring.
internal/service/  Interface service layer.
internal/biz/      Domain and use cases.
internal/data/     Persistence adapters.
api/               Proto/OpenAPI contract location.
configs/           Runtime configs.
```

## Profiles And Engineering Rules

- Product profiles live in `profiles/index.json`.
- Framework-specific engineering rules live in `docs/ENGINEERING_SPEC.md`.
- Recommended profiles: `video_platform`, `game_backend`.
- Supported profiles: `commerce`, `saas_multitenant`.
- Secondary profile: `traditional_web`.

This template keeps Kratos as a framework dependency and leaves protobuf code generation as an explicit next step for real services.
