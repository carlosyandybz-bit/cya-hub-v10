# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. The mutable operational state is canonical only in [`.cya/current-state.yaml`](.cya/current-state.yaml). The Drive Roadmap Vivo is the master human map for phase/subphase/audit/gate trajectory and current project progress. Detailed approved decisions belong in the corresponding final owner documents in Drive.

## Start with the canonical live state

- **Mutable phase/subphase state and active action:** [`.cya/current-state.yaml`](.cya/current-state.yaml)
- **Stable machine-readable operational context:** [`.cya/project-state.yaml`](.cya/project-state.yaml)
- **Tool registry schema/policy/routing/index:** [`.cya/tool-registry.yaml`](.cya/tool-registry.yaml)
- **Individual Txx lifecycle/tool metadata:** [`.cya/tools/`](.cya/tools/)
- **Agent operating rules:** [`AGENTS.md`](AGENTS.md)
- **Mandatory TOOL PLAN:** [`.cya/planning-template.md`](.cya/planning-template.md)
- **Roadmap Vivo / phase, subphase, audit, gate and progress trajectory:** Google Drive `CYA HUB v10 — ROADMAP VIVO DE FASES, SUBFASES Y AUDITORÍAS`
- **Tool governance:** Google Drive `CYA HUB v10 — GUÍA MAESTRA DE HERRAMIENTAS, AGENTES Y PLANNING OPERATIVO`
- **PRE-FASE final owner layer:** Google Drive `00 — GOBERNANZA / DOCUMENTOS FINALES DE PRE-FASE 0`
- **Fase 0 foundation/governance final owner layer:** Google Drive `00 — GOBERNANZA / DOCUMENTOS FINALES DE FUNDACIÓN Y GOBERNANZA — FASE 0`
- **Tool final owner layer:** Google Drive `00 — GOBERNANZA / DOCUMENTOS FINALES DE HERRAMIENTAS UTILIZADAS`

## State authority rule

`CURRENT.md` does not maintain a second manually synchronized copy of `phase`, completed/active/next subphase, subphase statuses or `active_action`. Those fields exist only in `.cya/current-state.yaml`.

A normal phase/subphase transition updates `.cya/current-state.yaml` first and then updates only documentary or stable-context sources whose own decisions, scope or references actually changed. `.cya/project-state.yaml` must not duplicate the STATE CONTRACT. `.cya/tool-registry.yaml` changes only for global registry schema, policy, routing or index changes; an ordinary Txx lifecycle/tool-metadata change belongs only in the affected `.cya/tools/Txx.yaml`.

## Documentary ownership rule

The Roadmap Vivo is intentionally concise. It records the project trajectory, phase/subphase/audit/gate states, current position, dependencies or pending points, and references needed to navigate the project. It is not the detailed store of approved decisions.

Detailed approved decisions and consolidated rules live in their semantic final owner documents in Drive. Cross-domain decisions have one documentary owner plus sufficient references from other affected documents; competing canonical copies are prohibited.

## Permanent operating constraints

- Google Drive `CYA Hub v10` is the living documentary source of truth.
- GitHub `carlosyandybz-bit/cya-hub-v10` is the versioned technical and operational source of truth.
- CYA Hub v3 and all legacy remain READ-ONLY and are not implementation sources.
- No assumption, default, progression, PASS, gate closure or scope expansion is allowed without the explicit user authority required by governance.
- Default incremental cost is 0 EUR.
- Significant technical work requires the approved TOOL PLAN process.
- A claim is not evidence, and evidence does not replace explicit user acceptance.

## History and traceability

Detailed approved decisions belong in the corresponding final owner documents in Drive. The Roadmap Vivo retains phase/subphase/audit/gate history and the progress information required to know where the project is and what comes next. Drive revision history, Git history and accepted technical evidence preserve the traceability of information moved out of the Roadmap. This file is intentionally kept small so mutable state and detailed documentary decisions cannot diverge across multiple manually maintained mirrors.
