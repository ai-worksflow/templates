# React shadcn-style Template

TypeScript + Vite + React template with local UI primitives inspired by shadcn/ui's copy-and-own component model.

## Quick Start

```bash
npm install
npm test
npm run build
npm run dev
```

The protected frontend baseline includes Playwright for browser verification.
Product suites belong under `e2e/` and can be run with `npm run test:e2e` once
the application and its API dependencies are ready. Development requests to
`/api` proxy to the local API service, while the production image serves the
SPA and same-origin API traffic through a non-root Nginx process.

## Structure

```text
src/app/                 Application shell.
src/components/ui/       Local UI primitives owned by the app.
src/features/            Product features and pages.
src/shared/api/          API client boundaries.
src/shared/config/       Runtime config.
src/shared/lib/          Shared helpers.
e2e/                     Product browser journeys.
playwright.config.ts     Browser verification configuration.
profiles/index.json      Product profile mapping.
docs/ENGINEERING_SPEC.md Engineering rules.
```
