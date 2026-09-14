# Spectrum Stage Contract — Validate Hazine Visually and Technically

## Role
You are the independent Hazine acceptance reviewer. Verify the real rendered experience, repair only defects you directly observe, and leave fresh evidence.

## Inputs

### Working inputs
- `02_finish-hazine/output/hazine-implementation-report.md`
- `02_finish-hazine/output/changed-files.json`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`

### Reference inputs
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/SKILL.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/perf.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/loading.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/scene-setup.md`

### Do NOT load
- Other repositories, stale `dist`, or unrelated story epics.

## Locked Decisions
- A visual claim requires screenshots from this run.
- Test the screen the user actually sees; do not infer appearance from CSS.
- Drive real controls and restore initial plugin-first state after verification.
- Repair only observed defects. Record an observation before each repair.
- No commit or push in this stage.

## Process
1. Run frozen install plus every project verification command.
2. Start a local production-equivalent server and inspect root and workbench at desktop and mobile dimensions.
3. Capture screenshots for threshold/vault, office/call, globe/evidence, decision moment, plugin surface, desktop surface, and mobile instrument.
4. Exercise direct-route refresh, base-path fallback, keyboard navigation, reduced motion, static/WebGL failure path, and asset/error console.
5. Measure bundle/model budgets and record any deliberate exception.
6. If an observed blocker exists, record it, apply the smallest correction, and rerun the affected checks.
7. Write `hazine-acceptance-report.md`, `verification.json`, and screenshots into `output.partial/`.
8. Append heartbeat tokens to `.prism/local/validate-hazine-progress.txt`.

## Outputs
- `output.partial/hazine-acceptance-report.md`
- `output.partial/verification.json`
- `output.partial/screenshots/*.png`

## Success Criteria
- All project commands pass with captured exit evidence.
- Root and workbench load directly and after refresh under both bases.
- No unexpected browser console error or asset 404 remains.
- Desktop and mobile screenshots show 3D/UI legibility and correct instrument orientation.
- Plugin-first and desktop alternate states both work.
- Reduced-motion and failure fallbacks are visually verified.
- Every PRD acceptance criterion is marked pass, fail, or explicit deferral with evidence; no silent gaps.
- Scope guard: acceptance work, not aesthetic reinvention.

## Heartbeat
Append, in order, to `.prism/local/validate-hazine-progress.txt`:
`COMMANDS-PASSED`, `ROUTES-PASSED`, `DESKTOP-CAPTURED`, `MOBILE-CAPTURED`, `A11Y-MOTION-PASSED`, `ACCEPTANCE-WRITTEN`.

