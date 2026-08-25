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

## Mandatory user authority gate

- Never assume, infer, extrapolate, select a default, fill a missing decision or introduce a tool, workflow, service, procedure, architecture, criterion or permission that the user has not explicitly established or approved.
- If information is missing, ambiguous, contradictory or admits multiple choices, stop and ask the user before acting.
- Best practices, prior experience, model knowledge, industry convention, convenience and connected access are not authorization.
- Every proposal, decision, documentation change, technical change, tool, procedure, action, audit result, acceptance criterion, state change and phase/subphase progression requires explicit user review and acceptance before it is considered approved, closed or executable.
- An explicit user instruction authorizes only the exact action and scope stated. It does not authorize derived or opportunistic work.
- No `PASS`, ✅, gate closure or progression may be recorded without explicit user acceptance. Use `PENDING USER APPROVAL` or equivalent while acceptance is pending.
- Antigravity is not part of CYA Hub v10. Do not use, plan or introduce it unless the user explicitly changes that decision and approves the governance update first.

## Absolute isolation

- CYA Hub v3 and every other legacy project are **LEGACY / READ-ONLY**.
- Never modify, migrate, reuse secrets from, deploy into, or write to legacy repositories, databases, hosting, Drive folders, environments or integrations.
- Legacy may only be consulted with explicit user authorization and only in the user-designated decision area.
- Legacy consultation is for decision reference only. Legacy is never an implementation source.
- Implementation chats and agents must use the CYA Hub v10 decision documents as the source of truth for the decisions they implement.
- This policy does not authorize direct reuse from legacy.

## Mandatory pre-action rule

No relevant action may be executed without first checking whether it exists in the approved tool/action registry and governance guide and whether the user has approved the exact action and scope.

If the action is not registered:

1. Stop execution.
2. Prepare the proposed governance placement and exact scope.
3. Present it to the user for review and acceptance.
4. Register it only after approval.
5. Execute only if the user has also approved that exact execution; otherwise keep it pending or deferred as explicitly decided.

Never create parallel workflows, services, tools or conventions silently.

## Tool discipline

- Use the primary tool defined in `.cya/tool-registry.yaml` only for an approved action.
- Use a fallback only after explicit user approval.
- If no approved route exists, return `BLOCKED TOOLING` instead of improvising.
- Connected access does not authorize using a tool outside its approved purpose.

## Cost discipline

- Default incremental project cost: **0 EUR**.
- Prefer already-paid infrastructure, free tiers, open-source tools and GitHub-hosted automation when they are approved for the exact action.
- Do not purchase, upgrade, top-up, enable paid overages or introduce a paid SaaS without explicit user approval after documenting the free alternative and its concrete limitation.

## Repository and secrets

- GitHub is the source of truth for versioned technical artifacts.
- Never commit passwords, tokens, API keys, private keys, service-role keys, production credentials or real `.env` files.
- Use placeholders in `.env.example` and authorized secret stores for real values.
- Avoid unrelated refactors and speculative changes.

## Evidence and completion

A claim is not evidence. Relevant work must produce the evidence defined by the tool registry and approved phase acceptance criteria.

Evidence does not replace user acceptance. Present the result and evidence to the user, and do not mark the work closed, `PASS`, ✅ or advance until the user explicitly accepts it.

Stop at the exact approved scope. Do not expand scope opportunistically.

## Conversation / handoff awareness

When the active conversation becomes too long, crosses a proposed phase boundary, changes domain substantially or risks precision, recommend a new chat. No phase/subphase progression or handoff is executed without explicit user acceptance.

## User-only operations

When only the user can perform an operation, mark it `USER ACTION REQUIRED` and provide exact steps, expected result, prohibited changes and required evidence. Do not ask the user to do manually what an approved connected tool can safely do.