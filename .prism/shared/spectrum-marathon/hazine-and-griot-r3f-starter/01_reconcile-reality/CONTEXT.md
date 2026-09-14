# Spectrum Stage Contract — Reconcile Hazine Reality

## Role
You are the recovery architect for Hazine. Establish one evidence-backed execution baseline without changing product code or destroying either dirty tree.

## Inputs

### Working inputs
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical`
- `C:/Users/digit/GriotClients/Hazine`
- `.prism/shared/handoffs/2026-09-02_10-22-29_hazine-scroll-story-choreography.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`
- `.prism/shared/validation/2026-09-03-hazine-preview-report.md`
- `.prism/stories/epic-hazine-preview-delivery/stories.json`
- `.prism/stories/epic-hazine-experience/stories.json`
- `.prism/stories/epic-hazine-hardening-delivery/stories.json`
- `.prism/stories/epic-griot-r3f-starter/stories.json`

### Reference inputs
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/SKILL.md`
- `C:/Users/digit/.codex/plugins/cache/digital-griot-marketplace/prism/4.17.1/skills/spectrum/SKILL.md`
- `C:/Users/digit/.codex/plugins/cache/digital-griot-marketplace/prism/4.17.1/skills/spectrum-architect/references/prism-run-contract.md`

### Do NOT load
- Other repositories or unrelated `.prism` documents.
- `node_modules`, build artifacts, model binaries, or full Git object databases.

## Locked Decisions
- Gavin's 2026-09-14 instruction to use current Spectrum Marathon supersedes the historical handoff sentence that said not to resume with Spectrum.
- The task workspace is the recovery/execution worktree because it contains later authored implementation and delivery artifacts. `C:/Users/digit/GriotClients/Hazine` remains the declared local canonical checkout and must be preserved until a verified commit can synchronize it safely.
- Preserve both dirty trees. No reset, checkout, clean, deletion, commit, push, or product-code edit in this stage.
- Treat existing source and visual work as user-owned.
- The goal is acceptance-based completion of Hazine plus a separate, neutral `griot-r3f-starter`; the 87-story legacy queue is evidence/provenance, not a license to redo working features.

## Process
1. Record branch, HEAD, remotes, status, and changed-path inventories for both Hazine trees.
2. Compare the two trees by path and content hash; classify workspace-only, canonical-only, equal, and divergent files.
3. Map the workspace implementation to the approved PRD acceptance criteria and identify only observed remaining gaps.
4. Define the safe synchronization route: finish and verify in the execution worktree, create an atomic verified commit, publish, then fast-forward or re-clone the local canonical checkout without overwriting its uncommitted work.
5. Write `reconciliation-report.md` and `execution-baseline.json` into this stage's `output.partial/`.
6. Append heartbeat tokens to `.prism/local/reconcile-reality-progress.txt`.

## Outputs
- `output.partial/reconciliation-report.md`
- `output.partial/execution-baseline.json`

## Success Criteria
- Both dirty trees are inventoried with exact path counts and hashes where relevant.
- The reason for using the execution worktree is explicit and reversible.
- Every remaining gap is tied to a PRD acceptance criterion or quality gate.
- No product file, story state, Git ref, or remote is changed.
- The report names exact inputs for the next stage and a scope guard against redoing complete work.
- Scope guard: this stage observes and contracts; it does not implement.

## Heartbeat
Append, in order, to `.prism/local/reconcile-reality-progress.txt`:
`BASELINES-CAPTURED`, `TREES-COMPARED`, `ACCEPTANCE-MAPPED`, `SYNC-ROUTE-LOCKED`, `OUTPUT-WRITTEN`.

