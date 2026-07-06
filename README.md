# Templates

This repository stores reusable project templates as separate Git branches.

The `main` branch is an index and usage guide only. It does not contain template source code. Each template lives in its own branch, and the branch root is the template root.

## AI-Readable Entry Points

- `TEMPLATE_INDEX.json`: canonical machine-readable template catalog.
- `TEMPLATE_INDEX.schema.json`: schema for validating the catalog.
- `TEMPLATE_MANIFEST.schema.json`: target schema for each template branch's `template.json`.
- `DECISION_MATRIX.json`: machine-readable product-to-template selection matrix.
- `AGENTS.md`: instructions for AI coding agents.
- `USAGE.md`: human and workflow usage guide.
- `MAINTENANCE.md`: update, security, validation, and deprecation policy.
- `VALIDATION_SUMMARY.md`: validation status for each template.

## Quick Start

Pick a template branch from `TEMPLATE_INDEX.json`, then clone only that branch:

```bash
git clone --single-branch --branch python-fastapi-template git@github.com:jfcwrlight/templates.git my-service
cd my-service
```

For HTTPS:

```bash
git clone --single-branch --branch react-antd-template https://github.com/jfcwrlight/templates.git my-frontend
cd my-frontend
```

## Template Branches

### Backend

| Branch | Stack | Best fit |
| --- | --- | --- |
| `python-fastapi-template` | Python, FastAPI | API services, video workflows, SaaS APIs |
| `python-django-template` | Python, Django | traditional web, admin-heavy systems, back offices |
| `go-gozero-template` | Go, go-zero | commerce, game services, high-throughput APIs |
| `go-kratos-template` | Go, Kratos | cloud-native microservices, video/game platforms |
| `node-nestjs-template` | Node.js, NestJS | TypeScript backends, SaaS, BFF, modular APIs |

### Frontend

| Branch | Stack | Best fit |
| --- | --- | --- |
| `react-antd-template` | React, Ant Design, TypeScript | enterprise admin and operations consoles |
| `react-mui-template` | React, Material UI, TypeScript | SaaS dashboards and product consoles |
| `react-shadcn-template` | React, local shadcn-style components, TypeScript | modern SaaS and content apps |
| `vue-element-plus-template` | Vue, Element Plus, TypeScript | Vue admin systems and commerce back offices |
| `vue-naive-ui-template` | Vue, Naive UI, TypeScript | themeable SaaS and media dashboards |
| `vanilla-shoelace-template` | Vanilla TypeScript, Shoelace | lightweight portals and embedded apps |

## Workflow

1. Read `TEMPLATE_INDEX.json`.
2. If the task describes a product rather than a branch, read `DECISION_MATRIX.json`.
3. Select by `category`, `profile`, `framework`, `ui`, or `runtime`.
4. Clone the selected branch with `--single-branch`.
5. Read the cloned template's `README.md`.
6. Read the cloned template's `template.json`.
7. Read the cloned template's `profiles/index.json`.
8. Read the cloned template's `docs/ENGINEERING_SPEC.md`.
9. Run the template's validation command from `TEMPLATE_INDEX.json`.

Do not add generated product code to `main`. Product work starts from a template branch fork.
