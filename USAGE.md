# Usage Guide

## Repository Model

This repository is a branch-per-template repository:

- `main`: index, selection guide, AI instructions.
- each template branch: one complete forkable template repository.

The branch root is the template root. There is no shared runtime code across template branches.

## AI Selection Algorithm

Use this deterministic selection flow:

1. Load `TEMPLATE_INDEX.json`.
2. If the user specifies a branch, use that branch.
3. If the user specifies backend/frontend, filter by `category`.
4. If the user specifies language/runtime, filter by `runtime`.
5. If the user specifies framework or UI library, filter by `framework` or `ui`.
6. If the user specifies domain/product type, filter by `profiles`.
7. Prefer templates where `fit` is `recommended`.
8. Clone the selected branch with `--single-branch`.
9. Inside the cloned template, read `template.json`, `profiles/index.json`, and `docs/ENGINEERING_SPEC.md`.

## Clone Commands

```bash
git clone --single-branch --branch <template-branch> git@github.com:jfcwrlight/templates.git <project-dir>
```

```bash
git clone --single-branch --branch <template-branch> https://github.com/jfcwrlight/templates.git <project-dir>
```

## Backend Examples

FastAPI service:

```bash
git clone --single-branch --branch python-fastapi-template git@github.com:jfcwrlight/templates.git api-service
cd api-service
python -m venv .venv
. .venv/bin/activate
pip install -e ".[dev]"
pytest
uvicorn app.main.run:make_app --factory --reload
```

go-zero service:

```bash
git clone --single-branch --branch go-gozero-template git@github.com:jfcwrlight/templates.git commerce-service
cd commerce-service
go test ./...
go run . -f etc/backend.yaml
```

NestJS service:

```bash
git clone --single-branch --branch node-nestjs-template git@github.com:jfcwrlight/templates.git node-api
cd node-api
npm ci
npm test
npm run build
PORT=3001 npm start
```

## Frontend Examples

React Ant Design app:

```bash
git clone --single-branch --branch react-antd-template git@github.com:jfcwrlight/templates.git admin-ui
cd admin-ui
npm ci
npm test
npm run build
npm run dev
```

Vue Naive UI app:

```bash
git clone --single-branch --branch vue-naive-ui-template git@github.com:jfcwrlight/templates.git media-ui
cd media-ui
npm ci
npm test
npm run build
npm run dev
```

## Maintenance Rules

- Add a new template as a new branch.
- Update `TEMPLATE_INDEX.json` on `main` when adding or changing a branch.
- Keep each template branch independently runnable.
- Keep `main` free of template implementation source.
- Do not merge template branches into `main`.
