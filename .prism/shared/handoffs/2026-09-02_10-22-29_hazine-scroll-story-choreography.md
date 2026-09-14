---
date: 2026-09-02T10:22:29-04:00
researcher: Codex
git_commit: 98bca9e36fe8712245f7e9ba7bc6cb7d1dda97c4
branch: main
topic: "Hazine Scroll Story, R3F Choreography, and Dual-Surface Walkthrough Handoff"
tags: [handoff, hazine, react, r3f, theatre-js, anime-js, claude-plugin, desktop-app, provenance]
status: in-progress
---

# Handoff: Hazine experiential walkthrough and live intelligence story

## Task(s)

- **In progress — primary:** Build the multi-page/scroll-led Hazine experience that introduces the product through an authored 3D journey and then lets Ezgi interact with a medium/high-fidelity product walkthrough.
- **In progress — 3D story:** Islamic architectural threshold → travel through the two-room treasury vault and its door frame → interactive living-treasury seal → Ezgi on a live call in a minimalist office, viewed away from camera → camera travels out the window and upward past the office building → globe/geographic network → quarry/ore/deal intelligence.
- **In progress — live product story:** Simulate a commodity deal call and progressively reveal transcription, evidence, geographic context, relationship intelligence, provenance, and the closing moment.
- **Locked product order:** The Claude plugin is the first/default product surface. The desktop app follows later. The walkthrough must let the viewer toggle between **Claude plugin** and **Desktop app**, sharing one intelligence/memory layer.
- **Planned:** Finish scene choreography, responsive polish, and the separate `/workbench` feature walkthrough so it matches the approved Hazine visual system.
- **Deferred:** Final shader eye candy (gold glimmer/mineral sparkle), further GLB optimization, a production performance pass, canonical-repo sync, commit, and GitHub push.

## Locked Decisions — Do Not Re-Litigate

1. Hazine is a hybrid **Claude agent/plugin + desktop application**, but the **Claude plugin is the default and ships first**.
2. Product thesis: a living treasury of intelligence. Core loop: **Collect → Connect → Surface**.
3. Ezgi is the trader and the guided use case centers on a live copper-concentrate supply negotiation with Marco Vidal of Santiago Metals.
4. UI must use the approved language: **light ivory center workspace with dark rails**, restrained gold/bronze and mineral green accents. Do not revert to an all-dark trading dashboard.
5. Intelligence is provenance-first. Every important statement must retain speaker/source, timestamp, retrieval lineage, and confidence.
6. Canonical taxonomy is immutable: **FACT / SIGNAL / INTERPRETATION / HYPOTHESIS / STRATEGY**.
7. Approved Hazine brand assets are immutable and already present in `public/brand/`.
8. 3D is narrative infrastructure, not decoration. UI and 3D must hand off spatial priority instead of overlapping as competing layers.
9. Anime.js owns DOM/micro-interaction/connected-line transformations. R3F + Theatre own the 3D camera and scene choreography.
10. Use maintained existing globe infrastructure; do not rebuild a globe engine.

## Critical References

- `src/components/HazineScene.jsx` — R3F actors, vault camera path, procedural treasury seal, office/building/globe choreography.
- `src/components/LiveSystemOverlay.jsx` and `src/components/live-system.css` — live intelligence product surface, Claude-plugin/desktop toggle, transcript/evidence/persona/decision states.
- `src/App.jsx`, `src/data/chapters.js`, and `src/styles.css` — complete scroll narrative, chapter instrumentation, and approved asset sections.
- `C:/Users/digit/.agents/skills/griot-motion-design/SKILL.md`, `C:/Users/digit/.agents/skills/griot-r3f/SKILL.md`, and `C:/Users/digit/.agents/skills/glb-scene-optimizer/SKILL.md` — mandatory implementation patterns already used in this pass.

## Recent Changes

- `src/components/HazineScene.jsx:22` — staged threshold, two-room vault, office, caller, office building, quarry, truck, and crystal as scroll actors.
- `src/components/HazineScene.jsx:55` — added actor-specific mesh exclusion; the office's oversized `Background` mesh is now hidden so it no longer masks Ezgi and the room.
- `src/components/HazineScene.jsx:104` — integrated `three-globe` directly with a local Earth texture, Toronto/Antofagasta points, a mine-corridor ring, labels, and an animated route.
- `src/components/HazineScene.jsx:158` — created the interactive 3D living-treasury seal driven by hover/open state.
- `src/components/HazineScene.jsx:205` — authored Catmull-Rom vault travel and scroll camera keyframes.
- `src/components/LiveSystemOverlay.jsx:6` — added phased live-call state for call, geography, evidence, relationship, and decision chapters.
- `src/components/LiveSystemOverlay.jsx:23` — added a working dual-surface switch with **Claude plugin as default**.
- `src/components/LiveSystemOverlay.jsx:46` — added accessible Plugin/Desktop controls and Claude-plugin connected state.
- `src/components/live-system.css:1` — built the approved dark-rail/light-workspace interface, circular scene aperture, source cards, transcript island, connected lines, and responsive rules.
- `src/App.jsx:125` — mounts the live system over the 3D scroll story.
- `src/data/chapters.js` — expanded the journey to ten chapters: threshold, vault, call, geography, evidence, relationship, decision, walkthrough, hybrid, treasury.
- `src/state/experience.js` — added treasury-seal hover/open state.
- `scripts/optimize-assets.mjs:17` — added repeatable optimization recipes for the business caller, office, and building.
- `scripts/generate-models.mjs:12` — added repeatable `gltfjsx` generation for the three new models.
- `scripts/fix-building-materials.mjs` — removed only invalid glass clearcoat-normal assignments from the office building source while preserving its glass, emissives, clearcoat, and geometry.
- `MODEL_ATTRIBUTIONS.md:10` — recorded CC BY 4.0 attribution for Business Call, Minimalistic Modern Office, and Atlanta Corporate Office Building.
- `package.json:25` — uses `three-globe` directly. The abandoned `r3f-globe` wrapper was removed because its React 19 incompatibility triggered `__kapsuleInstance` failures.

## Learnings

- The large dark circular form seen during the call was partly the deliberately transparent scene aperture and partly the office model's own oversized background mesh. The model mesh is now excluded; the aperture remains as the UI-to-3D window and should be tuned, not removed.
- The call frame now successfully shows the minimalist office and caller behind the approved light workspace. Ezgi/caller still sits too close to the right aperture edge; reposition before calling the composition complete.
- The geography frame successfully combines globe, animated lines, location chips, transcript, and source rail. The office building currently remains too opaque for too long and visually overlaps the globe. Shorten the building actor's influence so it becomes a transitional reveal rather than a persistent layer.
- The vault frame is visually strong and lit, with treasure, the second room, and floating seal visible. The seal is still oversized and partially competes with the chapter headline. Reduce its base factor from `0.58` to approximately `0.36–0.42` and recheck the open transition.
- Direct `three-globe` works in the current React 19/R3F stack after Vite dependency optimization. The stale `r3f-globe` React wrapper does not. Primary references: `https://github.com/vasturiano/three-globe` and React 19 incompatibility report `https://github.com/vasturiano/r3f-globe/issues/3`.
- Source GLBs are preserved untouched in `assets/original/`. Optimized outputs are used in `public/models/`.
- Optimization results: business caller ~29.1 MB → ~2.64 MB; office ~14.6 MB → ~1.55 MB; building ~10.8 MB → ~1.18 MB.
- The working copy is **not a Git repository**. Git metadata above belongs to the canonical repo at `C:/Users/digit/GriotClients/Hazine`, which is currently clean but does **not** yet contain this session's latest work. Do not assume they are synchronized.

## Visual Verification at Pause

- `#vault` around scroll Y 1919: strong lit treasury-room shot; seal too large; chapter headline slightly competes with it.
- `#call` around scroll Y 2988: plugin-default shell, office visible, caller visible on far right, transcript/evidence UI readable; caller needs centering and more deliberate silhouette framing.
- `#geography` around scroll Y 4166: globe, route lines, chips, transcript, source chart, and both surface modes work; building/globe overlap needs choreography cleanup.
- Claude plugin/Desktop toggle works in the live overlay. Reload resets correctly to Claude plugin.
- Production build passes: Vite transformed 988 modules with no errors. Remaining warning is large R3F/Three chunks; handle during the performance pass.
- Current dev console contains historical hot-reload errors from the removed wrapper plus only the current `THREE.Clock` deprecation warning. Reload and clear console before final validation.

## Artifacts

### New/updated product code

- `src/App.jsx`
- `src/styles.css`
- `src/data/chapters.js`
- `src/state/experience.js`
- `src/components/HazineScene.jsx`
- `src/components/LiveSystemOverlay.jsx`
- `src/components/live-system.css`
- `src/components/KnowledgeTransform.jsx`
- `src/components/TaxonomyExplorer.jsx`
- `src/components/InstrumentRail.jsx`

### Generated R3F model components

- `src/models/BusinessCallModel.jsx`
- `src/models/OfficeModel.jsx`
- `src/models/OfficeBuildingModel.jsx`
- Existing generated components for threshold, treasury vault, quarry, mining truck, and crystal remain in `src/models/`.

### 3D and texture assets

- `public/models/business_call.glb`
- `public/models/minimalistic_modern_office.glb`
- `public/models/free__atlanta_corperate_office_building.glb`
- Existing optimized quarry, truck, crystal, threshold-vault, and treasury-vault GLBs in `public/models/`.
- `public/textures/earth-night.jpg`
- Untouched inputs in `assets/original/`; prepared building source in `assets/prepared/`; optimized copies in `assets/optimized/`.

### Tooling and documentation

- `scripts/optimize-assets.mjs`
- `scripts/generate-models.mjs`
- `scripts/fix-building-materials.mjs`
- `asset-report.original.json`
- `asset-report.optimized.json`
- `MODEL_ATTRIBUTIONS.md`
- `package.json`
- `pnpm-lock.yaml`

### Approved immutable visual references

- `public/brand/hazine-desktop-v4.png`
- `public/brand/hazine-claude-plugin-v4.png`
- `public/brand/hazine-design-system-with-icon.png`
- Remaining approved wordmark/glyph/lockup/app-icon assets under `public/brand/`.

## Action Items & Next Steps

1. Resume the local site and reload the open browser before changing code.
2. Finish the R3F choreography before adding shader polish:
   - reduce Treasury Seal scale and verify hover/open expansion;
   - move/rotate the caller so Ezgi reads clearly as an away-from-camera phone silhouette inside the aperture;
   - shorten office-building influence and create a clean building → globe dissolve;
   - verify the vault camera crosses the door frame and establishes both rooms at scroll start/mid/end;
   - confirm no two narrative actors hold full opacity simultaneously except during deliberate crossfades.
3. Tune `.scene-aperture`, transcript placement, and source cards per phase so no essential 3D subject is hidden by interface islands.
4. Convert the current binary surface styling into a clearer product demonstration:
   - Claude plugin remains default;
   - plugin mode should feel embedded/companion-sized;
   - desktop mode expands the full navigation rail and workspace;
   - state and selected transcript moment persist across the switch.
5. Restyle `/workbench` to the same approved light-center/dark-rails system. It still reflects an older all-dark exploration and should not be treated as final.
6. Implement actual transcript moment interaction: selecting a spoken line should update connected evidence, geography, persona, confidence, and strategy cards rather than only highlighting by chapter.
7. Verify evidence, relationship, and decision frames individually at 1440×900; then test 390×844 mobile. The dynamic island should be vertical on desktop and horizontal on mobile.
8. Run accessibility/console checks and clear historical HMR noise. Add an explicit R3F error boundary and a graceful reduced-motion/static fallback.
9. Performance pass: lazy-load late 3D actors, re-evaluate the Three/Globe bundle, and only then tune texture resolution, mesh simplification, bloom, mineral shaders, and DPR.
10. Sync the verified working copy into `C:/Users/digit/GriotClients/Hazine` without deleting `.git` or user files. Review diff, commit locally, then ask for the exact GitHub-push confirmation required by the GitHub repository boundary.

## Resume Commands / Runtime

- Working directory: `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-experience`
- Canonical repo: `C:/Users/digit/GriotClients/Hazine`
- Local URL: `http://127.0.0.1:5173/`
- Existing Vite terminal session at pause: exec session `62162`.
- The bundled runtime must be placed first on `PATH` in this sandbox:
  - Node: `C:/Users/digit/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`
  - pnpm: `C:/Users/digit/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm.cmd`
- Verified build command after setting that PATH: `pnpm run build`.

## Other Notes

- The user is Gavin; “Beloved” and “Kindred” are also established respectful names in this collaboration.
- The requested experiential voice is Digital Griot: lucid, cinematic, intimate, and rigorous—not decorative mysticism or generic fintech spectacle.
- Latest user correction is load-bearing: the plugin is not a secondary afterthought. The walkthrough begins there, and Desktop represents the expansion of the same intelligence system.
- Do not ask Gavin to re-upload the approved Hazine UI unless the files in `public/brand/` are genuinely missing; they are present now.
- Do not push to GitHub during resume without explicit final authorization at the repository boundary.
## Pause checkpoint — 2026-09-03 08:28 EDT

Gavin asked to stop with approximately 1% session capacity remaining. All Spectrum worker and reviewer processes started for this run were explicitly terminated. Do not discard, reset, or overwrite the partial STORY-001 work.

### Gavin's execution-engine correction — locked

Do **not** resume with Spectrum. Gavin clarified that Prism owns discovery, the PRD, the approved plan, decomposition, and the task queue, but `C:/Users/digit/.agents/skills/griot-r3f/SKILL.md` must directly drive implementation of that queue. Treat the decomposed stories as the ordered checklist and provenance ledger, not as instructions to relaunch `spectrum.sh`.

For each remaining task, the implementing agent must identify the applicable `griot-r3f` domains, read the relevant recipe files in full, implement against those recipes, verify proportionately, and then update the Prism task/story record. Preserve atomic, reviewable commits, but do not use the Spectrum controller or its Claude worker loop.

### Completed before the pause

- Approved Hazine PRD, implementation plan, and repaired 87-story Prism decomposition are present in `.prism/`.
- Prism Implement Phase 0 completed safely in the canonical repository.
- Canonical branch: `prism/hazine-experience-baseline`.
- Baseline snapshot commit: `fdd6a7c0d69b28c14a6016db05f0aa5c85e395df`.
- Phase 0 checkpoint commit: `3a98e5231f4bfbc7813ca0dea898d34fa00cec45`.
- `griot-r3f` was made a normative execution contract for all four Spectrum epics and committed as `34ff34f`.
- Frozen install and production build passed before Spectrum began.

### Exact stopped state

- Canonical repository: `C:/Users/digit/GriotClients/Hazine`.
- HEAD remains `34ff34f` on `prism/hazine-experience-baseline`; no STORY-001 commit was created.
- Spectrum was interrupted during STORY-001, **Resolve assets beneath the repository base**.
- The story file currently says `STORY-001: complete`, but has no `commitHash`. This is partial controller state, not a completed story.
- Pending stories remain STORY-002 through STORY-008.
- The working tree intentionally contains uncommitted STORY-001 changes across the base-aware URL helper and every actual runtime URL consumer, including generated model loaders, story UI, workbench UI, `src/main.jsx`, `vite.config.js`, and `src/lib/`.
- `.prism/shared/spectrum/` contains the new progress files. `.prism/local/spectrum.lock` contains stale PID `566`; the next controller must verify no Spectrum worker is active before removing or allowing Spectrum to replace it.
- The runtime-path blast radius exceeded the decomposed story's initial file array because models, brand links, navigation, and the workbench each contained root-absolute URLs. That broader set is behaviorally required by STORY-001 and must be reviewed explicitly before commit.

### Resume protocol

1. Work only in `C:/Users/digit/GriotClients/Hazine`; preserve the dirty tree.
2. Verify no Spectrum/Claude process from this run is active.
3. Inspect the existing STORY-001 diff before changing anything. Do not relaunch Spectrum; its interrupted controller left STORY-001 falsely marked complete.
4. Reconcile STORY-001 state to `in_progress`, retain the existing implementation, and finish its production build, review, and browser verification directly through the `griot-r3f` loading/performance recipes.
5. Commit STORY-001 atomically, then write its real `commitHash`, `completedAt`, and verified step state. Preserve one-story/one-commit semantics when reconciling state.
6. Only after STORY-001 is clean and committed should the `griot-r3f`-driven implementation continue with STORY-002 from `.prism/stories/epic-hazine-preview-delivery/stories.json`.

No GitHub remote or repository was created before this pause. GitHub target resolution remains owned by STORY-006; deployment remains STORY-007 and public verification remains STORY-008.
