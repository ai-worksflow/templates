# Go Kratos Engineering Spec

This template is for cloud-native Go microservices using Kratos transport, middleware, config, service, biz, and data boundaries.

## Fixed Invariants

- The process entrypoint stays `cmd/server/main.go`.
- Runtime config stays under `configs/` and typed config packages.
- Transport wiring stays in `internal/server`.
- Service interfaces live in `internal/service`.
- Business use cases and entities live in `internal/biz`.
- Persistence and provider adapters live in `internal/data`.
- External service contracts live under `api/{module}/v1`.

## Profile Usage

- Read `profiles/index.json` before adding feature code.
- Create module contracts under `api/{module}/v1/{module}.proto` before splitting service boundaries.
- Add use cases and domain models in `internal/biz/{module}.go`.
- Add concrete persistence/provider adapters in `internal/data/{module}_repo.go`.
- Expose transport methods in `internal/service/{module}.go`.
- Register routes/middleware in `internal/server`.

## Layer Rules

| Layer | Responsibility | Avoid |
| --- | --- | --- |
| `api` | Proto/OpenAPI contracts, request/response schema | Business rules |
| `internal/service` | Transport-facing service methods, DTO mapping | Persistence logic |
| `internal/biz` | Use cases, aggregates, domain policies, repo interfaces | Kratos transport imports |
| `internal/data` | Repositories, transactions, provider SDKs, cache, queues | HTTP/gRPC request handling |
| `internal/server` | HTTP/gRPC server wiring and middleware | Product-specific branching |

## Protocols

- HTTP and gRPC should expose the same use-case boundary where possible.
- Proto contracts become stable once consumed by other services.
- External callbacks should be HTTP endpoints that call biz use cases after verification.
- Event consumption should call biz use cases, not data adapters directly.

## Middleware And Security

- Use Kratos middleware for recovery, logging, tracing, auth, rate limit, and request metadata.
- Tenant/user/principal metadata should be converted to biz-layer policy inputs.
- Authorization for state changes belongs in biz use cases.
- Public APIs must include request id and structured logs.

## Data And Infrastructure

- Repositories are defined by biz needs, not database table shape.
- Data adapters own SQL/Redis/broker/provider clients and transactions.
- Config changes require typed config updates and `configs/config.yaml` examples.
- PostgreSQL-backed profiles use the protected `pgx` baseline; credentials are supplied through `DATABASE_URL` and never committed.
- Password credentials use `x/crypto` password hashing and must never be stored or logged in plaintext.
- Local media paths are development or single-node adapters; production deployments should mount durable storage or use object storage.
- Message queues, object storage, CDN, payment, and analytics providers stay under `internal/data`.
- Multi-service workflows must rely on idempotent commands and versioned events.

## Jobs And Events

- Profile jobs should start as biz use cases callable by workers.
- Event payloads should be versioned before cross-service consumption.
- Long-running jobs must expose observable state transitions.
- Retries must use business idempotency keys, not transport request ids.

## Testing Standard

- Biz layer needs tests with fake repositories.
- Data adapters need integration tests when real infrastructure is introduced.
- Service tests should cover DTO mapping and permission propagation.
- Contract changes require proto compatibility review.
- Game/video/commerce callbacks need duplicate-delivery tests.

## Feature Done Criteria

- API contract exists for public or cross-service operations.
- Biz package owns state transitions.
- Data package owns concrete persistence/provider clients.
- Server registration is explicit.
- Config changes are typed and represented in example YAML.
- Profile events/jobs are implemented or stubbed with tests.
