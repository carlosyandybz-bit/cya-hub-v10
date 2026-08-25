# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. This file must agree with `.cya/project-state.yaml` and the Drive Roadmap Vivo.

## Current position

**Global status:** FASE 0 — EN CURSO  
**Phase:** FASE 0 — FUNDACIÓN, GOBERNANZA Y BOOTSTRAP  
**Last completed subphase:** 0.3 — Naming, repositorio, workspace, ramas y entornos — PASS  
**Active subphase:** 0.4 — Variables, secretos, accesos, seguridad y límites operativos — EN CURSO  
**Active action:** obtain the exact user-approved first decision within 0.4 without inferring defaults  
**Incremental cost target:** 0 EUR

## Mandatory no-assumptions and user-approval policy

- No agent may assume, infer, extrapolate, select defaults, complete missing decisions or introduce tools, workflows, services, procedures, architecture or criteria that the user has not explicitly established or approved.
- If information is missing, ambiguous, contradictory or admits several choices, the agent must stop and ask the user before acting.
- Every proposal, decision, documentary modification, technical change, tool, procedure, action, audit result, acceptance criterion, state change and phase/subphase progression requires explicit user review and acceptance before it is considered approved, closed or executable.
- An explicit user instruction authorizes only the exact action and scope stated; it does not authorize derived or opportunistic work.
- No PASS, ✅, gate closure or progression may be recorded without explicit user acceptance.
- Antigravity is not part of CYA Hub v10 unless the user explicitly changes that decision.

## 0.2 — Closeout

**Result: PASS.**

The legacy and decision-source policy was applied to the living governance and operational state, reviewed by the user and explicitly approved for closure.

## 0.3 — Approved decisions

The user explicitly approved:

- Official project name: **CYA Hub v10**.
- Official repository name: `cya-hub-v10`.
- Workspace policy: the `cya-hub-v10` repository is the single versioned technical workspace for CYA Hub v10.
- Subphase 0.3 does not establish any internal subdivision, monorepo or additional workspace system.
- Any later internal workspace structure requires a later architectural need and explicit user approval before it becomes project policy.
- Branch policy: `main` is the stable principal branch.
- Each specific change is worked in a temporary branch and then integrated into `main`.
- There is no permanent `develop` branch.
- The branch policy applies to all versioned repository artifacts, including code, documentation, GitHub Actions workflows and project tooling such as CYA Browser Lab when that tooling is built under its separately authorized subphase.
- This branch-policy decision does not authorize construction or activation of T01 CYA Browser Lab or any other pending tooling.
- Environment policy defines three logical environments: `VALIDATION`, `STAGING` and `PRODUCTION`.
- `VALIDATION` is temporary and associated with change branches and GitHub Actions/project tooling when each tool is separately authorized; it does not require a permanent server.
- `STAGING` is the deployed pre-production environment for integral validation and acceptance and must represent production sufficiently for that acceptance to be valid.
- `PRODUCTION` is the real CYA Hub v10 environment. Hostinger remains the hosting target, subject to the separately planned verification of real hosting capabilities.
- Integration into `main` does not itself authorize or trigger a production deployment.
- No permanent `development` environment or mandatory preview-environment system is established by 0.3.
- The physical location and deployment mechanism for staging remain deferred until infrastructure capabilities are verified.
- Variables, secrets and per-environment credentials are outside 0.3 and remain for their separately governed scope.
- This environment-policy decision does not construct, activate or deploy any environment or pending Txx tooling.
- Closeout criteria: naming, repository, workspace, branches and environments must all be registered and coherent; no decision intrinsic to 0.3 may remain pending; Roadmap Vivo, `CURRENT.md` and `.cya/project-state.yaml` must agree; and the user must review the closeout evidence and explicitly approve the closeout.

## 0.3 — Closeout

**Result: PASS.**

All intrinsic 0.3 decision areas were defined and approved, the closeout criteria were satisfied, the closeout evidence was presented to the user, and the user explicitly approved closing 0.3 with PASS.

This closeout does **not** construct or activate T01–T11, create or deploy environments, or authorize any other later action.

## 0.4 — Opened

**Status: EN CURSO.**

The user explicitly authorized starting 0.4 — Variables, secretos, accesos, seguridad y límites operativos.

No internal 0.4 decision has yet been approved. Opening 0.4 does not itself authorize creating or changing variables or secrets, modifying access, changing security settings, constructing security tooling, creating/deploying environments, or executing any Txx capability.

Existing universal rules already recorded in the Guía Maestra and repository governance remain in force unless the user explicitly approves a change.

## Next action

**PENDING USER DECISION:** define the exact first decision within 0.4. No internal order, policy detail, storage mechanism, access model, security setting or operational limit may be selected automatically.

Do **not** close 0.4, start 0.5, construct T01–T11, create/deploy environments or execute any other new project action without explicit user approval for that exact action.

## Deferred — do not execute without explicit approval

- 0.5 and every later Phase 0 subphase.
- T01–T11 and any other technical capability not explicitly approved for execution.
- Physical staging implementation and environment deployment details until their applicable approved subphase/action.

## Living sources

- Roadmap Vivo: https://docs.google.com/document/d/1yTYr1eS_b3cuODTyC2yz1uEGsB2-n0Ba0WdrPrPs4Bo/edit
- Tool Guide: https://docs.google.com/document/d/1eDWjwqQhk8lQNeiDuzShzD9tJbtvzlqIk-jEazGXF0A/edit
- Repository: https://github.com/carlosyandybz-bit/cya-hub-v10
