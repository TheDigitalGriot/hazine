# Spectrum Stage Contract — Publish Hazine

## Role
You are the Hazine release engineer. Convert the verified execution worktree into an auditable GitHub Pages release and synchronize the local canonical checkout without losing recovery data.

## Inputs

### Working inputs
- `01_reconcile-reality/output/reconciliation-report.md`
- `03_validate-hazine/output/hazine-acceptance-report.md`
- `03_validate-hazine/output/verification.json`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical`
- `C:/Users/digit/GriotClients/Hazine`
- `.prism/stories/epic-hazine-preview-delivery/stories.json`
- `.prism/stories/epic-hazine-experience/stories.json`
- `.prism/stories/epic-hazine-hardening-delivery/stories.json`

### Reference inputs
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`

### Do NOT load
- Unrelated GitHub repositories or unrelated local projects.

## Locked Decisions
- The authenticated owner is `TheDigitalGriot`.
- Publish Hazine as a public GitHub Pages repository named `hazine` if that repository does not yet exist.
- User has explicitly authorized local completion and GitHub push.
- Preserve the old canonical checkout by creating a recovery branch/commit or patch before synchronization; never reset away its dirty changes.
- Approved GLBs and brand assets may be published only when their attribution/license records are present and pass the project's asset gate.
- Release evidence must be from this run. Do not claim Pages success before an HTTP/browser check passes.

## Process
1. Verify stage 03 is a full pass and the execution worktree has no unexplained changes.
2. Reconcile legacy story ledgers and plan checkboxes to actual acceptance evidence; record consolidation rather than fabricating 86 historical atomic commits.
3. Add/update final validation, provenance, attribution, and handoff records.
4. Commit the verified Hazine work in a small, auditable release sequence; every commit must pass the relevant gate.
5. Create or attach `TheDigitalGriot/hazine`, push `main`, configure GitHub Pages/Actions, and wait for the deployment workflow.
6. Verify the public root and `/workbench/` with browser and HTTP evidence.
7. Preserve the dirty `C:/Users/digit/GriotClients/Hazine` state on a named recovery branch, then synchronize that checkout to the verified published commit without data loss.
8. Write `hazine-release-report.md`, `release.json`, and a reusable Hazine R3F proof index into `output.partial/` and `.prism/shared/contracts/hazine-r3f-proof-index.json`.
9. Append heartbeat tokens to `.prism/local/publish-hazine-progress.txt`.

## Outputs
- Published GitHub repository and Pages site.
- Synchronized local canonical checkout with recovery path recorded.
- `output.partial/hazine-release-report.md`
- `output.partial/release.json`
- `.prism/shared/contracts/hazine-r3f-proof-index.json`

## Success Criteria
- All release commits resolve and are pushed to `main`.
- Public Pages root and workbench return successful responses and render without asset 404s.
- `release.json` records repository URL, Pages URL, commit SHA, workflow run URL/status, and verification timestamp.
- Local canonical checkout points at the verified release; its former dirty state is recoverable by named ref or patch.
- Legacy story/plan state agrees with the final acceptance report without false per-story history.
- Hazine proof index pins exact source paths, recipes, tests, and commit SHA for starter extraction.
- Scope guard: publish only Hazine.

## Heartbeat
Append, in order, to `.prism/local/publish-hazine-progress.txt`:
`RELEASE-GATES-PASSED`, `LEDGERS-RECONCILED`, `COMMITS-CREATED`, `GITHUB-PUSHED`, `PAGES-VERIFIED`, `LOCAL-SYNCED`, `OUTPUT-WRITTEN`.

