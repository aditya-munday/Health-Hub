# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### hospital-app (MedCare Hospital Platform) — `/`
- **Type**: React + Vite (frontend-only, no backend)
- **Tech**: React, TypeScript, Tailwind CSS, Context API
- **State**: LocalStorage + React state via Context API
- **Features**:
  - Home page with hero, stats, features, testimonials
  - Doctor Search with specialization filter + appointment booking modal
  - Online Pharmacy with medicine cart, quantity management, fake checkout
  - Blood Bank with real-time availability, location/group/status filters
  - Lab Tests with booking modal and doorstep collection scheduling
  - Authentication (fake login/signup stored in localStorage)
  - Dashboard with appointments, orders, test history, profile
- **Mock data**: `src/data/mockData.ts` — 8 doctors, 12 medicines, 16 blood group entries, 12 lab tests
- **Context**: `src/context/AppContext.tsx` — global state for user, cart, appointments, orders, test bookings

### api-server — `/api`
- **Type**: Express 5 API server
- **Tech**: TypeScript, Drizzle ORM, Zod

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
