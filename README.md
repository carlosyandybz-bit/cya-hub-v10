# CYA Hub v10

Clean-room reconstruction of CYA Hub.

## Bootstrap

CYA Hub v10 is a new and independent product. CYA Hub v3 is LEGACY / READ ONLY / historical-functional reference only.

Runtime dependencies on legacy: **0**.

Current gate: `00 — BOOTSTRAP CLEAN`.

No business functionality is implemented during bootstrap.

## Branches

- `main`: protected promotion target.
- `staging`: bootstrap and staging integration branch.

## Architecture skeleton

- `src/surfaces/app`
- `src/domain`
- `src/application/use-cases`
- `src/infrastructure`
- `src/integrations`
- `src/shared`
- `tests`
- `docs`

Business engines/modules are created only after an approved v10 functional contract.
