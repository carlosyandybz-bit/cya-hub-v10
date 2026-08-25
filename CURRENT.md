# CYA Hub v10 — CURRENT STATUS

> Human-readable control panel. This file must agree with `.cya/project-state.yaml` and the Drive Roadmap Vivo.

## Current position

**Global status:** PRE-FASE 0 — BLOCKED USER ACTION  
**Phase:** Pre-0  
**Subphase:** Context layer  
**Active action:** configure ChatGPT Project Instructions and Project Sources  
**Incremental cost target:** 0 EUR

## Current TOOL PLAN

**Primary tools:** ChatGPT Project configuration + Google Drive Project Source  
**Purpose:** ensure every future chat starts from the approved living context  
**Evidence required:** project instructions visible + CYA Hub v10 Drive source visible  
**Gate:** a clean test chat must reconstruct phase, guide-review rule, tool policy and next action without relying on this conversation

## Completed

- Progressive, ordered working methodology defined.
- Roadmap Vivo created in Google Drive.
- Guía Maestra de Herramientas, Agentes y Planning Operativo created, reviewed and expanded with access/context/chat-lifecycle rules.
- Mandatory guide review before every relevant action established.
- Rule established: unregistered actions are documented before execution, then executed only if immediate; otherwise deferred and recorded.
- Conversation-length and chat-handoff policy established.
- `USER ACTION REQUIRED` protocol established.
- GitHub `cya-hub-v10` access verified.
- Google Drive access verified.
- Maximum app-specific access enabled where currently supported.
- Repository context layer installed: `AGENTS.md`, `.cya/tool-registry.yaml`, `.cya/project-state.yaml`, `.cya/planning-template.md`, `.cya/chatgpt-project-instructions.md`, `.cya/bootstrap-checklist.md`.
- README now points to the operational control files.

**Bootstrap evidence commit:** `865d8177f237a8557870845e360cdedf88251baf`

## USER ACTION REQUIRED — now

### Configure the ChatGPT Project

1. Open the ChatGPT project **CYA Hub v10**.
2. Open the project settings/customization area and locate **Project Instructions**.
3. Paste the canonical instructions from `.cya/chatgpt-project-instructions.md` exactly as provided by ChatGPT in the current handoff.
4. In **Project Sources**, add the connected Google Drive folder **CYA Hub v10** if the UI supports selecting/adding the folder or its Drive link.
5. Ensure only v10 sources are added. Do **not** add CYA Hub v3, legacy Drive folders or legacy repositories.
6. Return to this chat and confirm that the instructions and v10 Drive source are visible. A screenshot is ideal if convenient.

**Expected evidence:** confirmation or screenshot showing both settings.

## Next system action after your confirmation

Perform the clean-context verification. If it passes, mark the context bootstrap PASS, update the Roadmap and open the dedicated **Fase 0** chat. If it fails, repair the context layer before any Phase 0 technical work.

## Deferred — do not execute yet

- T01 CYA Browser Lab — Phase 0 after context/bootstrap governance is validated.
- T02 CYA Quality Gate — Phase 0 progressive.
- T03 CYA Security Gate — Phase 0.
- T04 CYA Deploy Bridge — bootstrap after Hostinger capability verification.
- T05 Runtime Health — executable app required.
- T06 Visual QA — base later, intensive from Phase 3.
- T07 Performance Lab — Phase 4/8.
- T08 Accessibility Lab — base later, full rules from Phase 3.
- T09 Backend Control — Phase 2 architecture decision.
- T10 Observability Bridge — executable app required.
- T11 Design Bridge — Phase 3.

## Living sources

- Roadmap Vivo: https://docs.google.com/document/d/1yTYr1eS_b3cuODTyC2yz1uEGsB2-n0Ba0WdrPrPs4Bo/edit
- Tool Guide: https://docs.google.com/document/d/1eDWjwqQhk8lQNeiDuzShzD9tJbtvzlqIk-jEazGXF0A/edit
- Repository: https://github.com/carlosyandybz-bit/cya-hub-v10

## Chat lifecycle

The assistant must recommend a new chat before context length threatens precision. Before any handoff, update this file, `.cya/project-state.yaml`, the Roadmap and applicable phase documentation, then provide the exact handoff prompt.
