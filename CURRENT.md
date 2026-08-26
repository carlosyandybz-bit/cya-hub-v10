# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. This file must agree with `.cya/project-state.yaml` and the Drive Roadmap Vivo.

## Current position

**Global status:** FASE 0 — EN CURSO  
**Phase:** FASE 0 — FUNDACIÓN, GOBERNANZA Y BOOTSTRAP  
**Last completed subphase:** 0.3 — Naming, repositorio, workspace, ramas y entornos — PASS  
**Active subphase:** 0.4 — Variables, secretos, accesos, seguridad y límites operativos — EN CURSO  
**Active work block:** política de variables y secretos — classification, residence policy, naming convention, sensitive-credential separation by environment, secret exposure/documentation policy, secret lifecycle policy, access-to-secrets policy, configuration inventory/registration policy, inventory residence/format/maintenance policy, configuration inventory filename and ENVIRONMENT-SPECIFIC / NON-SECRET residence policy approved; remaining concrete policy decisions pending  
**Active action:** obtain the next exact user-approved variables-and-secrets policy decision without inferring specific secret managers, variable values, automation, concrete environment mappings, access changes or operational procedures  
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

The user explicitly approved beginning 0.4 with the **política de variables y secretos** work block.

### 0.4 — Approved variable classification

The user explicitly approved classifying every CYA Hub v10 configuration item into exactly three categories:

- **PUBLIC / VERSIONABLE:** non-sensitive information that may exist in GitHub.
- **ENVIRONMENT-SPECIFIC / NON-SECRET:** non-secret information whose value may vary between `VALIDATION`, `STAGING` and `PRODUCTION`.
- **SECRET / SENSITIVE:** tokens, passwords, keys, credentials and any value that must not be exposed; it is never versioned.

### 0.4 — Approved residence policy

The user explicitly approved the following residence rules without selecting any specific storage product or secret manager:

- **PUBLIC / VERSIONABLE:** may reside in the repository.
- **ENVIRONMENT-SPECIFIC / NON-SECRET:** must remain separated by environment between `VALIDATION`, `STAGING` and `PRODUCTION`; its physical storage location is not yet defined.
- **SECRET / SENSITIVE:** may reside only in an authorized secret manager for the corresponding environment or service and never as versioned GitHub content.

This residence policy does not select GitHub Secrets, Hostinger or any other concrete manager/mechanism, does not define variable names or values, and does not authorize creating or changing variables or secrets.

### 0.4 — Approved naming convention

The user explicitly approved the complete naming convention for variables and secrets:

- Names use **UPPER_SNAKE_CASE** with only letters `A-Z`, numbers and `_`.
- A name describes what the configuration represents in a stable and understandable way.
- The environment is not included in the name: the same logical key keeps the same name in `VALIDATION`, `STAGING` and `PRODUCTION`; the environment-specific value or residence changes, not the name.
- Prefixes such as `PUBLIC_`, `SECRET_` or similar are not added only to represent the approved classification; classification is managed separately.
- No global `CYA_` prefix is established by default.
- If an approved future technology requires a specific prefix or format, that exception is decided when that technology has been approved.
- Names must be explicit enough to avoid generic context-free keys such as `KEY`, `TOKEN`, `URL` or `SECRET`.
- `SERVICE_API_KEY` versus `KEY` is a structural example only and does not introduce any real service.

This naming convention does not create variables, select managers, define values or authorize creating or changing variables or secrets.

### 0.4 — Approved sensitive-credential separation policy

The user explicitly approved the complete separation policy for sensitive credentials by environment:

- `PRODUCTION` credentials are exclusive to `PRODUCTION` and may never be used in `VALIDATION` or `STAGING`.
- `VALIDATION` and `STAGING` use their own separate credentials when the service permits independent credentials.
- No environment may read, receive or reuse another environment's credentials for convenience.
- If an external service technically prevents independent credentials, no automatic exception is created.
- Any possible exception must be analyzed and explicitly approved for that specific service before the credential is used.
- An exception between `VALIDATION` and `STAGING` may be proposed only when a real service limitation exists.
- Sharing a `PRODUCTION` credential with any non-production environment is not permitted by this policy; if a future integration makes separation impossible, the decision stops and the concrete case is presented to the user.

This separation policy does not select secret managers, create credentials, define credential values or configure any service.

### 0.4 — Approved secret exposure and documentation policy

The user explicitly approved the complete exposure and documentation policy for secrets:

- Real values classified as `SECRET / SENSITIVE` may never appear in logs, documentation, GitHub Issues, pull requests or comments, screenshots, evidence, traces, artifacts, versioned files or project documentary outputs.
- A variable or secret name may be documented when the name itself contains no sensitive information; its purpose, category and applicable environment may also be documented.
- `.env.example` and equivalent files may contain only variable names and unequivocally fake placeholders, never real values, real fragments or partially hidden copies of a secret.
- Evidence that a secret is configured may document only information such as name, environment, presence/absence and verification result, never the value.
- If an output, log or screenshot accidentally contains a sensitive value, it must be redacted before being retained or shared as evidence; if safe redaction cannot be guaranteed, the artifact is not retained as evidence.
- Authentication headers, cookies, tokens in URLs/query strings and any other credential carrier receive the same treatment.
- Masking must not preserve real portions that could identify or reconstruct the secret; neutral representations such as `***` or fictitious placeholders are used for documentation.
- If a real secret is detected in an unauthorized location, propagation is stopped and the case returns to the user as a security decision. This rule does not itself authorize rotating, revoking, deleting or modifying credentials.
- This policy does not select secret managers, create values, rotate credentials or configure services.

### 0.4 — Approved secret lifecycle policy

The user explicitly approved the complete lifecycle policy for secrets:

- A secret is created only when there is a concrete and approved need for a specific service and environment.
- Each secret must be documented without exposing its value, identifying its name, purpose, service, environment and state.
- No universal calendar-based periodic rotation is established. If a provider requires a specific expiration or rotation rule, that rule is defined for that service.
- Rotation must be proposed when there is real or suspected exposure, compromise, unauthorized access, a provider requirement, or a change that makes the current credential invalid. Detecting such a trigger does not automatically authorize executing the rotation.
- When a credential is to be replaced and the service permits temporary coexistence, replacement must be capable of validating the new credential before retiring the previous one. The concrete execution still requires authorization.
- A credential that is no longer needed moves to pending revocation/retirement and is not kept active for convenience.
- Revoking, deleting or destroying a credential remains an explicit and separately authorized action; this policy does not make those acts automatic.
- After an approved replacement or revocation, evidence retains only name, environment, reason, state and result, never the old or new value.
- This policy does not select managers, values, personal owners, specific frequencies or procedures for services that have not yet been approved, and does not itself authorize creating, replacing, rotating, revoking, deleting or retiring credentials or secrets.

### 0.4 — Approved access-to-secrets policy

The user explicitly approved the complete access-to-secrets policy:

- A secret may be accessible only to a specifically authorized person, service, tool or process when an approved need related to its function exists.
- Authorization is limited to the necessary secret, service and environment; access to a system or application does not automatically grant access to all of its secrets.
- `PRODUCTION` credentials retain reinforced isolation: access to `PRODUCTION` secrets is not derived from access to `VALIDATION`, `STAGING` or the repository.
- No access is granted just in case, for convenience or solely because it is technically possible.
- When a process can operate using a secret without exposing its value to the actor executing the process, revealing the value is not considered necessary.
- ChatGPT, agents, automations and tools do not receive secret values merely because they are connected to the project. Any future need for effective access must be covered by an expressly authorized action and scope.
- Each access authorization must be documentable without revealing the secret, identifying at minimum the authorized subject, secret by name, environment, purpose, scope and state.
- When the need that justified an access disappears, the access moves to pending removal or reduction. The policy does not automatically authorize modifying or revoking permissions; execution still requires exact authorization.
- Granting, expanding, reducing or revoking access to secrets is a separate action; approving this policy executes none of those actions.
- This policy does not select secret managers, concrete users, concrete roles, provider permissions or technology-specific procedures.

### 0.4 — Approved configuration inventory and registration policy

The user explicitly approved the complete configuration inventory and registration policy:

- Every variable or secret that forms part of CYA Hub v10 must have an entry in the configuration inventory once its existence has been approved.
- Each entry identifies, without ever including the real value: name, classification, purpose, related service/system, applicable environments and state.
- For `SECRET / SENSITIVE` items, the inventory may additionally record a reference to its authorized residence or secret manager once that residence/manager has been approved, but never the value, value fragments or information that could reconstruct it.
- If approved expiration, rotation or access rules exist for an item, the inventory may record their existence or documentary reference without duplicating sensitive values.
- The same logical name is not registered as different variables solely because it exists in multiple environments; the inventory must show clearly which environments it applies to and its state in each.
- When configuration is created, renamed, reclassified, added to or removed from an environment, changes state or changes approved residence, the corresponding inventory update must be proposed. This rule does not automatically authorize the technical or documentary change.
- Retired configuration does not silently disappear from history; traceability that it existed and its final state must be preservable without retaining values.
- The inventory never replaces the actual secret manager and does not function as a credential store.
- This policy does not yet select the inventory's physical location, concrete format, file, tool or maintenance owner; those decisions remain separate.
- Approving this policy does not create variables, secrets, secret managers, physical inventories or modify existing configuration.

### 0.4 — Approved inventory residence, format and maintenance policy

The user explicitly approved the complete residence, format and maintenance policy for the configuration inventory:

- The canonical source of the inventory will be a single versioned file inside the `cya-hub-v10` repository.
- The format will be **YAML**, so it is human-readable and directly usable by chats/agents without maintaining a second representation.
- The file will reside inside `.cya/`, separate from `project-state.yaml` and `tool-registry.yaml`.
- The inventory continues to contain only the previously approved metadata and never real secret values.
- No second canonical copy of the inventory will be maintained in Google Drive. Drive may document or reference its existence where appropriate, but the technical inventory has one canonical source to avoid divergence.
- Every approved change that creates, retires, renames, reclassifies or changes the state, environment or approved residence of a configuration item must include the corresponding inventory update within that same authorized documentary/technical change.
- There is no permanent personal owner. Responsibility for updating the inventory belongs to the chat, agent or process that executes the expressly approved configuration change, within the scope of that authorization.
- No agent may update the inventory merely because it detects a discrepancy. It must present the discrepancy and obtain the applicable authorization before modifying the inventory.
- Inventory changes are traced through GitHub version history; no parallel history is created.
- This policy does not yet create the file, decide its exact filename, introduce automation or modify any existing configuration.

### 0.4 — Approved configuration inventory filename

The user explicitly approved the exact inventory path: `.cya/configuration-inventory.yaml`.

This decision fixes only the exact filename/path of the already-approved YAML inventory. It does **not** create the file, introduce automation, modify configuration, or authorize any variable, secret, access, security-setting, environment or Txx change.

### 0.4 — Approved ENVIRONMENT-SPECIFIC / NON-SECRET residence policy

The user explicitly approved the complete residence policy for `ENVIRONMENT-SPECIFIC / NON-SECRET` configuration:

- `ENVIRONMENT-SPECIFIC / NON-SECRET` does not have a global shared residence; each environment keeps its own value.
- `VALIDATION`, `STAGING` and `PRODUCTION` do not read the corresponding value from another environment.
- The concrete physical residence for each environment will be that environment's own configuration mechanism once that mechanism has been approved.
- For `VALIDATION`, the concrete mechanism is decided when the tool or process that executes that temporary context is approved.
- For `STAGING`, the concrete residence is decided together with its physical infrastructure, which remains deferred.
- For `PRODUCTION`, the concrete residence is decided when the real production-hosting configuration capability has been verified and approved.
- The fact that these variables are non-secret does not automatically authorize versioning their values in GitHub. Any versioned residence for concrete values requires explicit approval.
- The configuration inventory records name, classification, environments and state, but does not replace the operational residence of the value.
- Once an environment mechanism has been approved, any later residence change is treated as a configuration change subject to authorization.
- This policy does not yet select GitHub Actions Variables, `.env` files, Hostinger, another platform or any concrete value, and it does not create or modify configuration.

Opening 0.4 and approving these policies and the inventory filename do not themselves authorize creating or changing variables or secrets, modifying access, changing security settings, constructing security tooling, creating/deploying environments, creating the inventory file, selecting/configuring a concrete `ENVIRONMENT-SPECIFIC / NON-SECRET` residence mechanism, or executing any Txx capability.

Existing universal rules already recorded in the Guía Maestra and repository governance remain in force unless the user explicitly approves a change.

## Next action

**PENDING USER DECISION:** define the next exact concrete decision for the variables-and-secrets policy. No specific secret manager, variable value, automation, concrete environment mechanism/mapping, access change or operational procedure may be selected automatically.

Do **not** close 0.4, start 0.5, create/change variables or secrets, modify access, create the configuration inventory file, select/configure a concrete `ENVIRONMENT-SPECIFIC / NON-SECRET` residence mechanism, construct T01–T11, create/deploy environments or execute any other new project action without explicit user approval for that exact action.

## Deferred — do not execute without explicit approval

- 0.5 and every later Phase 0 subphase.
- T01–T11 and any other technical capability not explicitly approved for execution.
- Physical staging implementation and environment deployment details until their applicable approved subphase/action.

## Living sources

- Roadmap Vivo: https://docs.google.com/document/d/1yTYr1eS_b3cuODTyC2yz1uEGsB2-n0Ba0WdrPrPs4Bo/edit
- Tool Guide: https://docs.google.com/document/d/1eDWjwqQhk8lQNeiDuzShzD9tJbtvzlqIk-jEazGXF0A/edit
- Repository: https://github.com/carlosyandybz-bit/cya-hub-v10
