# Vanilla Shoelace Engineering Spec

Use this template for framework-light TypeScript applications, embedded portals, content sites, and game/player portals that benefit from Web Components.

## Invariants

- The entrypoint stays `src/main.ts`.
- Rendering starts in `src/app/render-app.ts`.
- Feature state and models live under `src/features/{feature}`.
- API and config boundaries live under `src/shared`.
- Shoelace component imports stay explicit in `src/main.ts` or feature-specific render modules.

## Layer Rules

- Feature model files must not read or mutate the DOM.
- DOM rendering functions must accept a root element and avoid hidden globals.
- API clients must return typed data and translate transport errors once.
- Custom elements should be imported explicitly to keep bundle ownership clear.
- Any dynamic HTML from external data must be escaped before insertion.

## Profile Rules

- `content_site` and `game_portal` are preferred.
- Use this template when React/Vue runtime cost or integration complexity is not needed.
- Keep Web Component usage close to render modules and keep business state in TypeScript models.

## Testing

- Unit test feature model logic.
- Add DOM tests before shipping complex interactive flows.
- Build must pass `npm run build`.
