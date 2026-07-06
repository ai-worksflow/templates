# Python FastAPI Engineering Spec

This template is for API-first backend services that need Clean Architecture, CQRS-style use cases, ports/adapters, and explicit dependency wiring.

## Fixed Invariants

- The process entrypoint stays `app.main.run:make_app`.
- Bounded contexts live under `src/app/contexts/{context}`.
- FastAPI routes are adapters only; business rules stay in application use cases and domain objects.
- Repository, provider, queue, object storage, and billing/media/payment dependencies are ports before adapters.
- `src/app/main/ioc.py` is the composition root for concrete implementations.
- Framework objects must not leak into domain models or repository ports.

## Profile Usage

- Read `profiles/index.json` before adding feature code.
- Use `profiles[index].implementation_order` as the default module creation order.
- Create each module at `src/app/contexts/{module}` with `domain`, `application`, `ports`, and `adapters`.
- Add HTTP routes at `src/app/api/routes/{module}.py`.
- Register routers and dependencies in `src/app/main/run.py` and `src/app/main/ioc.py`.
- Keep profile events and jobs as application-level names even before a real broker is added.

## Layer Rules

| Layer | Allowed | Forbidden |
| --- | --- | --- |
| `domain` | Entities, value objects, domain services, domain errors | FastAPI, SQLAlchemy sessions, HTTP status codes |
| `application` | Commands, queries, handlers, UoW orchestration, transaction policy | Raw framework request/response objects |
| `ports` | Repository/provider/broker interfaces | Concrete SDK clients |
| `adapters` | SQLAlchemy, Redis, S3, Kafka/NATS/RabbitMQ, provider SDKs | Business decisions |
| `api/routes` | DTO mapping, auth principal extraction, response mapping | Domain mutation logic |

## Protocols

- HTTP routes must be under `/api/{module}` unless the product contract says otherwise.
- Realtime endpoints should publish read-only state/progress streams; writes still go through application commands.
- Event handlers must be idempotent and call application commands.
- External callbacks, especially payment and media provider callbacks, must verify signatures before state changes.

## Middleware And Security

- `request_id` is required for all profiles.
- `auth_stub` is a replaceable boundary; real auth should expose a principal object to use cases.
- `rate_limit` is required for commerce, video upload/callback, game, and SaaS public APIs.
- Tenant-aware profiles must carry tenant context through command objects and repository ports.
- Do not enforce permission checks only in routes; use application policies where state changes happen.

## Data And Infrastructure

- Start with in-memory or local adapters only for tests and smoke flows.
- Production persistence must be introduced behind existing ports.
- Alembic migrations belong under `src/app/outbound/persistence_sqla/alembic`.
- Cache keys must include tenant/user/profile dimensions where relevant.
- Object storage adapters must keep binary streams out of domain objects.

## Jobs And Events

- Jobs declared by a profile should have an application handler before a worker implementation.
- Job retries must be idempotent and record terminal failure reasons.
- Do not publish integration events from routes; publish after application state changes.

## Testing Standard

- Every module must have a use-case test with in-memory ports.
- Every HTTP route group must have at least one API smoke test.
- Provider callbacks need duplicate-delivery and invalid-signature tests.
- Tenant-aware code needs cross-tenant access denial tests.
- Job handlers need retry/idempotency tests before queue adapters are added.

## Feature Done Criteria

- Module paths match `profiles/index.json`.
- Domain code has no framework imports.
- Public routes are registered and covered by smoke tests.
- New ports have in-memory test adapters.
- Config values are environment-driven.
- Events/jobs declared by the profile are either implemented or explicitly stubbed with tests.
