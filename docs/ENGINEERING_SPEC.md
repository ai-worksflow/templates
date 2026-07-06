# React shadcn-style Engineering Spec

Use this template when local UI component source should be part of the application and product teams need direct control over component behavior and styling.

## Invariants

- The entrypoint stays `src/main.tsx`.
- Local UI primitives live in `src/components/ui`.
- Product pages live under `src/features/{feature}`.
- Shared helpers live under `src/shared`.
- UI primitives should be small, typed, accessible, and easy to copy.

## Layer Rules

- UI primitives may use `class-variance-authority`, `clsx`, and `tailwind-merge`.
- Feature models must not import React or UI primitives.
- Product-specific composition belongs in feature pages, not primitive components.
- API clients stay framework-independent.
- Icons should come from `lucide-react` unless a product-specific icon system replaces it.

## Profile Rules

- `saas_console` and `content_site` are preferred.
- Add missing primitives under `src/components/ui` before building feature-specific variants.
- Keep primitive APIs stable after multiple features depend on them.

## Testing

- Unit test feature model logic.
- Add DOM tests for primitives before heavy reuse.
- Build must pass `npm run build`.
