# Python FastAPI Template

Advanced FastAPI backend template built from vetted upstream patterns:

- FastAPI official full-stack template: production FastAPI, SQLModel/Alembic/Docker/test baseline.
- `ivan-borovets/fastapi-clean-example`: Clean Architecture, CQRS, UoW, DI, contextual RBAC patterns.
- `fastapi-practices/fastapi-best-architecture`: observability, RBAC, middleware, plugin-oriented enterprise structure.

This template is intended for large backend services, not route demos.

## Quick Start

```bash
python -m venv .venv
. .venv/bin/activate
pip install -e ".[dev]"
uvicorn app.main.run:make_app --factory --reload
pytest
```

## Structure

```text
src/app/main/                  Composition root, config, dependency wiring.
src/app/api/routes/             HTTP adapters.
src/app/core/                   Settings, security, observability, shared policies.
src/app/contexts/identity/      Bounded context with domain/application/ports/adapters.
src/app/outbound/               External infrastructure adapters.
tests/                          Unit and API smoke tests.
```

## Add A Feature

1. Add domain objects under `contexts/<context>/domain`.
2. Add use cases under `contexts/<context>/application`.
3. Define ports before adapters.
4. Put FastAPI route code under `api/routes`.
5. Add migrations under `outbound/persistence_sqla/alembic`.

## Profiles And Engineering Rules

- Product profiles live in `profiles/index.json`.
- Framework-specific engineering rules live in `docs/ENGINEERING_SPEC.md`.
- Recommended profiles: `video_platform`, `saas_multitenant`.
- Supported profiles: `traditional_web`, `commerce`.
- Secondary profile: `game_backend`.

## Upstream Attribution

See `UPSTREAM_LICENSES.md`.
