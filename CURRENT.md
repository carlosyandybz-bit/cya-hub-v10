# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. The Drive Roadmap Vivo is the canonical location for approved decisions under their exact phase/subphase. This file summarizes current operational state and must agree with `.cya/project-state.yaml` and the Roadmap Vivo.

## Current position

**Global status:** FASE 0 — EN CURSO  
**Phase:** FASE 0 — FUNDACIÓN, GOBERNANZA Y BOOTSTRAP  
**Last completed subphase:** 0.7 — Gobernanza de herramientas y TOOL PLAN obligatorio — PASS  
**Active subphase:** 0.7 — Gobernanza de herramientas y TOOL PLAN obligatorio — PASS (closed; no later subphase started)  
**Active work block:** none — awaiting explicit user authorization to start 0.8  
**Approved concrete decisions in 0.4:** 22  
**Approved concrete decisions in 0.5:** 13  
**Approved concrete decisions in 0.6:** 20  
**Approved concrete decisions in 0.7:** 21  
**Active action:** await explicit user authorization before starting 0.8; do not start 0.8 automatically  
**Incremental cost target:** 0 EUR

## Canonical decision-organization rule

- Every approved decision is documented under the exact phase, subphase, audit or Roadmap point that owns it.
- `PUNTO ACTUAL DEL PROYECTO` is a position/next-action summary, not an accumulated decision archive.
- A transversal decision has one canonical owner plus cross-references where needed.
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

## 0.4 — Variables, secretos, accesos, seguridad y límites operativos — PASS

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

Original approved logical structure established the inventory root and base fields. Decisions 17–19 refine the current residence and environment representation without deleting historical traceability.

### Decision 13 — Inventory state vocabulary per environment

The `state` field admits exactly:

- `NOT_CONFIGURED`
- `CONFIGURED`
- `ACTIVE`
- `PENDING_REMOVAL`
- `RETIRED`

No chat, agent, tool or process may change `state` automatically or by inference.

### Decision 14 — Structured inventory reference format

References use structured `type` + `reference`. Decision 17 supersedes only the singular residence shape by introducing `residence_references`; the structured reference rule remains applicable to each residence/rule/evidence reference.

### Decision 15 — Allowed reference types

Allowed values only:

- `DRIVE_DOCUMENT`
- `GITHUB_FILE`
- `GITHUB_COMMIT`
- `GITHUB_PULL_REQUEST`
- `GITHUB_ACTIONS_RUN`
- `SECRET_MANAGER_ENTRY`
- `ENVIRONMENT_CONFIGURATION`
- `SERVICE_CONFIGURATION`

No `OTHER` and no free-text type. New types require explicit user approval.

### Decision 16 — Reference syntax by type

- `DRIVE_DOCUMENT`: canonical Google Drive document URL.
- `GITHUB_FILE`: repository-relative path inside `cya-hub-v10`.
- `GITHUB_COMMIT`: full commit SHA.
- `GITHUB_PULL_REQUEST`: repository PR number.
- `GITHUB_ACTIONS_RUN`: workflow-run ID.
- `SECRET_MANAGER_ENTRY`: approved non-sensitive logical identifier once the manager exists.
- `ENVIRONMENT_CONFIGURATION`: approved non-sensitive logical identifier once the environment mechanism exists.
- `SERVICE_CONFIGURATION`: approved non-sensitive logical identifier once the service exists.

The last three do not receive an invented technical syntax before their concrete approved mechanism exists. References never contain secrets or reconstructable secret fragments.

### Decision 17 — Residence representation by classification/environment

The current schema uses `residence_references` instead of singular `residence_reference`:

```yaml
residence_references:
  GLOBAL:
    type:
    reference:
  VALIDATION:
    type:
    reference:
  STAGING:
    type:
    reference:
  PRODUCTION:
    type:
    reference:
```

- `PUBLIC / VERSIONABLE` may use `GLOBAL`.
- `ENVIRONMENT-SPECIFIC / NON-SECRET` does not use `GLOBAL` and is represented separately per environment.
- `SECRET / SENSITIVE` does not use `GLOBAL` and is represented separately per environment.
- Only approved/applicable residence references are included; never real values.

### Decision 18 — Applicability and state evidence per environment

Each environment may use:

```yaml
environments:
  VALIDATION:
    applicable:
    state:
    state_evidence_reference:
      type:
      reference:
```

Equivalent structure applies to `STAGING` and `PRODUCTION`.

- `applicable` is `true` or `false` only.
- If `applicable: false`, `state` is absent.
- If `applicable: true`, `state` is mandatory.
- `ACTIVE` requires `state_evidence_reference`.
- `RETIRED` requires `state_evidence_reference`.
- Evidence is optional for `CONFIGURED` and `PENDING_REMOVAL` when useful.
- Evidence is not required for `NOT_CONFIGURED`.
- Evidence references use Decisions 15–16.

### Decision 19 — Required/optional fields and omitted optionals

Always required per item:

- `name`
- `classification`
- `purpose`
- `service_or_system`
- `environments`

Rules:

- `residence_references` appears only when an approved residence exists; configured/active items reflect the necessary residence(s) by classification/environment.
- `rules_references` appears only when at least one approved rule reference exists.
- Inside `rules_references`, only the actually applicable `expiration`, `rotation` or `access` entries appear.
- Optional non-applicable fields are omitted; do not use `null`, `TBD`, `N/A`, empty strings or invented values.

### Decision 20 — Inventory schema versioning

- No `schema_version` field in the initial schema.
- Git is the canonical change history.
- A future incompatible schema change requires explicit user decision.
- Formal schema versioning, if needed, is decided only at that point.

### Decision 21 — Additional inventory metadata

No additional metadata is added now. In particular, do not add:

- `created_at`
- `updated_at`
- `owner`
- `created_by`
- `last_validated_at`
- `notes`
- artificial IDs
- personal owners
- secret hashes
- information already duplicated by Git
- real values

Future metadata requires a concrete need and explicit user approval.

### Decision 22 — 0.4 closure criteria

0.4 may only be submitted for closure when:

1. intrinsic classification, residence, naming, environment separation, exposure, lifecycle, access and inventory rules are approved;
2. the logical inventory schema is coherent and contradiction-free;
3. technology/service/infrastructure-dependent details remain explicitly deferred rather than inferred;
4. selecting a concrete secret manager is not required for closure;
5. creating variables, secrets, credentials or real environments is not required for closure;
6. creating `.cya/configuration-inventory.yaml` is not required and remains a separately authorized future action;
7. Roadmap, `CURRENT.md` and `.cya/project-state.yaml` are synchronized;
8. closure evidence is presented to the user and explicit user acceptance is required.

Decision 22 itself did not close 0.4; the user subsequently reviewed the closure evidence and explicitly accepted the closure.

## 0.4 — Closeout

**Status:** PASS.  
**Closure gate:** PASS after evidence review and explicit user acceptance.

The 22 approved decisions remain governing policy and did not themselves authorize:

- creating `.cya/configuration-inventory.yaml`;
- creating or changing variables, secrets or credentials;
- selecting/configuring concrete secret managers or environment mechanisms;
- changing secret access or security settings;
- creating/deploying environments;
- constructing or activating T01–T11;
- starting 0.5.

The user subsequently approved the 13 decisions belonging to 0.5; that later approval is the authority for the 0.5 work and does not alter the historical scope of the 0.4 closeout.

Concrete managers, operational URLs/IDs, real values, physical STAGING/PRODUCTION mechanisms and real credentials remain deferred until their applicable approved decisions/actions.

## 0.5 — Convenciones técnicas mínimas y baseline de calidad — PASS

The complete canonical text of the approved decisions is recorded directly under **0.5** in the Roadmap.

### Decision 1 — Scope of 0.5

- 0.5 is limited to minimal, transversal, technology-neutral technical conventions.
- Language, frontend, backend, framework, concrete runtime, concrete package manager, database, application folder structure, architecture, libraries and concrete formatter/linter selection remain deferred to their applicable approved point.
- 0.5 does not select Txx tools or replace Phase 2 decisions.

### Decision 2 — Text-file normalization

- Versioned text files use UTF-8, without requiring BOM.
- Line endings are LF.
- Versioned text files end with a final newline.
- Trailing whitespace is not retained.
- Binary formats and future explicitly approved format/tool requirements are excluded from this general rule.

### Decision 3 — Canonical technical-style source

- Formatting, lint and typecheck rules, once applicable, live in shared versioned repository configuration.
- Personal editor configuration, local extensions or `format on save` cannot be the sole source of a project rule.
- One formatting authority applies per artifact type to avoid competing formatters.
- No concrete formatter/linter/typecheck product is selected by this decision.

### Decision 4 — Technical naming for code/files

- No global casing rule is imposed before language/framework selection.
- `camelCase`, `PascalCase`, `kebab-case` or equivalent conventions are decided with the applicable approved technology.
- Existing conventions approved elsewhere, including `UPPER_SNAKE_CASE` for 0.4 configuration naming, remain unchanged.

### Decision 5 — Runtime/tool versioning

- `latest` is not used as an operational reproducible version.
- Once a runtime, package manager or critical tool is selected, its relevant version must be knowable from repository or canonical configuration.
- Upgrades are explicit traceable changes rather than accidental effects of floating versions.
- No concrete version or tool is selected now.

### Decision 6 — Dependencies and lockfile

- One canonical package manager is used per technical context once selected.
- Incompatible lockfiles are not mixed for the same context.
- The canonical lockfile is versioned.
- Installations must be reproducible from the approved manifest and lockfile.
- Future automation must respect the lockfile rather than freely re-resolve dependencies.
- No concrete package manager is selected now.

### Decision 7 — Generated artifacts, caches and local state

- Build outputs, caches, temporary files, local logs, OS artifacts, personal IDE files and other regenerable outputs are not versioned by default.
- Versioning a generated artifact requires a concrete need and explicit approved exception.
- A declared generated artifact is not manually edited when an approved canonical source/generator exists.

### Decision 8 — Conceptual minimum quality baseline

The baseline signals are:

- reproducible installation;
- format check;
- build;
- lint;
- typecheck when applicable;
- relevant tests, including unit/integration tests when relevant to the approved stack and change.

0.5 defines these conceptual signals only. It does not construct workflows or activate T02; T02 construction remains in 0.9.

### Decision 9 — No bypass to obtain PASS

- A baseline is not considered satisfied by `--force`, ignored exit codes, disabling a rule merely to pass, unjustified exclusion of problematic code, skipping tests or broad suppressions whose purpose is only to obtain PASS.
- A real technical exception must be analyzed as a concrete case and requires the applicable approval.

### Decision 10 — Warnings

- A warning from a mandatory check is not silently ignored or automatically accepted as permanent debt.
- It must be corrected or documented and explicitly accepted as a known finding.
- Not every warning is declared universally blocking; exact PASS/FAIL/evidence mechanics belong to the applicable DoD/QA/tooling points.

### Decision 11 — Test coverage

- 0.5 establishes no arbitrary global coverage percentage.
- Global coverage percentage alone is not sufficient evidence of quality.
- Concrete thresholds are decided when architecture, code and real risk exist and may differ for critical logic.

### Decision 12 — Baseline evolution

- The 0.5 baseline is a minimum and may be expanded or hardened by later approved decisions.
- Later phases may add technology-specific conventions, checks, test types and thresholds.
- A later decision may not silently weaken an approved 0.5 rule; any incompatibility must be exposed and explicitly decided.

### Decision 13 — 0.5 closure criteria

0.5 may only be submitted for closure when:

1. all intrinsic technology-neutral 0.5 conventions are approved;
2. no intrinsic 0.5 decision remains pending;
3. stack-dependent decisions are explicitly deferred rather than inferred;
4. framework, runtime, package manager, formatter, linter, backend and architecture selection are not required for closure;
5. constructing T01–T11, workflows or application bootstrap is not required for closure;
6. Roadmap Vivo, `CURRENT.md` and `.cya/project-state.yaml` are synchronized;
7. closure evidence is presented to the user;
8. explicit user acceptance is required to mark 0.5 PASS;
9. closing 0.5 does not automatically start 0.6.

## 0.5 — Closeout

**Status:** PASS.  
**Closure gate:** PASS after evidence review and explicit user acceptance.

The 13 approved decisions remain governing policy and did not themselves authorize:

- selecting language, framework, backend, runtime, package manager, formatter, linter, database, architecture or concrete libraries;
- creating or modifying workflows or Txx tooling;
- bootstrapping the application;
- creating or changing environments, variables, secrets, access or deployments;
- starting 0.6.

## 0.6 — Definition of Done, evidencias, QA y protocolo de cambios — PASS

The complete canonical text of the 20 approved decisions is recorded directly under **0.6** in the Roadmap. Operational summary:

1. Scope is limited to technology-neutral DoD, acceptance criteria, evidence, QA, findings, reruns, rollback, change protocol and closeout rules.
2. Implemented does not equal DONE; DONE requires approved scope, acceptance criteria, applicable QA, traceable evidence, no blocking findings, affected-source synchronization and known rollback/reversibility state.
3. Significant technical changes require acceptance criteria approved before execution; criteria cannot be silently changed or retrofitted to justify PASS.
4. Each claim requires evidence appropriate to its nature; one evidence type cannot substitute a different validation.
5. Evidence is tied to the exact revision/change validated; affected evidence becomes stale after relevant subsequent changes and requires rerun.
6. Evidence is minimum sufficient and must remain safe; no secrets or reconstructable sensitive values.
7. QA is impact-driven and covers the changed behavior, directly affected interfaces/behaviors and identified dependent areas.
8. Selective regression is required for reasonably affected areas; integral regression applies when the gate, risk, phase or approved scope requires it.
9. Automated QA and manual QA are complementary; automation does not replace a validation it cannot actually demonstrate.
10. Gate effect of findings is `BLOCKING` or `NON_BLOCKING`; `BLOCKING` prevents DONE/PASS, while `NON_BLOCKING` can coexist with PASS WITH FINDINGS only under the approved conditions and explicit user acceptance.
11. A failed mandatory check remains unsatisfied until correction plus applicable rerun produces new valid evidence.
12. QA exceptions require documented scope, reason, risk and compensating validation when available plus explicit user approval; no silent bypass.
13. Standard change protocol: scope → acceptance criteria → TOOL PLAN when applicable → approval → temporary branch for versioned change → minimum change → QA → evidence → state/document synchronization → result presentation → acceptance/closure gate.
14. Newly discovered scope is not opportunistically added; it returns to the user for explicit approval.
15. Significant changes require known rollback/reversibility; failure detection does not automatically authorize rollback unless that rollback and its conditions were explicitly approved.
16. Only actually affected canonical/documentary/operational sources are synchronized; no competing canonical copies.
17. Closeout evidence package must summarize approved scope, implemented criterion/decision, technical reference, QA, results, open findings, reruns, rollback state, updated documentation/state, deferred items and pending user gate; no new mandatory evidence file is created by 0.6.
18. A PASS remains historically attached to the revision/state/evidence/scope evaluated at that time; later regression creates a new finding/change rather than rewriting history.
19. 0.6 closeout requires all intrinsic 0.6 rules approved, no intrinsic decision pending, stack/tool-specific matrices explicitly deferred, synchronized Roadmap/CURRENT/project-state, evidence presentation and explicit user acceptance; closing 0.6 does not start 0.7.
20. **Root-cause-first / no unauthorized patching:** an error must be investigated to identify its root cause and corrected properly at that cause. A patch, workaround, superficial hotfix or symptom-masking fix is not accepted as a final solution. Any temporary patch/workaround requires explicit prior user acceptance for that exact case and scope. If root cause is not yet known, the error remains open/blocked as applicable rather than being declared resolved by superficial mitigation.

## 0.6 — Closeout

**Status:** PASS.  
**Closure gate:** PASS after closure evidence review and explicit user acceptance.

The 20 approved decisions remain governing policy. The decisions themselves did not authorize closing 0.6 or starting 0.7; the subsequent explicit user acceptance authorized only the closeout of 0.6.

The 20 approved decisions do not authorize:

- constructing or activating T01–T11 or workflows;
- selecting language, framework, backend, runtime, package manager, formatter, linter, database, architecture or concrete libraries;
- changing the application, environments, variables, secrets, access or deployments;
- starting 0.7.

## 0.7 — Gobernanza de herramientas y TOOL PLAN obligatorio — PASS

**Start authorization:** explicitly approved by the user.  
**Approved intrinsic decisions:** 21.  
**Closure gate:** PASS after closure-evidence review and explicit user acceptance.

The complete canonical text is recorded under **0.7** in the Roadmap. Operational summary:

1. 0.7 governs tools, routing, lifecycle, activation/retirement, the machine-readable registry and TOOL PLAN rules only; it does not build or activate T01–T11 or select stack.
2. Governance hierarchy is Roadmap → decisions/position; Guide → human routing/evidence policy; `tool-registry.yaml` → machine-readable mirror; `planning-template.md` → TOOL PLAN structural contract; CURRENT/project-state → operational state.
3. Tool use requires registered exact action, approved route, sufficient access, exact user authorization and permitted cost; connector availability is not authorization.
4. Each action has one primary route; supporting tools require explicit registration for that use.
5. Primary failure/no access stops execution as `BLOCKED_TOOLING`; root cause is identified under 0.6 and fallback requires explicit user approval for the exact case/scope.
6. Unregistered tools/actions/workflows/services/procedures are not used before proposal, approval and applicable registration/execution authorization.
7. Tool lifecycle vocabulary is exactly `PENDING`, `ACTIVE`, `DEFERRED`, `RETIRED`; blocking tokens are action results, not tool lifecycle states.
8. Lifecycle semantics and non-active conditions are explicit; no invented lifecycle states.
9. `ACTIVE` requires authorized build/connect/activation, access, cost compliance, invocation, limits/dependencies, minimum successful test, evidence, Guide+registry sync and explicit user acceptance.
10. `RETIRED` preserves history; workflow disable, access revocation and infrastructure deletion remain separate actions.
11. Registry v2 carries required tool/action metadata; ACTIVE tools additionally require invocation, limits, dependencies and access requirements.
12. `.cya/tool-registry.yaml` schema is `version: 2`; incompatible future changes require explicit decision and version increment.
13. Full TOOL PLAN is mandatory for significant technical/governance actions; pure READ-ONLY inspection may omit it unless specifically required.
14. TOOL PLAN includes authorization, primary/supporting/fallback, scope, evidence/validation, rollback, secrets/access, cost, result/evidence IDs and next action; error correction also references 0.6 root-cause rules and any approved patch exception.
15. Approved TOOL PLAN is an execution contract; material changes stop affected work and return to user approval rather than retroactive rewriting.
16. Proposal/decision, TOOL PLAN and technical execution are distinct authorizations; predeclared exact documentary synchronization may be covered by the decision acceptance.
17. Tool execution success does not equal PASS; criteria, evidence and user acceptance remain separate.
18. Incremental cost defaults to 0 EUR; paid actions remain `BLOCKED_COST` until the approved cost-analysis and user authorization exist.
19. Access is limited to approved need; secrets remain under 0.4; USER ACTION REQUIRED is used only when user intervention is actually necessary and an approved connected tool cannot safely perform it.
20. Governance changes require explicit approval and affected-source synchronization; contradictions stop affected use and return to the user rather than being resolved by inference.
21. 0.7 may be submitted for closure only after Guide/registry/template/state coherence, lifecycle/routing verification, synchronized Roadmap/CURRENT/project-state, evidence presentation and explicit user acceptance. Closing 0.7 does not start 0.8.

The approved 0.7 decisions did **not** by themselves authorize T01–T11/workflow construction or activation, stack or architecture selection, application/environment/configuration/secret/access/infrastructure/deployment changes, closing 0.7, or starting 0.8. The user subsequently reviewed the closure evidence and explicitly accepted closing 0.7 only.

## 0.7 — Closeout

**Status:** PASS.  
**Closure gate:** PASS after evidence review and explicit user acceptance.  
**Starts 0.8:** no. 0.8 remains PENDING / NOT STARTED until explicit user authorization.

## Next action

Await explicit user authorization to start **0.8 — Construcción y prueba de T01 CYA Browser Lab**. Do not start 0.8 automatically.

## Deferred — do not execute without explicit approval

- Creation of `.cya/configuration-inventory.yaml`.
- Concrete secret/environment/service configuration mechanisms and real configuration values.
- Stack-specific choices deferred by 0.5, including language/framework/runtime/package manager/formatter/linter/backend/database/architecture/library decisions.
- 0.8 and every later Phase 0 subphase until explicitly started/authorized.
- T01–T11 and any other technical capability not explicitly approved for execution.
- Physical staging implementation and environment deployment details until their applicable approved subphase/action.

## Living sources

- Roadmap Vivo: https://docs.google.com/document/d/1yTYr1eS_b3cuODTyC2yz1uEGsB2-n0Ba0WdrPrPs4Bo/edit
- Tool Guide: https://docs.google.com/document/d/1eDWjwqQhk8lQNeiDuzShzD9tJbtvzlqIk-jEazGXF0A/edit
- Repository: https://github.com/carlosyandybz-bit/cya-hub-v10
