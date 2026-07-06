# Go go-zero Template

Advanced Go backend template using go-zero directly.

## Upstream

- `zeromicro/go-zero`, MIT License.
- `evrone/go-clean-template`, MIT License, used as a reference for multi-transport Clean Architecture layout.

## Quick Start

```bash
go mod tidy
go test ./...
go run . -f etc/backend.yaml
```

## Structure

```text
etc/                  go-zero YAML config.
internal/config/      Config embeds rest.RestConf.
internal/svc/         ServiceContext, dependencies, repos.
internal/handler/     HTTP transport handlers.
internal/logic/       Application use cases.
internal/domain/      Domain entities.
internal/repo/        Persistence ports/adapters.
internal/types/       Request/response DTOs.
```

## Profiles And Engineering Rules

- Product profiles live in `profiles/index.json`.
- Framework-specific engineering rules live in `docs/ENGINEERING_SPEC.md`.
- Recommended profiles: `commerce`, `game_backend`.
- Supported profiles: `video_platform`, `saas_multitenant`.
- Secondary profile: `traditional_web`.

This template intentionally keeps go-zero as a framework dependency instead of copying framework internals.
