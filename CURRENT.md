# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. The mutable operational state is canonical only in [`.cya/current-state.yaml`](.cya/current-state.yaml). The Drive Roadmap Vivo remains the canonical documentary source for phase/subphase/audit/gate trajectory and current project progress; detailed approved decisions belong in the corresponding final decision documents in Drive.

## Start with the canonical live state

- **Mutable phase/subphase state and active action:** [`.cya/current-state.yaml`](.cya/current-state.yaml)
- **Stable machine-readable operational context:** [`.cya/project-state.yaml`](.cya/project-state.yaml)
- **Tool/action registry and Txx lifecycle:** [`.cya/tool-registry.yaml`](.cya/tool-registry.yaml)
- **Agent operating rules:** [`AGENTS.md`](AGENTS.md)
- **Mandatory TOOL PLAN:** [`.cya/planning-template.md`](.cya/planning-template.md)
- **Roadmap Vivo / phase, subphase, audit, gate and progress trajectory:** Google Drive `CYA HUB v10 — ROADMAP VIVO DE FASES, SUBFASES Y AUDITORÍAS`
- **Tool governance:** Google Drive `CYA HUB v10 — GUÍA MAESTRA DE HERRAMIENTAS, AGENTES Y PLANNING OPERATIVO`

## State authority rule

`CURRENT.md` does not maintain a second manually synchronized copy of `phase`, completed/active/next subphase, subphase statuses or `active_action`. Those fields exist only in `.cya/current-state.yaml`.

A normal phase/subphase transition updates `.cya/current-state.yaml` first and then updates only documentary or stable-context sources whose decisions or scope actually changed. `.cya/project-state.yaml` must not duplicate the STATE CONTRACT. `.cya/tool-registry.yaml` changes only when a tool lifecycle, routing or approved tool metadata actually changes.

## Permanent operating constraints

- Google Drive `CYA Hub v10` is the living documentary source of truth.
- GitHub `carlosyandybz-bit/cya-hub-v10` is the versioned technical and operational source of truth.
- CYA Hub v3 and all legacy remain READ-ONLY and are not implementation sources.
- No assumption, default, progression, PASS, gate closure or scope expansion is allowed without the explicit user authority required by governance.
- Default incremental cost is 0 EUR.
- Significant technical work requires the approved TOOL PLAN process.
- A claim is not evidence, and evidence does not replace explicit user acceptance.

## History and traceability

Detailed approved decisions belong in the corresponding final decision documents in Drive. The Roadmap Vivo retains phase/subphase/audit/gate history and the progress information required to know where the project is and what comes next. Prior versions of this file remain available through Git history. This file is intentionally kept small so mutable state cannot diverge across multiple manually maintained mirrors.
