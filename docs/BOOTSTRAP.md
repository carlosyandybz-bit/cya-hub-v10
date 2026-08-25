# CYA Hub v10 — Bootstrap technical contract

## Scope

Bootstrap only. No business functionality.

## Runtime boundaries

- Product identity: CYA Hub v10.
- Environments allowed during bootstrap: staging/test.
- Legacy runtime dependencies: 0.
- Supabase: v10 project only (`rxgrhmnhmopxsiqndgmy`).
- Sentry: v10 configuration only when enabled.
- Secrets: never committed; environment variables only.
- Migrations: new history only; none exist during bootstrap.
- Vercel: preview/staging only for certification; production is out of scope unless Dirección explicitly authorizes it.

## Required code boundaries

- surfaces/app
- domain
- application/use-cases
- infrastructure
- integrations
- shared
- tests

Business modules are created only after approved v10 contracts.

## Certification

A green build or CI run is necessary but not sufficient. Bootstrap closure requires the full A–S audit and exact staging SHA evidence.

## Staging trigger

This file records the first post-Vercel-link staging change so Git integration produces a preview deployment from the `staging` branch. That preview, not the automatic `main` deployment, is the candidate environment for bootstrap QA.
