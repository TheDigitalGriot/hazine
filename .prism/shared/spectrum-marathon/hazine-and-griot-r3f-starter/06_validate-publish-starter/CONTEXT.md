# Spectrum Stage Contract — Validate and Publish griot-r3f-starter

## Role
You are the independent release reviewer for `griot-r3f-starter`. Verify the starter as a clean external consumer would, repair only observed defects, and publish an auditable public release.

## Inputs

### Working inputs
- `05_build-starter/output/starter-implementation-report.md`
- `05_build-starter/output/starter-exports.json`
- `C:/Users/digit/GriotClients/griot-r3f-starter`

### Reference inputs
- `04_publish-hazine/output/release.json`
- `.prism/shared/contracts/hazine-r3f-proof-index.json`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/SKILL.md`

### Do NOT load
- Hazine model binaries, brand assets, or unrelated repositories.

## Locked Decisions
- Publish a public repository named `TheDigitalGriot/griot-r3f-starter`.
- User has explicitly authorized local completion and GitHub push.
- A visual claim requires screenshots from this run.
- Validate from a clean clone/frozen install, including a non-root Pages base.
- Do not silently remove a visual/motion dependency because it is large; identify what it carries and test it.

## Process
1. Audit the starter for Hazine/client leakage, asset licensing, zero-caller helpers, and provenance completeness.
2. Run lint, typecheck, tests, build, browser smoke, responsive, reduced-motion, failure/retry, performance, and non-root-base verification.
3. Capture desktop and mobile screenshots of the neutral reference experience and its motion/interaction states.
4. Record any observed defect before repairing it; rerun affected checks.
5. Commit the complete starter in a small auditable sequence.
6. Create or attach `TheDigitalGriot/griot-r3f-starter`, push `main`, configure Pages/Actions, and wait for the workflow.
7. Verify repository and Pages URLs through fresh HTTP/browser checks.
8. Write `starter-release-report.md` and `release.json` into `output.partial/`.
9. Append heartbeat tokens to `.prism/local/validate-publish-starter-progress.txt`.

## Outputs
- Published `TheDigitalGriot/griot-r3f-starter` repository and Pages demo.
- `output.partial/starter-release-report.md`
- `output.partial/release.json`
- `output.partial/screenshots/*.png`

## Success Criteria
- Clean clone plus frozen install succeeds.
- All declared verification commands pass.
- Non-root Pages base and direct-route refresh pass.
- Desktop/mobile and reduced-motion/failure screenshots exist.
- No Hazine/client leakage or unlicensed asset exists.
- Every public helper has at least one consumer and every documented feature has a working instance.
- GitHub `main`, release commit, workflow, repository URL, and Pages URL are recorded and resolve.
- Scope guard: release the starter; do not modify Hazine except to append the final starter delivery link to its handoff.

## Heartbeat
Append, in order, to `.prism/local/validate-publish-starter-progress.txt`:
`LEAKAGE-AUDIT-PASSED`, `CLEAN-CLONE-PASSED`, `VISUALS-CAPTURED`, `COMMITS-CREATED`, `GITHUB-PUSHED`, `PAGES-VERIFIED`, `OUTPUT-WRITTEN`.

