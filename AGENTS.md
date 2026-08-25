# CYA Hub v10 — Agent Operating Rules

This repository belongs exclusively to **CYA Hub v10**.

## Mandatory bootstrap before any substantive action

1. Read `CURRENT.md`.
2. Read `.cya/project-state.yaml`.
3. Read `.cya/tool-registry.yaml`.
4. Read `.cya/planning-template.md` before technical execution.
5. Consult the living Google Drive governance documents when the connected environment provides access:
   - Roadmap Vivo de Fases, Subfases y Auditorías.
   - Guía Maestra de Herramientas, Agentes y Planning Operativo.
6. Identify the current phase, subphase, action and acceptance gate.
7. Produce a `TOOL PLAN` before any significant technical action.

## Absolute isolation

- CYA Hub v3 and every other legacy project are **LEGACY / READ-ONLY**.
- Never modify, migrate, reuse secrets from, deploy into, or write to legacy repositories, databases, hosting, Drive folders, environments or integrations.
- Legacy may only be consulted as an explicit functional/historical reference when the current phase authorizes it.

## Mandatory pre-action rule

No relevant action may be executed without first checking whether it exists in the approved tool/action registry and governance guide.

If the action is not registered:

1. Stop execution.
2. Determine the correct place for the action in the governance model.
3. Register/document it first.
4. Decide whether it is an immediate dependency or a deferred capability.
5. Execute only if it is the correct next step; otherwise mark it deferred and continue the current plan.

Never create parallel workflows, services, tools or conventions silently.

## Tool discipline

- Use the primary tool defined in `.cya/tool-registry.yaml`.
- Use a fallback only when the primary tool is unavailable and the fallback is explicitly allowed.
- If no approved route exists, return `BLOCKED TOOLING` instead of improvising.
- Connected access does not authorize using a tool outside its approved purpose.

## Cost discipline

- Default incremental project cost: **0 EUR**.
- Prefer already-paid infrastructure, free tiers, open-source tools and GitHub-hosted automation.
- Do not purchase, upgrade, top-up, enable paid overages or introduce a paid SaaS without explicit user approval after documenting the free alternative and its concrete limitation.

## Repository and secrets

- GitHub is the source of truth for versioned technical artifacts.
- Never commit passwords, tokens, API keys, private keys, service-role keys, production credentials or real `.env` files.
- Use placeholders in `.env.example` and authorized secret stores for real values.
- Avoid unrelated refactors and speculative changes.

## Evidence and completion

A claim is not evidence. Relevant work must produce the evidence defined by the tool registry and phase acceptance criteria.

Typical evidence includes commit/PR, CI run, browser report, security finding/rerun, migration validation, deployment version, smoke test or documentation update.

Stop when the scoped acceptance gate passes. Do not expand scope opportunistically.

## Conversation / handoff awareness

When the active conversation becomes too long, crosses a phase boundary, changes domain substantially or accumulates enough context to risk precision, recommend a new chat before quality degrades. Before handoff, update `CURRENT.md`, `.cya/project-state.yaml`, the Roadmap and applicable phase documentation, then provide an exact handoff prompt.

## User-only operations

When only the user can perform an operation, mark it `USER ACTION REQUIRED` and provide exact steps, expected result, prohibited changes and required evidence. Do not ask the user to do manually what an approved connected tool can safely do.
