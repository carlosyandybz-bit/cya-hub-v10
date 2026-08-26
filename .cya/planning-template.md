# CYA Hub v10 — Mandatory TOOL PLAN

Use this complete template before any significant technical action or significant governance change covered by the approved 0.7 rules. A purely READ-ONLY inspection with no mutation may omit the full TOOL PLAN unless the applicable Roadmap point or governance rule explicitly requires it.

An approved TOOL PLAN is an execution contract. It must not be rewritten retrospectively to accommodate what occurred. If the tool, scope, cost, evidence, rollback, environment, permissions or gate changes materially, stop the affected work and return to the user for explicit approval.

## Context

**Phase:**  
**Subphase:**  
**Action:**  
**Acceptance criterion / gate:**  

## Governance and authorization

**Guide reviewed:** yes / no  
**Action already registered:** yes / no  
**If no, where was it proposed and approved before registration/execution:**  
**Applicable explicit user authorization:**  
**Is the action immediate or deferred:**  

## Tool selection

**Primary tool / route:**  
**Supporting tool(s):** none / list  
**Fallback:** none / proposed fallback  
**Fallback explicitly approved for this exact case and scope:** not applicable / yes — approval reference:  
**Why this primary route:**  
**Access confirmed:** yes / no  

If the primary route fails, is unavailable or lacks sufficient access, stop and record `BLOCKED_TOOLING`. Do not switch route unless the fallback has explicit user approval for the exact case and scope.

## Codex implementation guard

Complete this section whenever the action creates or modifies application implementation.

**Is this implementation creation/modification:** no / yes  
**Codex is the registered primary route for this implementation:** not applicable / yes  
**Codex available:** not applicable / yes / no  
**Included plan usage checked when the client exposes it:** not applicable / yes / unavailable  
**Included plan usage sufficient for this task:** not applicable / yes / no / unknown  
**Would the task require purchased/flexible credits, paid overage, credit purchase or auto-recharge:** not applicable / no / yes / unknown  
**Paid Codex usage explicitly authorized for this exact task:** not applicable / no / yes — approval reference:  
**Validation operations reserved to chats and excluded from Codex prompt:** not applicable / yes  

If Codex is unavailable, record `BLOCKED_TOOLING` unless an implementation fallback has been explicitly approved for the exact case and scope. If included plan usage is exhausted/insufficient, or paid-credit consumption is required without explicit authorization, record `BLOCKED_COST`. If usage is unknown and there is a realistic risk of consuming paid credits, do not assume free capacity; return to the user for decision.

A prompt or agent instruction is not an account-level billing control. The TOOL PLAN records the project policy and the visible usage check; actual charging remains governed by the account/client controls.

## Scope

**Allowed scope:**  
**Forbidden scope:**  
**Legacy interaction:** none / read-only reference explicitly authorized  

## Inputs and outputs

**Required inputs:**  
**Expected output:**  
**Destination of changes:**  

## Evidence and validation

**Required evidence:**  
**Validation tool / method:**  
**PASS condition:**  
**Evidence links / IDs:**  

A successful tool call, command or workflow does not by itself establish PASS. The result must satisfy the applicable acceptance criterion and evidence requirements, and user acceptance remains separate.

## Error / root-cause handling

**Is this action correcting an error:** no / yes  
**If yes, root-cause rule from 0.6 Decision 20 reviewed:** not applicable / yes  
**Root cause identified:** not applicable / yes / no — if no, the error remains open or blocked as applicable  
**Approved temporary patch/workaround exception:** none / yes — explicit prior user approval reference:  

## Safety and rollback

**Potential destructive or irreversible effects:**  
**Rollback / reversal:**  
**Rollback execution pre-authorized within this exact scope and conditions:** no / yes — conditions:  
**Secrets involved:** no / yes — approved storage/residence reference only, never secret value:  
**Access or permission changes involved:** no / yes — exact approved scope:  

## Cost

**Incremental cost:** 0 EUR / other  
**If other, explicit user approval reference:**  
**If payment is required, free-alternative limitation / cost / lock-in / impact of stopping payment / exit strategy documented:** not applicable / yes  

## Result

**Execution status:** NOT_STARTED / IN_PROGRESS / PASS / FAIL / BLOCKED_TOOLING / BLOCKED_USER_ACTION / BLOCKED_COST  
**Material TOOL PLAN change discovered during execution:** no / yes — if yes, affected work stopped pending user approval  
**Next action:**  
