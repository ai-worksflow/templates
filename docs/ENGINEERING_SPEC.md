# Go go-zero Engineering Spec

This template is for high-throughput Go services using go-zero as the runtime framework while keeping business code separated from transport and infrastructure.

## Fixed Invariants

- The process entrypoint stays `backend.go`.
- Runtime configuration stays in `etc/backend.yaml` and `internal/config`.
- Shared dependencies are wired in `internal/svc/servicecontext.go`.
- HTTP handlers live under `internal/handler`.
- Application use cases live under `internal/logic`.
- Domain entities live under `internal/domain`.
- Repository and provider boundaries live under `internal/repo` or a module-specific subpackage.

## Profile Usage

- Read `profiles/index.json` before adding feature code.
- Use `profiles[index].implementation_order` as the module creation order.
- For each module, add domain types, logic handlers, request/response DTOs, repositories, and route registration.
- Keep go-zero-specific request parsing in handlers.
- Inject repositories, clients, and policy objects through `ServiceContext`.

## Layer Rules

| Layer | Responsibility | Avoid |
| --- | --- | --- |
| `internal/domain/{module}` | Entities, value objects, domain errors, domain services | `http.Request`, go-zero context, SQL clients |
| `internal/logic/{module}` | Commands, queries, idempotency, transaction orchestration | Direct response writing |
| `internal/handler/{module}` | go-zero HTTP binding, auth principal extraction, response mapping | Business decisions |
| `internal/repo` | Storage/provider interfaces and implementations | Transport DTO dependencies |
| `internal/types` | Request/response DTOs | Domain methods |
| `internal/svc` | Dependency graph and shared clients | Business branching |

## Protocols

- HTTP routes must be registered through `internal/handler/routes.go`.
- Public callback routes must include verification and idempotency in logic before writes.
- Event publishing should happen after state changes in logic, not in handlers.
- Realtime paths should keep transport state outside domain packages.

## Middleware And Security

- Keep request id, logging, timing, auth, and rate limit middleware composable through go-zero routes/server config.
- Do not rely on handler-only authorization for state changes; logic should validate permissions and ownership.
- Commerce and SaaS profiles must use idempotency keys for provider callbacks and commands that can be retried.
- Game hot paths should keep allocations and external calls out of tight loops.

## Data And Infrastructure

- `ServiceContext` owns concrete clients such as SQL, Redis, queue, object storage, payment, media, and analytics clients.
- Repositories expose module-specific interfaces; logic should not know concrete DB drivers.
- Redis/cache usage must be explicit in repo or cache adapters.
- Eventual consistency must be modeled with status fields and idempotent retry handlers.
- Config additions require typed fields in `internal/config/config.go` and YAML entries in `etc/backend.yaml`.

## Jobs And Events

- Profile jobs should be implemented as logic-level functions first.
- Worker processes can reuse the same `ServiceContext` after fork.
- Retried jobs must deduplicate by business key.
- Event payloads should be versioned once consumed by more than one service.

## Testing Standard

- Domain packages need table tests for invariants.
- Logic packages need tests with fake repositories.
- Handler tests should cover request binding and response mapping.
- Callback logic needs duplicate-delivery and invalid-signature tests.
- Race-sensitive game/session code should be tested with `go test -race` in CI.

## Feature Done Criteria

- Route registration is explicit.
- `ServiceContext` wires all concrete dependencies.
- Logic tests pass without network services.
- Config additions are typed and documented in YAML.
- Domain packages do not import transport or infrastructure packages.
- Profile events/jobs are implemented or stubbed with tests.
