# React Material UI Engineering Spec

Use this template for polished product dashboards, SaaS consoles, and content/product applications that benefit from Material UI's theme system.

## Invariants

- The entrypoint stays `src/main.tsx`.
- Theme setup lives in `src/app/App.tsx` until it becomes large enough for `src/app/theme.ts`.
- Feature code lives under `src/features/{feature}`.
- Feature model files stay framework-independent.
- API and config boundaries stay under `src/shared`.

## Layer Rules

- Components may import Material UI.
- Feature models and API clients must not import React or Material UI.
- UI state should be local until it is shared by multiple routes.
- Tenant or workspace context must be explicit in API clients.
- Persistent UI preferences should be isolated behind a typed storage helper before broad use.

## Profile Rules

- `saas_console` and `content_site` are the preferred profiles.
- `admin_console` is supported when product density is moderate.
- Add profile pages as feature directories, not as one large component.

## Testing

- Unit test feature model logic.
- Add DOM tests before shipping complex forms, dialogs, or route guards.
- Build must pass `npm run build`.
