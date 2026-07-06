# Vue Element Plus Engineering Spec

Use this template for Vue enterprise admin, commerce back office, and workflow-heavy applications.

## Invariants

- The entrypoint stays `src/main.ts`.
- Vue SFC pages live under `src/features/{feature}`.
- Feature models stay in TypeScript files beside the page.
- API and config boundaries live under `src/shared`.
- Element Plus is registered in `src/main.ts`.

## Layer Rules

- Vue SFCs may use Element Plus directly.
- Feature model files must not import Vue or Element Plus.
- Form submission should map to typed commands before API calls.
- Table filters and pagination should be represented as typed state.
- API clients must translate transport errors once.

## Profile Rules

- `admin_console` and `commerce_storefront` are preferred.
- Create feature directories before introducing shared components.
- Keep complex table/form behavior near the owning feature until reused.

## Testing

- Unit test feature model logic.
- Add component tests before shipping complex forms and dialogs.
- Build must pass `npm run build`.
