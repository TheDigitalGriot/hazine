---
date: 2026-09-03
author: Codex with Gavin
status: approved
approval: Gavin explicitly approved the summarized goal, files, patterns, constraints, and execution shape on 2026-09-03
prd: ./2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md
handoff: ../handoffs/2026-09-02_10-22-29_hazine-scroll-story-choreography.md
tags: [plan, hazine, r3f, anime-js, theatre-js, github-pages, starter]
---

# Implementation Plan: Hazine Experience → `griot-r3f-starter`

## Goal

Finish, validate, and publish the Hazine experiential walkthrough, then extract its proven choreography, state, asset, resilience, and deployment patterns into a robust reusable `griot-r3f-starter` without shipping Hazine-specific assets or speculative abstractions.

## Current State

- The working implementation is at `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-experience`.
- The canonical Git repository is `C:/Users/digit/GriotClients/Hazine`, clean at `98bca9e`, but behind the working implementation.
- No Git remote is configured in the canonical repository yet.
- The story and `/workbench` are locally functional; production build passes.
- Current high-risk couplings:
  - `src/data/chapters.js`, `src/App.jsx`, `src/components/HazineScene.jsx`, and `src/components/LiveSystemOverlay.jsx` maintain separate choreography tables.
  - actor material mutation in `HazineScene.jsx:44-102` affects every GLB;
  - route/base-path behavior in `src/main.jsx:6-15`, `vite.config.js:4-23`, and root-absolute asset paths affects all deployment targets;
  - global class names overlap between story and workbench styles.

## Architectural Decisions

1. Create one canonical experience manifest containing chapter IDs, overlay phase, actor envelopes, instrument copy, and responsive safe-zone metadata.
2. Keep a single shared selected-moment data model for plugin, desktop, story overlay, and workbench.
3. Continue using normalized GSAP progress as the master scroll clock; Theatre receives that clock and may own explicitly authored properties where useful.
4. Keep imperative, delta-time R3F updates; remove allocations and React state writes from render loops.
5. Keep direct `three-globe`; ban the incompatible `r3f-globe` wrapper.
6. Resolve all runtime asset URLs through a centralized base-aware helper.
7. Publish a verified Hazine milestone before starter extraction.
8. Extract starter modules only when the corresponding Hazine story is complete and validated.

## Phase 0 — Canonical Repository Bootstrap (Prism Implement, Not Spectrum)

### Purpose

Create the safe Git-backed execution baseline that Spectrum requires. This phase runs once with
`prism-implement` before any epic is launched; it is deliberately not represented as Spectrum
stories because the stories do not yet have a canonical repository in which to execute.

### Source and target

- Approved working snapshot: `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-experience`
- Canonical repository: `C:/Users/digit/GriotClients/Hazine`
- Include the approved application snapshot and `.prism/` planning/story artifacts.
- Preserve canonical `.git`, unmatched user files, and unrelated work.

### Steps

- [ ] Verify the exact resolved source and target paths and confirm the target contains the canonical `.git` directory.
- [ ] Capture source and target inventories and canonical Git status before copying.
- [ ] Build an explicit approved source-to-target copy manifest, including `.prism/`; do not use a deleting mirror.
- [ ] Copy only manifest entries into the canonical repository while preserving `.git`, unmatched paths, and unrelated files.
- [ ] Review the complete canonical diff and resolve unexpected additions, omissions, or overwrites.
- [ ] Run `pnpm install --frozen-lockfile` and `pnpm run build` in the canonical repository.
- [ ] Create a dedicated baseline branch from the reviewed canonical state.
- [ ] Commit the reviewed bootstrap atomically and record the branch name and commit SHA in the run handoff.
- [ ] Launch Spectrum only from that canonical baseline, one epic at a time in dependency order.

### Verification

- Canonical `.git` is intact and the pre-copy state is recoverable from Git history.
- The reviewed diff contains only approved snapshot and Prism-artifact changes.
- `pnpm run build` passes in the canonical repository.
- The dedicated baseline branch is clean at the recorded commit.

**Checkpoint**: [ ] Phase 0 complete; controller may launch `epic-hazine-preview-delivery`

### Spectrum queue and dependency protocol

Launch exactly one epic per Spectrum session in this order:

1. `epic-hazine-preview-delivery` — Phase 1 progress build.
2. `epic-hazine-experience` — Phases 2–4 full experience behavior.
3. `epic-hazine-hardening-delivery` — Phases 5–6 hardening, final validation, and release.
4. `epic-griot-r3f-starter` — Phases 7–8 validated extraction and documentation.

Every `stories.json` has a local `blockedBy: null` root and a scalar linear chain. There are no
cross-epic `blockedBy` IDs. Before each launch, the controller verifies the prior epic's exit story,
executable gate, and named validation evidence. Before the starter epic, the controller also resolves
or creates its canonical repository and verifies the baseline `pnpm run build` succeeds.

## Phase 1 — Shareable Hazine Preview Delivery

### Purpose

Publish an honest progress build from the canonical baseline before deeper experience work. The preview
must make its current scope explicit while proving base-aware assets, direct workbench routing, a
reproducible Pages build, exact repository targeting, and public root/workbench access.

### Files

- Create `src/lib/assetUrl.js`
- Modify `src/components/HazineScene.jsx`
- Modify `src/main.jsx`
- Modify `vite.config.js`
- Modify `package.json`
- Create `scripts/prepare-pages.mjs`
- Create `.github/workflows/deploy-pages.yml`
- Create `.prism/shared/validation/2026-09-03-hazine-preview-report.md`

### Steps

- [ ] Add `assetUrl(path)` using `import.meta.env.BASE_URL`; migrate model, texture, brand, and navigation URLs.
- [ ] Configure Vite `base` from `GITHUB_REPOSITORY`/explicit environment with `/` for local development.
- [ ] Generate a Pages-compatible `dist/workbench/index.html` and `404.html` after build.
- [ ] Add a Pages workflow that installs with a frozen lockfile, builds, uploads `dist`, and deploys from `main`.
- [ ] Pin current dependency ranges instead of `latest`.
- [ ] Record a progress-specific validation report that states which Hazine behaviors are present, provisional, or intentionally deferred.
- [ ] Resolve the exact TheDigitalGriot remote and Pages repository target without guessing; configure that remote explicitly.
- [ ] Commit and deploy the reviewed preview state through the Pages workflow.
- [ ] Verify the public root and direct `/workbench` URL, assets, refresh behavior, console, and responsive layout.

### Verification

- `pnpm run build`
- Assert `dist/workbench/index.html`, `dist/404.html`, and base-prefixed asset URLs exist.
- Serve the build beneath a simulated `/hazine/` base and directly load `/hazine/workbench/`.
- Confirm the deployed workflow commit equals the reviewed preview commit.
- Load the public root and direct `/workbench` URL on desktop and mobile.

**Checkpoint**: [ ] Phase 1 complete; controller may launch `epic-hazine-experience`

## Phase 2 — R3F Choreography and Actor Lifecycle

### Purpose

Turn the staged models into a legible sequence with explicit spatial priority and a safe reusable actor lifecycle.

### Files

- Create `src/config/experienceManifest.js`
- Modify `src/data/chapters.js`
- Modify `src/components/InstrumentRail.jsx`
- Modify `src/components/LiveSystemOverlay.jsx`
- Modify `src/components/HazineScene.jsx`
- Create `src/scene/ActorDirector.jsx`
- Create `src/scene/CameraDirector.jsx`
- Create `src/scene/sceneProfiles.js`
- Create `src/scene/materialLifecycle.js`
- Modify `src/state/experience.js`
- Modify `src/styles.css`

### Steps

- [ ] Move all ten chapters, instrument records, overlay phases, actor envelopes, and responsive safe zones into one canonical manifest.
- [ ] Update story, rail, overlay, scene, and Theatre consumers to use stable manifest IDs rather than duplicated indexes or tables.
- [ ] Extract `influenceAt` and actor traversal into `ActorDirector` with material-array support and disposal cleanup.
- [ ] Reuse memoized vectors/scalars inside `useFrame`; remove per-frame `new Vector3()`.
- [ ] Define desktop and mobile camera/actor profiles.
- [ ] Reduce the Treasury Seal base scale, stop all decorative rotation in reduced motion, and preserve keyboard/focus behavior.
- [ ] Reframe the caller/office so Ezgi reads away from camera without being covered by UI.
- [ ] Shorten building influence and author a leader/follower building → globe transition.
- [ ] Validate the vault spline at start/mid/end and tune the path to visibly cross the door frame into room two.
- [ ] Enforce maximum-opacity overlap budgets and safe zones for copy/transcript/source cards.
- [ ] Either bind at least one meaningful camera/scene property to Theatre or isolate the current clock-only integration behind a documented adapter.
- [ ] Assert the manifest contains ten unique IDs and ten resolvable instrument/phase projections.

### Verification

- Build passes with no WebGL/runtime error.
- Capture threshold, vault start/mid/end, call, and geography frames at 1440×900 and 390×844.
- Confirm no unintended actor reaches full opacity outside its envelope.
- Confirm reduced-motion mode stops seal, globe, actor, pointer, Sparkles, and cinematic camera motion.

**Checkpoint**: [ ] Phase 2 complete

## Phase 3 — Stateful Intelligence and Dual Product Surfaces

### Purpose

Make the walkthrough demonstrate a working intelligence model rather than chapter-switched static panels.

### Files

- Create `src/data/liveMeeting.js`
- Extend `src/state/experience.js`
- Modify `src/components/LiveSystemOverlay.jsx`
- Modify `src/components/live-system.css`
- Modify `src/components/KnowledgeTransform.jsx`
- Modify `src/components/StoryWidgets.jsx`

### Steps

- [ ] Define typed-shaped transcript moments with taxonomy, evidence, geography, relationship, confidence, strategy, and provenance fields.
- [ ] Store `selectedMomentId`, `surface`, and playback state centrally.
- [ ] Make every transcript row selectable and keyboard operable.
- [ ] Update all connected panels from the selected moment in the same interaction frame.
- [ ] Preserve selection when toggling plugin/desktop and while crossing related chapters.
- [ ] Keep Claude plugin as the initial/reload default.
- [ ] Differentiate plugin and desktop information architecture rather than hiding one rail in the same layout.
- [ ] Use Anime.js for root-scoped, cancelable panel/line transitions with a centralized reduced-motion policy.
- [ ] Ensure provenance is visible for every consequential item and strategy links back to supporting records.

### Verification

- Interaction test each transcript moment and assert evidence/geography/persona/confidence/strategy change together.
- Toggle surfaces after every selection and assert state persists.
- Keyboard through all transcript rows, surface controls, tabs, and strategy action.
- Confirm every consequential item has required provenance fields.

**Checkpoint**: [ ] Phase 3 complete

## Phase 4 — Workbench Product Fidelity

### Purpose

Bring `/workbench` into the approved Hazine system and make it a deeper version of the same live meeting rather than a separate prototype.

### Files

- Modify `src/workbench/WorkbenchApp.jsx`
- Replace/refactor `src/workbench/workbench.css`
- Reuse `src/data/liveMeeting.js`
- Reuse central experience state or a route-safe shared store slice
- Scope component class names to prevent stylesheet collision

### Steps

- [ ] Rebuild the layout as dark rails + light ivory workspace using approved typography and restrained accents.
- [ ] Use the same transcript/provenance data as the story overlay.
- [ ] Drive Live Intelligence, Evidence, and Relationship panels from the selected moment.
- [ ] Keep playback, manual pause, timestamps, and selected-row behavior coherent.
- [ ] Add source-receipt inspection and strategy lineage views.
- [ ] Implement responsive desktop rails and horizontal mobile island.
- [ ] Isolate workbench and story styles with explicit route/component scoping; prove neither stylesheet changes the other surface.

### Verification

- Directly load and refresh `/workbench` locally and under simulated Pages base.
- Validate all panel states for all transcript moments.
- Capture 1440×900 and 390×844 screenshots.
- Confirm no story CSS changes the workbench and no workbench CSS changes the story.

**Checkpoint**: [ ] Phase 4 complete

## Phase 5 — Resilience, Loading, Accessibility, and Performance

### Purpose

Make the experience robust enough to establish the starter’s quality floor.

### Files

- Create `src/components/SceneErrorBoundary.jsx`
- Create `src/components/StaticSceneFallback.jsx`
- Create `src/hooks/useMotionPolicy.js`
- Create `src/scene/SceneAssetGroup.jsx`
- Modify `src/App.jsx`
- Modify `src/components/HazineScene.jsx`
- Modify generated model import/preload strategy
- Modify `scripts/inspect-assets.mjs`, `scripts/optimize-assets.mjs`, `scripts/generate-models.mjs`
- Create `assets/manifest.json`

### Steps

- [ ] Add lazy-module, WebGL, scene, and asset failure containment with retry/static fallback.
- [ ] Add visible loading progress and keep the first chapter operable while late assets load.
- [ ] Centralize reduced-motion policy across GSAP, Anime.js, R3F, and CSS.
- [ ] Split GLBs into chapter-oriented lazy/preload groups.
- [ ] Centralize asset metadata and tool recipes in one manifest.
- [ ] Add explicit optimize → validate → promote → generate pipeline.
- [ ] Measure bundle, transferred assets, and frame behavior before/after changes.
- [ ] Run semantic, focus, contrast, and reduced-motion accessibility checks.
- [ ] Remove unexpected console errors and document unavoidable framework warnings.

### Verification

- Production build and asset pipeline pass from a clean dependency install.
- Broken-model and WebGL-unavailable simulations show authored fallbacks.
- No decorative animation remains in reduced-motion mode.
- No per-frame object allocations in custom frame loops.
- Desktop/mobile Lighthouse accessibility has no blocking findings.
- Record bundle and frame-time baseline; no regression greater than 10%.

**Checkpoint**: [ ] Phase 5 complete

## Phase 6 — Hazine Validation and Final GitHub Pages Release

### Purpose

Validate the implementation already running in the canonical repository and publish the exact reviewed final commit.

### Files

- Update `.prism/shared/validation/2026-09-03-hazine-report.md`
- Update README and attribution documentation

### Steps

- [ ] Run all phase verification commands and capture final key frames.
- [ ] Create a validation report mapping PRD acceptance criteria to evidence.
- [ ] Review the complete canonical diff.
- [ ] Commit the verified state atomically.
- [ ] Resolve the existing TheDigitalGriot Hazine repository/Page target; configure the canonical remote without guessing.
- [ ] Push the verified commit and observe the Pages workflow.
- [ ] Load the public root and direct `/workbench` URL; verify assets, interactions, console, and mobile layout.

### Verification

- Canonical Git status clean after commit.
- Remote `main` resolves to the deployed commit.
- Pages deployment reports success.
- Public root, chapter anchor, and `/workbench` direct URL load with no 404 assets.

**Checkpoint**: [ ] Phase 6 complete

## Phase 7 — Extract `griot-r3f-starter`

### Purpose

Generalize only the validated Hazine primitives into a neutral, reusable starter.

### Target

- Proposed local project: `C:/Users/digit/GriotClients/griot-r3f-starter` unless Gavin’s existing starter repository discovery returns a different canonical home.
- Existing `TheDigitalGriot/r3f-vite-theatre-starter` is a reference input, not a target to overwrite silently.

### Modules to extract

- [ ] Experience manifest and normalized progress store
- [ ] ActorDirector and material lifecycle
- [ ] CameraDirector with keyframes, spline passages, responsive profiles, and reduced motion
- [ ] Theatre sequence adapter
- [ ] Anime.js scoped animation lifecycle helpers
- [ ] DOM↔R3F state bridge
- [ ] Scene error/loading/static fallback system
- [ ] Asset manifest and inspect/repair/optimize/validate/promote/`gltfjsx` toolchain
- [ ] Adaptive performance and lazy scene groups
- [ ] Base-aware Vite/Pages deployment
- [ ] Neutral sample story and documentation

### Extraction rule

Every extracted module must cite:

- the Hazine source module;
- the Hazine story/acceptance check that validated it;
- which Hazine-specific values were parameterized or removed.

### Verification

- Fresh scaffold installs and builds from a clean clone.
- Neutral sample works at root and repository subpath.
- Desktop/mobile, reduced motion, failure fallback, and asset-pipeline fixtures pass.
- No Hazine brand file or CC BY Hazine model ships in the starter.

**Checkpoint**: [ ] Phase 7 complete

## Phase 8 — Starter Validation and Documentation

### Files

- Create starter architecture, recipes, migration, and provenance documents.
- Create CI checks and starter validation report.

### Steps

- [ ] Document architecture and extension points.
- [ ] Provide recipes for scroll stories, product viewers, scene transitions, and dual DOM/3D surfaces.
- [ ] Document dependency compatibility and upgrade policy.
- [ ] Verify generated project without local caches.
- [ ] Compare starter behavior against the Hazine proofs.
- [ ] Record deliberate exclusions and future shader/WebGPU tracks.

### Verification

- Documentation links resolve.
- Clean-clone CI passes.
- Coverage report traces every starter requirement to implementation and Hazine proof.

**Checkpoint**: [ ] Phase 8 complete

## Rollback and Safety

- Phase 0 preserves the approved non-Git working snapshot as the source reference and creates a recoverable canonical baseline before Spectrum.
- Original GLBs remain immutable.
- Phase 0 canonical bootstrap never deletes `.git`, user files, or unmatched paths.
- Deployment is commit-based; rollback is redeploying the last known-good commit.
- Starter extraction happens in a separate repository/folder and never rewrites Hazine.

## Final Definition of Done

- [ ] Phase 0 produced a reviewed, clean canonical baseline branch/commit before Spectrum.
- [ ] The honest Hazine progress build and direct workbench URL were publicly verified before full experience work.
- [ ] Every PRD acceptance criterion has recorded evidence.
- [ ] Every decomposed requirement maps to exactly one completed story or documented exclusion.
- [ ] Hazine public Pages URL and direct workbench URL are verified.
- [ ] Canonical Hazine repository is clean and points to the deployed commit.
- [ ] Starter modules trace to validated Hazine patterns.
- [ ] `griot-r3f-starter` clean-clone build, responsive checks, reduced-motion checks, failure checks, and Pages deployment pass.
