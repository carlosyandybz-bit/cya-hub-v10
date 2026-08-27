# CYA Hub v10

New isolated reconstruction of CYA Hub.

## Start here

- **Canonical mutable project state:** [`.cya/current-state.yaml`](.cya/current-state.yaml)
- **Human status/navigation panel:** [`CURRENT.md`](CURRENT.md)
- **Agent operating rules:** [`AGENTS.md`](AGENTS.md)
- **Stable machine-readable project context:** [`.cya/project-state.yaml`](.cya/project-state.yaml)
- **Tool/action registry:** [`.cya/tool-registry.yaml`](.cya/tool-registry.yaml)
- **Mandatory TOOL PLAN template:** [`.cya/planning-template.md`](.cya/planning-template.md)
- **Canonical ChatGPT Project Instructions:** [`.cya/chatgpt-project-instructions.md`](.cya/chatgpt-project-instructions.md)

## Core rule

No relevant action is executed before reviewing the living Tool Guide and the canonical mutable state in `.cya/current-state.yaml`. If an action is not registered, it is documented in the correct location before execution and then either performed as the correct next step or explicitly deferred.

`CURRENT.md` and `.cya/project-state.yaml` do not maintain competing manual copies of mutable phase/subphase state. Ordinary transitions update `.cya/current-state.yaml` first. `.cya/tool-registry.yaml` changes only when tool lifecycle, routing or approved tool metadata actually changes.

## Isolation

CYA Hub v3 and every other legacy resource are read-only reference material only. Never write to legacy systems from this repository.
