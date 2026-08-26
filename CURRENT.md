# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. The Drive Roadmap Vivo is the canonical location for approved decisions under their exact phase/subphase. This file summarizes current operational state and must agree with `.cya/project-state.yaml` and the Roadmap Vivo.

## Current position

**Global status:** FASE 0 — EN CURSO  
**Phase:** FASE 0 — FUNDACIÓN, GOBERNANZA Y BOOTSTRAP  
**Last completed subphase:** 0.3 — Naming, repositorio, workspace, ramas y entornos — PASS  
**Active subphase:** 0.4 — Variables, secretos, accesos, seguridad y límites operativos — EN CURSO  
**Active work block:** política de variables y secretos  
**Approved concrete decisions in 0.4:** 12  
**Active action:** obtain the next exact user-approved variables-and-secrets policy decision without inferring specific secret managers, variable values, automation, concrete environment mappings, access changes or operational procedures  
**Incremental cost target:** 0 EUR

## Canonical decision-organization rule

- Every approved decision is documented under the exact phase, subphase, audit or Roadmap point that owns it.
- `PUNTO ACTUAL DEL PROYECTO` is a position/next-action summary, not an accumulated decision archive.
- A transversal decision has one canonical owning point plus cross-references where needed.
- An accepted decision must not remain only in chat or in a generic summary.
- `CURRENT.md` and `.cya/project-state.yaml` mirror operational state; they do not replace the Roadmap's canonical phase/subphase placement.

## PRE-FASE 0 — Context, governance and bootstrap — PASS

Registered under PRE-FASE 0 in the Roadmap:

- Progressive and ordered CYA Hub v10 working model established.
- Google Drive `CYA Hub v10` established as the living documentary source of truth.
- GitHub `carlosyandybz-bit/cya-hub-v10` established as the versioned technical/operational source of truth.
- Roadmap Vivo and mandatory Tool/Agent/Planning Guide created.
- Persistent repository agent context installed (`AGENTS.md`, `.cya/tool-registry.yaml`, `.cya/project-state.yaml`, `.cya/planning-template.md`, `CURRENT.md` and control links).
- Project Instructions configured and Drive context available.
- Clean context reconstruction gate completed with PASS.

## 0.1 — Alcance, principios y metodología operativa — PASS

Canonical decisions are recorded directly under **0.1** in the Roadmap. They include:

- absolute no-assumptions policy;
- ask the user when information is missing, ambiguous, contradictory or admits multiple choices;
- explicit user review and acceptance for proposals, decisions, changes, actions, criteria, audit results, state changes and progression;
- explicit instructions authorize only their exact stated action and scope;
- no PASS, ✅, gate closure or phase/subphase progression without explicit user acceptance;
- connected access, best practices, convention and model knowledge are not authorization;
- Antigravity is not part of CYA Hub v10 unless explicitly re-approved and governance is updated;
- mandatory Guide review before relevant action and TOOL PLAN for significant technical work;
- default incremental cost 0 EUR;
- evidence does not replace user acceptance;
- USER ACTION REQUIRED protocol for user-only operations;
- controlled conversation/handoff policy.

**Closeout:** PASS after explicit user acceptance.

## 0.2 — Aislamiento absoluto respecto al legacy y política de reutilización — PASS

Canonical decisions are recorded directly under **0.2** in the Roadmap. They include:

- all legacy is READ-ONLY, including CYA Hub v3;
- legacy consultation requires explicit user authorization and is limited to the user-designated decision area;
- consultation purpose is decision reference only;
- legacy is never an implementation source;
- implementation consumes accepted CYA Hub v10 decision documents;
- direct reuse of legacy code, components, assets, configuration, technical structures or other artifacts is not authorized;
- modification, migration, deployment into legacy, writing to legacy and reuse of legacy secrets are prohibited.

**Closeout:** PASS after explicit user acceptance.

## 0.3 — Naming, repositorio, workspace, ramas y entornos — PASS

Canonical decisions are recorded directly under **0.3** in the Roadmap. Operational summary:

- Official project name: **CYA Hub v10**.
- Official repository: `cya-hub-v10`.
- Repository is the single versioned technical workspace; no monorepo/internal subdivision/additional workspace system was established by 0.3.
- `main` is the stable principal branch.
- Each specific change uses a temporary branch before integration into `main`; no permanent `develop` branch.
- Branch policy applies to all versioned artifacts and does not authorize pending Txx tooling.
- Logical environments: `VALIDATION`, `STAGING`, `PRODUCTION`.
- `VALIDATION` is temporary and does not require a permanent server.
- `STAGING` is deployed pre-production for integral validation/acceptance; physical location and deployment mechanism remain deferred pending capability verification.
- `PRODUCTION` is the real environment; Hostinger remains the target subject to capability verification.
- Integration into `main` does not authorize or trigger production deployment.
- No permanent `development` environment or mandatory preview-environment system was established.
- Variables/secrets/per-environment credentials are outside 0.3 and belong to 0.4.

**Closeout:** PASS after criteria/evidence review and explicit user acceptance.

## 0.4 — Variables, secretos, accesos, seguridad y límites operativos — EN CURSO

The user explicitly authorized starting 0.4 and selected the **variables-and-secrets policy** work block.

The complete canonical text of every decision below is recorded directly under **0.4** in the Roadmap.

### Decision 1 — Variable/configuration classification

Approved categories only:

- `PUBLIC / VERSIONABLE`
- `ENVIRONMENT-SPECIFIC / NON-SECRET`
- `SECRET / SENSITIVE`

### Decision 2 — Residence by classification

- Public/versionable may reside in repository.
- Environment-specific/non-secret stays separated by environment.
- Secret/sensitive may reside only in an authorized secret manager for the applicable environment/service and is never versioned.

No concrete manager/mechanism was selected by this decision.

### Decision 3 — Naming convention

- `UPPER_SNAKE_CASE`.
- Stable descriptive names.
- Environment is not encoded in the logical name.
- No classification prefix or global `CYA_` prefix by default.
- Future technology-specific exceptions require explicit approval.

### Decision 4 — Sensitive credential separation by environment

- Production credentials are production-only.
- Validation and staging use separate credentials when the service permits.
- No cross-environment reuse for convenience.
- Real provider limitations require a concrete case and explicit user approval.

### Decision 5 — Secret exposure and documentation policy

- Real secret values never appear in versioned/documentary/evidence outputs.
- Names/purpose/classification/environment may be documented when non-sensitive.
- `.env.example` equivalents use only unequivocally fake placeholders.
- Accidental secret exposure is redacted or the artifact is not retained.
- Detection of exposure does not itself authorize rotation/revocation/deletion.

### Decision 6 — Secret lifecycle policy

- Creation only for an approved concrete service/environment need.
- No universal calendar-based rotation.
- Rotation triggers require a proposal; trigger detection does not authorize execution.
- Revocation/deletion/retirement are separately authorized actions.
- Evidence never retains old/new values.

### Decision 7 — Access-to-secrets policy

- Access only for specifically authorized subjects with an approved need.
- Scope is limited to necessary secret/service/environment.
- Production secret access is isolated.
- Connection to the project does not grant ChatGPT/agents/tools secret values.
- Grant/expand/reduce/revoke are separately authorized actions.

### Decision 8 — Configuration inventory and registration policy

- Every approved configuration item requires an inventory entry.
- Metadata includes name, classification, purpose, related service/system, applicable environments and state.
- Secret entries may reference approved residence but never values or reconstructable fragments.
- Same logical name is not duplicated solely by environment.
- Retired configuration keeps non-sensitive traceability.
- Inventory is not a credential store.

### Decision 9 — Inventory residence, format and maintenance

- One canonical versioned YAML file inside repository `.cya/`.
- No second canonical Drive copy.
- Inventory contains only approved metadata and no real secret values.
- Approved configuration changes include the corresponding authorized inventory update.
- No permanent personal owner; responsibility follows the actor executing the expressly authorized change.
- No automatic discrepancy correction.
- History is GitHub version history.

### Decision 10 — `ENVIRONMENT-SPECIFIC / NON-SECRET` residence policy

- No shared global residence; each environment has its own value.
- No cross-environment value read/reuse.
- Concrete mechanisms remain deferred to the applicable approved environment/tool/infrastructure decision.
- Non-secret classification does not automatically authorize versioning concrete values.

### Decision 11 — Configuration inventory filename

Exact approved path:

`.cya/configuration-inventory.yaml`

This does **not** create the file.

### Decision 12 — Logical YAML inventory structure

Approved logical structure:

```yaml
configuration_items:
  - name:
    classification:
    purpose:
    service_or_system:
    environments:
      VALIDATION:
        state:
      STAGING:
        state:
      PRODUCTION:
        state:
    residence_reference:
    rules_references:
      expiration:
      rotation:
      access:
```

Approved meaning:

- root: `configuration_items`;
- fields per item: `name`, `classification`, `purpose`, `service_or_system`, `environments`, `residence_reference`, `rules_references`;
- environments are represented separately with `state`;
- `classification` uses only the three approved categories;
- `residence_reference` only references an approved residence when applicable and never a value;
- `rules_references` may reference approved `expiration`, `rotation` and `access` rules;
- state value vocabulary, reference format, further required/optional rules, schema version and additional metadata remain undecided.

Decision 12 does **not** authorize creating `.cya/configuration-inventory.yaml`, adding real variables, values, secrets, services, managers or automation.

## 0.4 — Current gate

**Status:** EN CURSO.  
**Closure gate:** NOT READY.

The 12 approved decisions do not authorize:

- creating `.cya/configuration-inventory.yaml`;
- creating or changing variables or secrets;
- selecting/configuring concrete secret managers or environment mechanisms;
- changing secret access or security settings;
- creating/deploying environments;
- constructing or activating T01–T11;
- closing 0.4 or starting 0.5.

## Next action

**PENDING USER DECISION:** define the next exact concrete variables-and-secrets policy decision. No specific manager, value, automation, environment mapping/mechanism, access change or operational procedure may be selected automatically.

## Deferred — do not execute without explicit approval

- 0.5 and every later Phase 0 subphase.
- T01–T11 and any other technical capability not explicitly approved for execution.
- Physical staging implementation and environment deployment details until their applicable approved subphase/action.

## Living sources

- Roadmap Vivo: https://docs.google.com/document/d/1yTYr1eS_b3cuODTyC2yz1uEGsB2-n0Ba0WdrPrPs4Bo/edit
- Tool Guide: https://docs.google.com/document/d/1eDWjwqQhk8lQNeiDuzShzD9tJbtvzlqIk-jEazGXF0A/edit
- Repository: https://github.com/carlosyandybz-bit/cya-hub-v10
