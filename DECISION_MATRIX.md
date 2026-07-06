# Decision Matrix

Use this matrix when a user describes a product or industry instead of naming a template branch.

The machine-readable source is `DECISION_MATRIX.json`.

## Product Decisions

| Product type | Backend | Frontend | Reason |
| --- | --- | --- | --- |
| Traditional business system | `python-django-template` | `react-antd-template` | Django handles admin/workflow well; Ant Design handles dense enterprise UI. |
| Commerce platform | `go-gozero-template` | `vue-element-plus-template` | go-zero fits transaction APIs; Element Plus fits commerce operations UI. |
| Video/media platform | `python-fastapi-template` | `vue-naive-ui-template` | FastAPI fits workflow/provider orchestration; Naive UI fits media job dashboards. |
| Game backend and portal | `go-gozero-template` | `vanilla-shoelace-template` | Go fits latency-sensitive services; Shoelace fits lightweight portals. |
| SaaS multi-tenant console | `node-nestjs-template` | `react-mui-template` | NestJS fits modular TypeScript backends; MUI fits polished SaaS dashboards. |
| AI/data API product | `python-fastapi-template` | `react-shadcn-template` | FastAPI fits Python data/AI; local UI components support fast iteration. |
| Content or marketing site | `python-django-template` | `vanilla-shoelace-template` | Django handles content/admin; Shoelace keeps frontend lightweight. |

## AI Selection Prompt Shape

When choosing templates, return:

```json
{
  "backend_branch": "python-fastapi-template",
  "frontend_branch": "react-shadcn-template",
  "backend_profile": "saas_multitenant",
  "frontend_profile": "saas_console",
  "clone_commands": [
    "git clone --single-branch --branch python-fastapi-template git@github.com:jfcwrlight/templates.git backend",
    "git clone --single-branch --branch react-shadcn-template git@github.com:jfcwrlight/templates.git frontend"
  ],
  "validation_commands": [
    "cd backend && pytest",
    "cd frontend && npm ci && npm test && npm run build"
  ]
}
```

Prefer explicit user requirements over this matrix. If the user names a framework or branch, use the named branch.
