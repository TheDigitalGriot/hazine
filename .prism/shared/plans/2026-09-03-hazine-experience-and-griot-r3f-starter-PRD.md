---
date: 2026-09-03
author: Codex with Gavin
status: approved-for-planning
product: Hazine experiential walkthrough + griot-r3f-starter proving ground
source_handoff: ../handoffs/2026-09-02_10-22-29_hazine-scroll-story-choreography.md
tags: [prd, hazine, r3f, theatre-js, anime-js, claude-plugin, desktop, provenance, starter]
---

# Hazine — Experiential Walkthrough and `griot-r3f-starter` PRD

> **Acceptance reconciliation — 2026-09-14:** Hazine requirements are mapped to fresh pass/defer evidence in the stage-03 acceptance report, and GitHub Pages publication passed in stage 04. `griot-r3f-starter` remains a separate open deliverable. See `.prism/shared/validation/2026-09-14-hazine-acceptance-consolidation.md`.

## 1. Executive Summary

Hazine is a living treasury of intelligence for a commodities trader. It listens beside Ezgi during a live negotiation, retains the provenance of every consequential statement, connects the conversation to market evidence, geography, relationship history, and strategy, then surfaces the right context while the decision window is still open.

This release has two ordered outcomes:

1. **Hazine Experience:** a polished, shareable, scroll-led product story that begins as cinematic 3D and resolves into an interactive Claude-plugin-first product walkthrough.
2. **`griot-r3f-starter`:** a robust reusable starter extracted only from patterns proven and validated inside Hazine. Hazine remains the first implementation and traceable source of truth for every extracted primitive.

The experience is not a generic 3D landing page and Hazine is not an AI chat panel attached to a trading dashboard. The product idea is **Collect → Connect → Surface**, made tangible through authored movement, inspectable evidence, and an interface that never disguises interpretation as fact.

## 2. Problem Statement

During a live commodity negotiation, important intelligence arrives fragmented across spoken claims, market signals, geography, documents, prior calls, relationship patterns, and the trader’s own hypotheses. Ordinary meeting tools produce a transcript after the moment has passed. Ordinary dashboards show data without explaining why it matters to the current relationship or decision.

Ezgi needs a system that can:

- remain present during the conversation without pulling her away from it;
- recognize the sentence that changes the deal;
- distinguish observation from interpretation and strategy;
- preserve speaker, timestamp, source, retrieval lineage, and confidence;
- connect a live claim to relevant market and relationship context;
- surface a sourced strategic window while action is still possible;
- carry the same intelligence naturally between the Claude plugin and the later desktop application.

The walkthrough must let Ezgi *feel and operate* this value, not merely read feature descriptions.

## 3. Product Thesis and Principles

### Product thesis

**Hazine is a living treasury of intelligence: what Ezgi knows, when it matters.**

### Core loop

**Collect → Connect → Surface**

### Experience principles

1. **Provenance before persuasion.** Every strategic claim remains inspectable.
2. **Presence before dashboarding.** Hazine supports the conversation instead of replacing it.
3. **3D as narrative infrastructure.** Spatial movement communicates how intelligence moves; it does not decorate the page.
4. **The interface yields and returns.** 3D and product UI exchange visual priority deliberately.
5. **Taxonomy stays explicit.** `FACT / SIGNAL / INTERPRETATION / HYPOTHESIS / STRATEGY` is immutable.
6. **Plugin first, desktop expands.** The Claude plugin is the default doorway. The desktop is the larger treasury built afterward.
7. **One intelligence layer, multiple surfaces.** Selected moments and connected context persist when the surface changes.
8. **The margins are product.** Reduced motion, failure recovery, mobile choreography, provenance receipts, and attribution are core behavior.

## 4. Target Users

### Primary user: Ezgi

Ezgi is a commodities trader conducting information-dense, relationship-sensitive negotiations. The demonstrated scenario is a copper-concentrate supply agreement review with Marco Vidal of Santiago Metals.

### Primary jobs to be done

- “While I am speaking with a counterparty, help me identify what materially changes the decision.”
- “Show me the source, timestamp, and reasoning behind the context you surface.”
- “Remember how this person negotiates without turning inference into fact.”
- “Connect market movement and geographic events to the deal I am discussing now.”
- “Help me recognize and act on a closing window before it disappears.”

### Secondary audience

- The custom coding agent or Prism workflow receiving an implementation-ready demonstration.
- Future Griot client projects built with `griot-r3f-starter`.

Broader commodity desks, team collaboration, compliance roles, and enterprise administration are outside this walkthrough’s current product proof.

## 5. Locked Decisions

1. Hazine is a hybrid Claude agent/plugin and desktop application.
2. The Claude plugin is the default surface and first build target.
3. Desktop is an expanded second surface over the same intelligence state.
4. The visual system is light ivory center workspace with dark rails and restrained gold/bronze/mineral-green accents.
5. Approved assets under `public/brand/` are immutable.
6. Ezgi is the trader; Marco Vidal is the counterparty in the live copper-concentrate scenario.
7. Provenance fields are required for consequential intelligence.
8. The five-class taxonomy is immutable.
9. Anime.js owns DOM micro-interaction and connected-line transformations.
10. R3F and Theatre.js own 3D scene/camera choreography.
11. The globe uses maintained infrastructure; direct `three-globe` is the current React 19-compatible implementation.
12. Original GLBs remain untouched; the runtime uses optimized derivatives.
13. Hazine proves patterns before they are extracted into `griot-r3f-starter`.

## 6. Experience Narrative

### Chapter 0 — The Threshold

The Islamic architectural threshold establishes Hazine as a treasury, not a dashboard. The viewer understands that they are entering a system where knowledge is kept with care.

### Chapter 1 — The Inner Room

The camera crosses the vault door frame and travels through both rooms. An interactive mineral seal invites entry. The seal responds as a physical object but never blocks the chapter copy.

### Chapter 2 — The Live Call

Ezgi is seen away from camera in a minimalist office, speaking on the phone. The Claude plugin is the default product frame. Live transcription begins and the system listens for decision-changing language.

### Chapter 3 — The Wider World

The camera moves out through the window, rises past the office building, and resolves into a globe. Toronto, the Antofagasta mine corridor, and copper concentrate become connected nodes rather than simultaneous overlapping props.

### Chapter 4 — Evidence

A spoken claim opens into timestamped transcript evidence, market data, and retrieved memory. Animated lines communicate connection and lineage.

### Chapter 5 — Relationship

Marco’s evolving persona is shown as sourced patterns across prior interactions. The UI distinguishes observed history from interpretation.

### Chapter 6 — Decision Window

The offer, relevant evidence, and relationship pattern resolve into a sourced strategy while the live call is still happening.

### Chapter 7 — Knowledge System

The user manipulates knowledge fragments and sees them change form across the immutable taxonomy without losing lineage.

### Chapter 8 — Plugin and Desktop

The user switches between Claude plugin and desktop presentations. The selected transcript moment and intelligence state persist.

### Chapter 9 — The Living Treasury

The system returns to the thesis: collected knowledge remains connected and surfaces with purpose.

## 7. Functional Requirements

### FR-1 — Scroll orchestration

- Normalize the complete experience to a stable `0..1` progress clock.
- Derive named chapter state from one canonical chapter manifest.
- Keep DOM, R3F, Theatre sequence, navigation rail, and overlay phase aligned.
- Deep links to chapter anchors must reach the correct visual state.

### FR-2 — Authored 3D choreography

- Cross the two-room vault through its physical door frame.
- Establish threshold, room one, transition, and room two as distinct compositions.
- Frame Ezgi as an away-from-camera phone silhouette inside the office scene.
- Transition through the office window to the building exterior.
- Dissolve the building into the globe before either holds competing full opacity.
- Enforce explicit actor envelopes and deliberate crossfade budgets.
- Adapt camera composition and actor framing to desktop and mobile aspect ratios.

### FR-3 — Living treasury seal

- Seal remains a focusable DOM control aligned to a responsive 3D object.
- Hover/focus communicates availability; activation opens the next narrative state.
- Scale remains subordinate to copy until activation.
- Reduced-motion mode preserves meaning without rotation, bobbing, or rapid expansion.

### FR-4 — Live transcript intelligence

- Simulate an active call with speaker, timestamp, and waveform state.
- A user can select any transcript moment.
- Selection immediately updates evidence, geography, relationship, confidence, and strategy views.
- The chosen moment remains selected while switching between plugin and desktop.
- Auto-play pauses when the user manually selects a moment.

### FR-5 — Provenance model

- Every consequential item exposes source/speaker, timestamp or retrieval time, lineage, taxonomy class, and confidence where applicable.
- Strategy must point back to supporting fact/signal/hypothesis records.
- Relationship patterns expose the sourced calls or completed trades behind the pattern.
- The UI must never label an inference as a fact.

### FR-6 — Dual product surfaces

- Initial state is Claude plugin.
- Plugin mode reads as an embedded companion with focused context.
- Desktop mode exposes the full navigation rail and larger working surface.
- The same data and selection model drives both presentations.
- Reload returns to the plugin default.

### FR-7 — Interactive knowledge transformation

- Raw meeting, market, research, and relationship fragments can be selected.
- The system visibly assembles source receipt, relationship memory, classification, and strategy.
- Anime.js transformations communicate how information changes form.
- Each taxonomy layer is directly inspectable.

### FR-8 — Workbench

- `/workbench` uses the approved light-center/dark-rails visual language.
- Transcript selection drives all connected panels, not only a headline card.
- Evidence and relationship views change with the selected moment.
- The route works after direct navigation and refresh on the deployed site.

### FR-9 — Navigation and dynamic island

- Desktop uses a vertical chapter instrument rail.
- Mobile uses a horizontal bottom island with safe-area support.
- Current chapter, progress, and a short system observation update together.
- The chapter and instrument manifests contain the same number of records.

### FR-10 — Loading, failure, and reduced motion

- Display authored route, scene-module, and asset-loading states.
- Catch lazy-module, WebGL, and scene/asset failures in an explicit error boundary.
- Provide an intentional static experience when WebGL is unavailable.
- Respect live `prefers-reduced-motion` changes across GSAP, Anime.js, R3F actors, seal, globe, and CSS.
- No decorative motion may remain active in reduced-motion mode.

### FR-11 — Asset pipeline

- Preserve originals under `assets/original/`.
- Define one asset manifest used by inspect, repair, optimize, promote, and `gltfjsx` generation steps.
- Validate optimized GLBs and record source/license attribution.
- Promote optimized artifacts to `public/models/` through an explicit repeatable step.

### FR-12 — Performance

- Avoid per-frame allocations and React state updates inside `useFrame`.
- Dispose cloned materials safely.
- Support material arrays and transparent/glass materials.
- Lazy-load narrative actors by chapter or scene group.
- Measure before further mesh/shader reduction.
- Preserve a usable static fallback while late 3D assets load.

### FR-13 — GitHub Pages delivery

- Support repository subpath hosting through `import.meta.env.BASE_URL` or equivalent centralized asset routing.
- Generate a Pages-compatible `/workbench` fallback.
- Build reproducibly from the canonical repository.
- Deploy only a verified commit and expose the live URL.

## 8. `griot-r3f-starter` Requirements

### SR-1 — Provenance and traceability

Each starter primitive includes a short provenance note pointing to the Hazine module and acceptance check that proved it.

### SR-2 — Reusable scene contract

Extract a typed/configurable scene manifest for actors, visibility envelopes, transforms, responsive variants, preload groups, and material behavior.

### SR-3 — Choreography contract

Extract normalized scroll state, named chapters, camera keyframes, spline passages, Theatre sequence synchronization, and reduced-motion behavior without Hazine-specific names or geometry.

### SR-4 — DOM/3D bridge

Provide a small state bridge pattern for DOM controls, R3F scene reactions, transcript/data selection, and surface switching.

### SR-5 — Motion lifecycle

Provide reusable Anime.js helpers with root scoping, replay semantics, cancellation, and reduced-motion integration.

### SR-6 — Asset toolchain

Provide manifest-driven inspect → repair hook → optimize → validate → promote → `gltfjsx` commands with documented license metadata.

### SR-7 — Resilience

Include scene error boundaries, WebGL detection, authored fallbacks, loading progress, and retry behavior.

### SR-8 — Responsive 3D

Include aspect-ratio-aware camera/actor profiles and viewport verification fixtures.

### SR-9 — Performance instrumentation

Include optional development performance instrumentation, adaptive DPR, lazy scene groups, bundle reporting, and no-allocation render-loop examples.

### SR-10 — Deployment readiness

Include configurable Vite base paths, SPA/subroute handling, GitHub Pages workflow, and pinned compatible dependency ranges.

### SR-11 — Documentation and examples

Document the starter’s architecture, extension points, recipes, and one reduced sample experience derived from Hazine without including client-specific brand assets or licensed client models.

## 9. Visual and Interaction Requirements

- Approved Hazine assets are used as provided and never redrawn or silently substituted.
- Large copy has editorial restraint; interaction labels remain concise and operational.
- Gold represents attention/value, mineral green represents living context, and danger/anomaly colors remain reserved.
- Motion follows a leader/follower hierarchy with 20–40% overlap between authored beats.
- UI feedback occurs within 150 ms; component transitions land within 350 ms; cinematic transitions may use 600–1500 ms.
- Focus treatment must be visible on every interactive control.
- Text contrast must remain readable when the transparent scene aperture reveals a dark or luminous 3D subject.

## 10. Technical Architecture

### Current proven foundation

- React + Vite
- Zustand shared experience state
- GSAP ScrollTrigger for normalized page progress and editorial reveals
- React Three Fiber + Drei + Three.js for scene rendering
- Theatre.js sequence synchronized to scroll progress
- Anime.js for DOM/SVG transformations
- `three-globe` for geographic visualization
- glTF Transform + `gltfjsx` for the asset pipeline

### Required architectural evolution

- Replace parallel choreography tables with one canonical chapter/scene manifest.
- Move Hazine data from static CSS phase switching to a stateful selected-moment model.
- Add explicit scene error containment and static fallbacks.
- Split scene assets into lazy preload groups.
- Replace Hazine-specific absolute paths with base-aware asset resolution.
- Upgrade Theatre integration from clock-only synchronization to optional authored object tracks where it adds clear value.
- Extract only validated generic modules into the starter.

## 11. Acceptance Criteria

### Hazine experience

- [ ] All ten chapters resolve to the correct DOM, 3D, overlay, and instrument state.
- [ ] Vault start/mid/end frames visibly traverse the door frame and establish two rooms.
- [ ] Ezgi is clearly framed away from camera in the office without UI obstruction.
- [ ] Building and globe read as a transition, not an overlap error.
- [ ] Treasury seal does not compete with copy and works by keyboard, pointer, and reduced-motion fallback.
- [ ] Selecting every transcript moment updates all connected intelligence views.
- [ ] Plugin is default; Desktop toggle works; selection persists between surfaces.
- [ ] `/workbench` matches the approved light-center/dark-rails system.
- [ ] Direct navigation and refresh work for `/` and `/workbench` on GitHub Pages.
- [ ] Desktop 1440×900 and mobile 390×844 visual checks pass for every live-intelligence phase.
- [ ] No uncaught errors; no unexpected console errors; no obsolete `r3f-globe` dependency.
- [ ] Reduced-motion mode contains no decorative spatial movement.
- [ ] Production build and Pages deployment succeed from the canonical repository.

### `griot-r3f-starter`

- [ ] Every exported primitive traces to a validated Hazine source pattern.
- [ ] Starter sample runs without Hazine brand assets or licensed Hazine GLBs.
- [ ] Asset pipeline is manifest-driven and repeatable.
- [ ] Responsive, reduced-motion, failure, loading, and performance examples are included.
- [ ] Dependencies are pinned to compatible ranges and CI verifies build/type/lint/test checks.
- [ ] GitHub Pages deployment works under a configurable repository subpath.

## 12. Success Measures

### Required quality measures

- 100% of consequential demo intelligence objects include required provenance fields.
- 100% of behavioral requirements map to one decomposed story or an explicit exclusion.
- Transcript selection updates visible connected context in the same interaction frame.
- Zero uncaught runtime errors in the verified desktop/mobile flows.
- Zero accessibility blockers in keyboard navigation, labels, focus visibility, or reduced-motion behavior.
- No unintended actor holds full opacity outside its defined envelope.

### Provisional performance gates

- Establish a measured baseline before optimization.
- No post-hardening regression greater than 10% in initial transferred bytes or median frame time.
- Target smooth interaction on the reference desktop; preserve at least 30 FPS during active 3D transitions on the defined low-power profile.
- Late-scene assets must not block first chapter interaction.

Business KPIs and production data latency are intentionally outside this experiential prototype.

## 13. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Working copy and canonical repo diverge | Sync by explicit source-to-target manifest, review diff, preserve `.git`, commit verified state |
| Premature starter generalization | Require Hazine acceptance evidence before extraction |
| Visual competition between actors/UI | Use actor envelopes, composition safe zones, and screenshot checkpoints |
| Large R3F/Three bundles | Measure, lazy-load scene groups, retain static fallback, then optimize |
| Theatre becomes decorative dependency | Either bind meaningful authored properties or isolate/remove from critical runtime |
| React 19 globe incompatibility returns | Keep direct `three-globe`; add regression check for banned wrapper |
| CC BY model attribution is lost | Keep manifest license fields and visible attribution document |
| Mobile scene framing breaks | Define responsive camera/actor profiles and verify fixed viewports |
| Reduced-motion is incomplete | Centralize motion policy and test every engine |
| GitHub Pages subpaths fail | Centralize base-aware paths and provide SPA fallback |

## 14. Scope and Sequencing

### Milestone A — Shareable Hazine progress build

- Correct the current scene overlaps.
- Implement transcript-driven intelligence and the two product presentations.
- Align the workbench visual system.
- Add deployment-safe routing/assets.
- Verify and publish a progress build.

### Milestone B — Hazine hardening

- Add error/static fallbacks, complete reduced motion, responsive 3D, asset lifecycle fixes, and performance measurement.
- Validate every acceptance frame and interaction.

### Milestone C — `griot-r3f-starter` extraction

- Extract the validated generic contracts and tooling.
- Build a neutral sample.
- Add documentation, tests, CI, and Pages readiness.

## 15. Out of Scope

- Production market-data, transcription, CRM, calendar, or call-provider integrations.
- Real trading execution or financial advice.
- Authentication, billing, team permissions, or enterprise administration.
- Custom globe-engine development.
- Replacing approved Hazine assets.
- Shipping licensed Hazine client models inside the public starter.
- Generalizing unvalidated experimental code.

## 16. Source References

- `.prism/shared/handoffs/2026-09-02_10-22-29_hazine-scroll-story-choreography.md`
- `src/App.jsx:16-195`
- `src/state/experience.js:3-14`
- `src/components/HazineScene.jsx:22-310`
- `src/components/LiveSystemOverlay.jsx:6-123`
- `src/components/live-system.css:1-42`
- `src/workbench/WorkbenchApp.jsx:24-135`
- `src/workbench/workbench.css:1-160`
- `src/components/KnowledgeTransform.jsx:18-52`
- `src/components/StoryWidgets.jsx:26-65`
- `src/components/InstrumentRail.jsx:4-43`
- `scripts/inspect-assets.mjs:18-65`
- `scripts/optimize-assets.mjs:5-37`
- `scripts/generate-models.mjs:5-28`
- `vite.config.js:4-23`

## 17. Quality Gate

- [x] Problem statement is clear and scenario-specific.
- [x] Primary user and jobs are defined.
- [x] Features map to user needs.
- [x] Technical approach is feasible from the current implementation.
- [x] Milestones separate preview delivery, hardening, and starter extraction.
- [x] Acceptance criteria and provisional performance gates are measurable.
- [x] Risks and mitigations are explicit.
- [x] Known unknowns are excluded or labeled provisional rather than silently invented.
