# Node NestJS Engineering Spec

This template is for modular TypeScript backends using NestJS modules, dependency injection, guards, interceptors, clean application use cases, and Prisma-ready infrastructure.

## Fixed Invariants

- The process entrypoint stays `src/main.ts`.
- Each bounded context is a Nest module under `src/{module}`.
- Business rules live in `domain` and `application`, not controllers.
- Repository/provider contracts live under `ports`.
- Concrete Prisma/provider implementations live under `infrastructure`.
- Controllers, DTOs, guards, and adapters live under `interfaces` or `src/common`.
- Cross-cutting behavior stays in guards, interceptors, pipes, filters, and providers.

## Profile Usage

- Read `profiles/index.json` before adding feature code.
- Create each profile module with `domain`, `application`, `ports`, `infrastructure`, and `interfaces`.
- Add `{module}.module.ts` and register it in `src/app.module.ts`.
- Add persistent models or enums in `prisma/schema.prisma` only after domain and use cases are clear.
- Keep profile events and jobs as application-level names even before a real queue is added.

## Layer Rules

| Layer | Responsibility | Avoid |
| --- | --- | --- |
| `domain` | Entities, value objects, domain policies, domain errors | Nest decorators, Prisma client |
| `application` | Use cases, command/query handlers, transaction orchestration | HTTP request objects |
| `ports` | Repository/provider/broker interfaces and tokens | Concrete SDK clients |
| `infrastructure` | Prisma, Redis, queues, payment/media/billing SDKs | Business decisions |
| `interfaces` | Controllers, DTOs, request validation, response mapping | Persistence logic |
| `common` | Guards, interceptors, pipes, filters, shared config | Product-specific use cases |

## Protocols

- HTTP controllers should be thin and route to application use cases.
- Realtime gateways should publish state/progress and call use cases for writes.
- Event consumers must call application use cases.
- Provider callbacks must validate signatures before invoking application code.

## Middleware And Security

- Use guards for authentication and coarse permissions.
- Use application policies for ownership, tenant isolation, and state-change authorization.
- Use interceptors for request id, logging, timing, and response metadata.
- Tenant context must be propagated through request-scoped providers or explicit command fields.
- Rate limits are required for commerce, video callback/upload, game, and SaaS public APIs.

## Data And Infrastructure

- Prisma models are persistence details; do not use Prisma types as domain entities.
- Infrastructure adapters map between Prisma records and domain/application DTOs.
- Provider SDKs must be hidden behind ports.
- Cache keys must include tenant/user/profile dimensions where relevant.
- Queue jobs should carry idempotency keys and profile event names.

## Jobs And Events

- Profile jobs should be application services first, queue processors second.
- Retried jobs must be idempotent.
- Event names should match `profiles/index.json`.
- Webhook/event delivery should record attempts and terminal failure reasons.

## Testing Standard

- Use cases need unit tests with fake ports.
- Controllers need tests for validation, auth propagation, and response mapping.
- Guards/interceptors need focused tests when behavior changes.
- Prisma adapters need integration tests once real database setup is added.
- Tenant-aware modules need cross-tenant access denial tests.

## Feature Done Criteria

- Module is registered in `src/app.module.ts`.
- Domain code has no Nest or Prisma imports.
- Use cases depend on ports, not concrete adapters.
- Controllers are covered by route-level tests or e2e smoke tests.
- Prisma schema changes are paired with migrations after fork.
- Profile events/jobs are implemented or stubbed with tests.
