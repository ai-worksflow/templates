# Vue Naive UI Engineering Spec

Use this template for Vue SaaS dashboards, media consoles, and themeable business applications.

## Invariants

- The entrypoint stays `src/main.ts`.
- Vue SFC pages live under `src/features/{feature}`.
- Feature model files stay framework-independent.
- API and config boundaries live under `src/shared`.
- Theme/provider setup lives in `src/app/App.vue`.

## Layer Rules

- SFC pages may import Naive UI components directly.
- Feature model files must not import Vue or Naive UI.
- Long-running job and realtime state must be represented as typed feature state.
- API clients must translate transport errors once.
- Cross-page state should become a dedicated composable before global store adoption.

## Profile Rules

- `saas_console` and `media_dashboard` are preferred.
- Keep dashboard components feature-local until reused.
- Model job/progress states before adding upload or realtime adapters.

## Testing

- Unit test feature state and status mapping.
- Add component tests before shipping upload, modal, or large form flows.
- Build must pass `npm run build`.
