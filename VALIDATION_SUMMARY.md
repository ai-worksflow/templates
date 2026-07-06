# Validation Summary

Validation date: 2026-07-06

## Backend

| Branch | Commit | Status | Validated gates |
| --- | --- | --- | --- |
| `python-fastapi-template` | `1721440` | ready | dependency restore, compile, pytest, startup, `/healthz`, `/readyz`, `/identity/users`, `pip check` |
| `python-django-template` | `a312e24` | ready | dependency restore, compile, `manage.py check`, startup, `/healthz`, `pip check` |
| `go-gozero-template` | `7febaa6` | ready | `go mod download`, `go test ./...`, startup, `/healthz`, `/identity/users`, `go mod verify` |
| `go-kratos-template` | `c9d2d4f` | ready | `go mod download`, `go test ./...`, startup, `/healthz`, `/identity/users`, `go mod verify` |
| `node-nestjs-template` | `42ef09f` | ready | `npm ci`, `npm test`, `npm run build`, startup, `/healthz`, `/identity/users`, production audit 0 vulnerabilities |

## Frontend

| Branch | Commit | Status | Validated gates |
| --- | --- | --- | --- |
| `react-antd-template` | `902db1a` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |
| `react-mui-template` | `8e80cb3` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |
| `react-shadcn-template` | `72664c5` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |
| `vue-element-plus-template` | `e0728cf` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |
| `vue-naive-ui-template` | `55bfa13` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |
| `vanilla-shoelace-template` | `5596bc4` | ready | `npm ci`, `npm test`, typecheck, build, desktop/mobile browser smoke, production audit 0 vulnerabilities |

## Notes

- Template branches are ready for production-stage feature development.
- Product forks still need product-specific API contract, auth, accessibility, deployment, and load tests.
