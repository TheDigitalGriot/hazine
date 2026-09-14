# Spectrum Stage Contract — Finish the Hazine Experience

## Role
You are the senior experiential product engineer finishing Hazine as a polished, provenance-first R3F walkthrough. Preserve the authored Digital Griot visual language and implement only evidence-backed acceptance gaps.

## Inputs

### Working inputs
- `01_reconcile-reality/output/reconciliation-report.md`
- `01_reconcile-reality/output/execution-baseline.json`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical/src/`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical/scripts/`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical/package.json`
- `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-canonical/vite.config.js`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`

### Reference inputs
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/SKILL.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/scene-setup.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/loading.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/animation.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/materials.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/controls.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/postprocessing.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/perf.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/interop-tools.md`
- `C:/Users/digit/GriotMeta/digital-griot-skills/griot-r3f/references/state.md`

### Do NOT load
- Unrelated repositories, old mockup explorations, `node_modules`, `dist`, or original multi-megabyte GLBs.
- Do not replace approved brand assets or redesign the experience from scratch.

## Locked Decisions
- Ezgi is the trader and narrative protagonist.
- Hazine is hybrid desktop plus Claude agent/plugin; plugin is the default surface and desktop is the alternate.
- Preserve the light center workspace with dark rails, approved Hazine brand, gold/green accent restraint, and provenance-first interaction model.
- Preserve FACT / SIGNAL / INTERPRETATION / HYPOTHESIS / STRATEGY taxonomy.
- Preserve and refine: Islamic threshold vault into two-room treasury traversal; floating seal; office-to-window-to-globe transition; live call transcript; evidence, geography, relationship intelligence, evolving persona, and deal-closing moment.
- Anime.js/DOM motion, R3F, GSAP scroll choreography, and Theatre.js each need a clear boundary. Do not add duplicate clocks. If Theatre has no meaningful authored track, establish an explicit optional adapter boundary and document it instead of faking keyframes.
- Never hide the 3D story behind opaque content slabs. Desktop uses a vertical instrument rail; mobile uses a horizontal safe-area-aware instrument.
- Approved assets are immutable inputs. No replacement, recoloring, or lossy re-export of brand files.
- Do not commit or push in this stage.

## Process
1. Run the current frozen install/build and inspect the real rendered root and workbench before editing; persist the observation.
2. Close only the acceptance gaps named by stage 01, prioritizing unified loading/error/retry, chapter-aware asset loading, aspect-ratio responsive framing and safe zones, reduced motion, keyboard/focus behavior, and coherent runtime asset manifests.
3. Preserve the scene choreography while preventing DOM/3D occlusion at desktop and mobile breakpoints.
4. Make all interactive demo controls functional at 60% fidelity: plugin/desktop toggle, transcript moment selection, live/evidence/relationship views, pause/resume, chapter navigation, and floating seal transition.
5. Add a coherent verification surface (`lint`, `typecheck` where applicable, `test`, `build`, and a browser smoke/route check) without introducing ornamental dependencies.
6. Update implementation documentation only where actual behavior changed. Do not mark acceptance complete without evidence.
7. Write `hazine-implementation-report.md` and `changed-files.json` into this stage's `output.partial/`.
8. Append heartbeat tokens to `.prism/local/finish-hazine-progress.txt`.

## Outputs
- A completed Hazine working tree at the execution-worktree path.
- `output.partial/hazine-implementation-report.md`
- `output.partial/changed-files.json`

## Success Criteria
- Root and `/workbench/` build paths succeed at `/` and `/hazine/` bases.
- The live walkthrough defaults to Claude plugin and toggles to desktop without losing selected moment, panel, or play state.
- 3D remains legible through narrative and live-system UI at representative desktop and mobile sizes.
- Vault camera path crosses the door frame and enters both rooms without clipping.
- Office, Ezgi call, building release, globe geography, evidence lineage, relationship memory, and strategy moment are coherent in sequence.
- Loading, WebGL failure, retry, reduced-motion, and static narrative fallbacks exist and are usable.
- Runtime asset paths derive from one canonical manifest and no unexpected asset 404 occurs.
- High-frequency scene motion uses refs/frame-loop mutation rather than React state churn.
- The Theatre boundary is meaningful and documented, whether authored-track or optional-adapter.
- New verification commands exist and pass.
- Scope guard: no backend, real microphone, production Claude MCP, or Electron runtime is invented; this remains an honest interactive product walkthrough.

## Heartbeat
Append, in order, to `.prism/local/finish-hazine-progress.txt`:
`RUNTIME-OBSERVED`, `LOADING-HARDENED`, `RESPONSIVE-CHOREOGRAPHY-PASSED`, `INTERACTIONS-PASSED`, `VERIFICATION-SURFACE-PASSED`, `OUTPUT-WRITTEN`.

