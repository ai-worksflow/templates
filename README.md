# Node NestJS Template

Advanced Node.js backend template using NestJS directly.

## Upstream

- `nestjs/nest`, MIT License.
- `andrechristikan/ack-nestjs-boilerplate`, MIT License.
- `aolus-software/clean-nest-prisma-pg`, MIT License.
- `rezawr/nestjs-clean-architecture-boilerplate`, MIT License.

## Quick Start

```bash
npm install
npm test
npm run start:dev
```

## Structure

```text
src/identity/domain/          Entities and domain services.
src/identity/application/     Use cases.
src/identity/ports/           Repository and external service contracts.
src/identity/infrastructure/  Prisma/in-memory adapters.
src/identity/interfaces/      Nest controllers and DTOs.
src/common/                   Guards, interceptors, filters, config.
prisma/                       Schema and migration/seed boundary.
```

This template uses NestJS as the large-project runtime. Fastify-only templates remain available for smaller BFF/API services.
