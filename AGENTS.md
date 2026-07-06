# AI Agent Instructions

This repository uses one Git branch per project template.

## Required Flow

1. Treat `main` as an index branch only.
2. Read `TEMPLATE_INDEX.json` before choosing a template.
3. Select exactly one template branch unless the user asks for multiple templates.
4. Clone or checkout the selected branch with `--single-branch`.
5. After entering a template branch, read:
   - `README.md`
   - `template.json`
   - `profiles/index.json`
   - `docs/ENGINEERING_SPEC.md`
6. Follow the selected template's validation commands before making broad feature changes.

## Do Not

- Do not scaffold product features on `main`.
- Do not merge template source code into `main`.
- Do not mix UI component systems in one frontend template.
- Do not mix backend frameworks in one backend template.
- Do not rely on prompts alone when the template already defines structure.

## Selection Rules

- For backend API, SaaS API, AI, or video orchestration: prefer `python-fastapi-template`.
- For traditional web, admin-heavy workflows, CMS, CRM, ERP: prefer `python-django-template`.
- For high-throughput commerce, game services, or go-zero style backends: prefer `go-gozero-template`.
- For cloud-native Go microservices: prefer `go-kratos-template`.
- For modular TypeScript backends and BFF: prefer `node-nestjs-template`.
- For enterprise React admin UI: prefer `react-antd-template`.
- For React SaaS dashboards: prefer `react-mui-template` or `react-shadcn-template`.
- For Vue admin and commerce back office: prefer `vue-element-plus-template`.
- For Vue media/SaaS dashboards: prefer `vue-naive-ui-template`.
- For lightweight or embedded frontend apps: prefer `vanilla-shoelace-template`.

## Output Expectations

When answering a user about available templates, name the branch and the clone command.

When starting implementation from a template, keep the template's entrypoint, profile manifest, and engineering spec intact unless the user explicitly asks to change the framework contract.
