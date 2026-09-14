# Spectrum Stage Contract — Build griot-r3f-starter

## Role
You are the principal framework engineer extracting Hazine's proven experiential patterns into a neutral, robust R3F starter without carrying client identity or licensed client assets.

## Inputs

### Working inputs
- `04_publish-hazine/output/hazine-release-report.md`
- `04_publish-hazine/output/release.json`
- `.prism/shared/contracts/hazine-r3f-proof-index.json`
- `.prism/stories/epic-griot-r3f-starter/stories.json`
- `.prism/stories/epic-griot-r3f-starter/coverage.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`
- `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`
- `C:/Users/digit/GriotClients/griot-r3f-starter`

### Reference inputs
- `C:/Users/digit/GriotClients/Hazine`
- `https://github.com/TheDigitalGriot/r3f-vite-theatre-starter`
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
- Hazine brand assets, client copy, licensed GLBs, or unrelated repos.
- Do not copy the Hazine source tree wholesale.

## Locked Decisions
- The starter is a separate repository at `C:/Users/digit/GriotClients/griot-r3f-starter` and will be published as `TheDigitalGriot/griot-r3f-starter`.
- It is a source-of-truth scaffold for future Griot R3F experiences, not a Hazine clone.
- Blend R3F, Theatre.js, GSAP scroll choreography, and Anime.js DOM/vector motion with one explicit clock-ownership contract and examples of each boundary.
- Preserve the full visual/motion layer: themes, materials, interaction, assets, timing, fallback states, and responsive behavior are load-bearing.
- Include a neutral medium/high-fidelity reference experience with replaceable primitive assets, not client assets.
- Every extracted primitive must cite a Hazine proof entry and relevant `griot-r3f` recipe.
- Correct stale starter-story provenance IDs during migration.
- Do not push in this stage.

## Process
1. Create the separate local repository and its own `.prism` Spectrum workspace, contracts, progress, and source-lock records.
2. Bootstrap a modern Vite React R3F project, borrowing only proven architecture from the original Theatre starter and verified current package documentation.
3. Implement reusable modules for canvas/runtime policy, scene manifest, asset pipeline, chapter director, camera spline, actor envelopes, surface/UI state, Anime.js knowledge transformation, Theatre adapter, loading/error/retry, reduced motion, responsive safe zones, and route/base deployment.
4. Provide neutral sample scenes/assets and a provenance-rich reference walkthrough demonstrating desktop/mobile instrument rails and DOM/3D legibility.
5. Provide glTF inspect/optimize/validate/promote/gltfjsx scripts with manifest-driven inventories and license checks.
6. Add documentation, diagrams/assets where already available, examples, recipes, CI, lint/typecheck/test/build/browser smoke, performance budgets, and Pages subpath support.
7. Migrate and reconcile the starter queue into the new repository; record Hazine as a read-only pinned proof source.
8. Write `starter-implementation-report.md` and `starter-exports.json` into this stage's `output.partial/` and the new repo's `.prism/shared/contracts/`.
9. Append heartbeat tokens to `.prism/local/build-starter-progress.txt` in both the Hazine marathon and starter repository.

## Outputs
- Complete local repository at `C:/Users/digit/GriotClients/griot-r3f-starter`.
- `output.partial/starter-implementation-report.md`
- `output.partial/starter-exports.json`
- Starter-local Spectrum contracts and proof/source-lock records.

## Success Criteria
- Clean frozen install and all verification commands pass.
- Neutral reference experience visibly demonstrates R3F + GSAP + Anime.js + optional Theatre.js boundaries.
- Responsive desktop/mobile composition, reduced motion, failure/retry, asset progress, performance adaptation, and Pages subpath fixtures are included and tested.
- Asset tooling is manifest-driven and validates before promotion/gltfjsx generation.
- No Hazine logo, copy, personal data, proprietary fixture, or licensed client GLB exists in the starter.
- Every exported primitive has provenance to exact Hazine proof and `griot-r3f` recipe.
- README explains quick start, architecture, clock ownership, asset workflow, deployment, accessibility, testing, and extension points.
- Scope guard: reusable starter only; no production backend or client application.

## Heartbeat
Append, in order, to `.prism/local/build-starter-progress.txt`:
`REPO-BOOTSTRAPPED`, `RUNTIME-PRIMITIVES-BUILT`, `MOTION-BOUNDARIES-BUILT`, `ASSET-PIPELINE-BUILT`, `REFERENCE-EXPERIENCE-BUILT`, `TESTS-DOCS-PASSED`, `OUTPUT-WRITTEN`.

