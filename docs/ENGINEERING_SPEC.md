# Python Django Engineering Spec

This template is for admin-heavy, workflow-heavy, and traditional business systems where Django ORM, auth, admin, forms, templates, settings, and Celery are first-class project primitives.

## Fixed Invariants

- The process entrypoint stays `manage.py`.
- Runtime settings remain split under `config/settings/`.
- Domain apps live under `apps/{module}`.
- `apps/users` remains the custom user boundary.
- Business writes go through services, not directly through views or admin actions.
- Read composition should be isolated in selectors/query helpers when queries become non-trivial.

## Profile Usage

- Read `profiles/index.json` before adding feature code.
- For each profile module, create `apps/{module}` with `models.py`, `services.py`, `selectors.py`, `admin.py`, `views.py`, `urls.py`, and `tasks.py` as needed.
- Register apps in `config/settings/base.py`.
- Register URL groups in `config/urls.py`.
- Use Django admin for operational surfaces only; do not hide core state transitions inside admin classes.

## App Rules

| File | Responsibility | Avoid |
| --- | --- | --- |
| `models.py` | Persistent models, constraints, indexes, lightweight model methods | Provider SDK calls, network calls |
| `services.py` | Commands, transactions, state transitions, integration orchestration | Rendering and request parsing |
| `selectors.py` | Query/read-model composition | Writes and side effects |
| `admin.py` | Admin display, filters, safe admin actions | Complex business rules |
| `views.py` | Request parsing, form/API response mapping | Direct model mutation when service exists |
| `tasks.py` | Celery job entrypoints calling services | Business logic duplicated from services |

## Protocols

- Traditional web routes and admin routes should remain explicit in `urls.py`.
- API endpoints should still call `services.py` for writes.
- Events are represented as service-level calls or Celery tasks until a broker abstraction is introduced.
- External callbacks must be isolated in callback views and verified before service calls.

## Middleware And Security

- Keep Django security middleware enabled unless there is a documented runtime reason.
- Auth and permissions should use Django auth primitives where possible.
- Tenant-aware apps must scope querysets in managers/selectors and validate tenant membership in services.
- Admin actions must check permissions and record audit entries for state changes.
- CSRF policy changes require a documented API/callback boundary.

## Data And Infrastructure

- Migrations are mandatory for model changes.
- Add database constraints for business invariants that must survive concurrency.
- Use `select_for_update` or equivalent transaction controls for order/payment/inventory/economy state changes.
- Object storage, payment, email, and media providers should be wrapped by service-level adapters.
- Cache keys must include tenant/user/profile dimensions where relevant.

## Jobs And Events

- Profile jobs map to Celery tasks in `apps/{module}/tasks.py`.
- Celery tasks should call services, not duplicate service logic.
- Retried jobs must be idempotent.
- Periodic tasks must have clear ownership and monitoring.

## Testing Standard

- Every service method with writes must have model-level tests.
- Every permission boundary needs allowed and denied tests.
- Admin actions need tests when they mutate state.
- Provider callbacks need duplicate-delivery and invalid-signature tests.
- Tenant-aware selectors need cross-tenant leakage tests.

## Feature Done Criteria

- App is registered in settings.
- Models have migrations and constraints.
- Writes are implemented in services.
- Admin and URL registration are explicit.
- Tests cover service behavior and permissions.
- Profile events/jobs are implemented or stubbed with tests.
