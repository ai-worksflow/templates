# React Ant Design Engineering Spec

Use this template for dense enterprise applications where tables, forms, filters, drawers, modals, and operational workflows are primary.

## Invariants

- The entrypoint stays `src/main.tsx`.
- UI composition starts in `src/app/App.tsx`.
- Feature pages live in `src/features/{feature}`.
- Pure page state and display models live beside the feature page.
- Shared API clients live in `src/shared/api`.
- Environment reads live in `src/shared/config/env.ts`.

## Layer Rules

- React components may use Ant Design directly.
- Feature model files must not import React or Ant Design.
- API clients must return typed data and translate transport errors once.
- Forms must define validation rules at the UI boundary and pass typed commands to feature actions.
- Tables must keep pagination, filtering, and sorting state explicit.

## Profile Rules

- Read `profiles/index.json` before adding pages.
- `admin_console` and `saas_console` are the preferred profiles.
- Add route/page modules before creating shared components.
- Add shared UI only after the component is used by at least two features.

## Testing

- Model and API mapping logic require unit tests.
- Critical forms require validation tests after a DOM test runner is added.
- Tables require tests for filter/sort model translation.
- Build must pass `npm run build` before publishing the fork.
