# Scene and page discovery — Hazine + griot-r3f-starter

Read-only source discovery recorded 2026-09-15. No implementation, transform tuning, route edits, or visual verdict was performed. User observations were supplied by the parent task; source facts below are independently observed. Canonical Hazine source read: `C:/Users/digit/GriotClients/Hazine`. Starter source read: `C:/Users/digit/GriotClients/griot-r3f-starter`.

## Hazine scene contract inputs

### Actor ownership, placement, and native transforms

- `src/config/experienceManifest.js:22` owns the actor inventory. Desktop/mobile placement and scale are explicit, not derived from model bounds.
- `src/config/experienceManifest.js:25`: office focus `0.265`, spread `0.064`, scale `0.42`, position `[-1.25,-0.16,0.05]`, rotation `[0,-0.06,0]`; mobile scale `0.34`, position `[-0.55,-0.2,0.1]`. `hide:['Background']` is part of this actor.
- `src/config/experienceManifest.js:26`: caller focus `0.265`, spread `0.06`, scale `1.48`, position `[0.72,-1.08,0.7]`, rotation `[0,2.72,0]`; mobile scale `1.08`, position `[0.45,-1.05,0.5]`.
- `src/models/BusinessCallModel.jsx:20`: caller native mesh position `[0,0,-0.002]`, scale `0.952`. Its generated model supplies a single mesh using loaded geometry/material.
- `src/models/OfficeModel.jsx:20` through `:28`: office native meshes retain per-mesh transforms. Structure position `[4.586,0.706,0]`, rotation `[-PI/2,PI/2,0]`, scale `[4.597,13.79,4.597]`; table position `[3.885,-1.043,0]`; carpet position `[3.532,-1.444,0]`, rotation `[-PI/2,0,0]`, scale `2.013`.
- `src/scene/materialLifecycle.js:35`: `hide` matches mesh-name fragments; excluded meshes are set invisible. The office Background is therefore excluded by this lifecycle rather than removed from the GLB.
- `src/config/experienceManifest.js:28`: quarry focus `0.505`, spread `0.085`, scale `0.42`, position `[1.48,-0.82,0]`, rotation `[-0.2,-0.7,0]`; mobile scale `0.31`, position `[0.6,-0.7,0]`.
- `src/models/QuarryModel.jsx:20`: quarry native mesh position `[2.416,-1.541,3.733]`, rotation `[0,PI/2,0]`, scale `8.439`.
- `src/config/experienceManifest.js:29`: truck focus `0.565`, spread `0.07`, scale `0.11`, position `[1.45,-2.35,0]`, rotation `[0,0.54,0]`, `drift:true`; mobile scale `0.08`, position `[0.7,-2.05,0]`.
- `src/models/MiningTruckModel.jsx:20`: truck native mesh position `[-1.756,11.91,1.138]`, rotation `[-PI/2,0,0]`, scale `26.398`.
- `src/scene/ActorDirector.jsx:72`: each actor owns its own wrapper group, carrying the manifest layout, and renders its generated model beneath it.
- `src/scene/ActorDirector.jsx:96`: all actor wrappers are siblings underneath a scene-offset group. Quarry does not parent truck in this observed render tree; office does not parent caller.
- `src/scene/ActorDirector.jsx:36` invokes `actorLayout`; `src/scene/sceneProfiles.js:121` merges mobile overrides with the actor record.

### Animation, grounding, and model bounds

- `src/scene/ActorDirector.jsx:24` computes trapezoid influence from actor focus/spread. Building additionally releases using `1-smoothstep(0.345,0.39,progress)` at `:29`.
- `src/scene/ActorDirector.jsx:55`: actor target scale is `layout.scale * (0.88 + influence * 0.12)`.
- `src/scene/ActorDirector.jsx:56`: drift is `(progress-actor.focus) * (mobile ? 5.4 : 8.5)` when `actor.drift` is true. The truck is the observed actor marked for drift.
- `src/scene/ActorDirector.jsx:60`: X blends to layout X + drift + an influence-dependent entrance displacement; Y blends to layout Y minus `(1-influence)*0.22` at `:61`; Z blends to layout Z at `:62`. These are the observed truck-motion relations. This component does not invoke a quarry route, surface sampler, terrain raycast, or wheel-contact routine.
- `src/scene/ActorDirector.jsx:64`: only crystal/building receive incremental Y rotation in this branch.
- `src/scene/materialLifecycle.js:70`: opacity becomes clamped base opacity times influence times `2.3`. Visibility, scale, placement, opacity, and depth-write all participate in the appearance over time.
- `src/components/HazineScene.jsx:38`: the common shadow-receiving plane is at world Y `-1.7`, rotated `-PI/2`, with `30x30` plane geometry.
- `scripts/inspect-assets.mjs:41` reads GLB scene bounds via `getBounds`; `:53` serializes min/max. The current scene/model path retains generated transforms and does not consume this report for bounds normalization.
- `asset-report.optimized.json:85`: office report min approximately `[-3.9257,-2.8102,-12.4555]`, max `[9.1831,5.3011,12.4555]`. These are full-asset bounds, including material/mesh content later hidden at runtime; not observed post-hide world bounds.
- `asset-report.optimized.json:123`: caller report min `[-0.2641,-0.9517,-0.2647]`, max `[0.2638,0.9515,0.2602]`.
- `asset-report.optimized.json:194`: quarry report min `[-6.0229,-3.3971,-1.9518]`, max `[10.8551,0.3157,9.4183]`.
- `asset-report.optimized.json:224`: truck report min `[-19.5069,-0.1879,-25.2598]`, max `[15.9958,24.0085,27.5366]`.

### Camera, scene profiles, and globe geography

- `src/scene/sceneProfiles.js:31`: desktop key table is the authored camera path; mobile table begins at `:45`. Relevant desktop keys include progress `0.255`, position `[-0.1,0.65,7.4]`, look `[0.7,-0.2,0]`; `0.31`, position `[0.5,0.35,5.8]`, look `[0.9,-0.25,0.25]`; `0.365`, position `[-0.42,2.65,7.6]`, look `[0.1,1.1,0]`; `0.405`, position `[0,1,7.4]`, look `[0,0.15,0]`; `0.47`, position `[0.25,0.55,8]`, look `[0.3,0,0]`; `0.55`, position `[0.7,1.15,7]`, look `[0.7,-0.45,0]`; `0.64`, position `[0,0.8,6.2]`, look `[0.7,-0.45,0]`.
- `src/scene/sceneProfiles.js:91`: desktop profile FOV `38`; mobile profile FOV `44` at `:103`. `profileForViewport` at `:116` selects mobile for width <= mobile breakpoint or portrait height > width*`1.08`.
- `src/scene/CameraDirector.jsx:8`: camera samples neighboring keys using `smoothstep` and lerps both position and look target. `:29` owns FOV; `:57` lerps camera position with `frameEase(delta,2.7,reducedMotion)`; `:58` applies `camera.lookAt`.
- `src/scene/CameraDirector.jsx:37` temporarily blends into the vault curve inside its authored window; `:49` adds pointer offsets outside reduced motion; `:54` adds shared scene X offset to camera target and look target.
- `src/App.jsx:38`: GSAP ScrollTrigger writes normalized progress; `:40` resolves chapter from the reading line at `52%` viewport height. These feed the shared Zustand state read by actors/camera/globe.
- `src/data/liveMeeting.js:6`: shared origin is Toronto/Ezgi `{lat:43.6532,lng:-79.3832}`; corridor is Antofagasta/Mine corridor `{lat:-23.65,lng:-70.4}`, commodity Copper concentrate. Each current meeting moment uses this geography object.
- `src/scene/IntelligenceGlobe.jsx:17`: `geographyData(moment)` forwards origin/corridor latitude and longitude into points/rings and maps them to arc start/end fields at `:25`.
- `src/scene/IntelligenceGlobe.jsx:33`: constructs `ThreeGlobe`, using `/textures/earth-night.jpg`; `:59` replaces point/arc/ring/label data whenever selected moment changes.
- The observed application file passes latitude/longitude to ThreeGlobe; it does not implement geographic Cartesian conversion itself. Library conversion was not read in this bounded pass.
- `src/scene/IntelligenceGlobe.jsx:70`: globe leader release is `smoothstep(0.35,0.39,progress)`; its trapezoid focus is `0.445`, spread `0.145`, plateau ratio `0.22` at `:71`.
- `src/scene/IntelligenceGlobe.jsx:73`: scale is `0.019*(0.84+influence*0.16)`; `:74` rotates globe Y by delta*`0.035`*influence unless reduced motion.
- `src/scene/IntelligenceGlobe.jsx:78`: globe wrapper position `[0.35,0.1,0]`, rotation `[0.04,-1.15,0]`, initial scale `0.019`. Selected geography updates data, not this wrapper orientation or CameraDirector keys.
- `src/components/HazineScene.jsx:34` and `:36`: ActorDirector and IntelligenceGlobe are sibling world components.

## Hazine page and brand contract inputs

- `src/main.jsx:6` lazily loads story App; `:7` lazily loads WorkbenchApp.
- `src/main.jsx:16` matches base-aware `/workbench` paths using `assetUrl`; `:25` renders WorkbenchApp for that match, story App otherwise. This observed entry has two page components, not a separate Design system page component.
- `src/App.jsx:87`: current topbar links to `/workbench/` using text “Enter the live system”. Additional workbench links at `:195` and `:211`.
- `src/App.jsx:212`: current approved design system is an image figure inside the story hybrid section, source `/brand/hazine-design-system-with-icon.png`, caption “Approved visual system · immutable source assets”.
- `src/lib/assetManifest.js:12`: brand assets register `desktop`, `plugin`, `system` PNG URLs. `system` is `/brand/hazine-design-system-with-icon.png` at `:15`.
- `public/brand/` observed files: `hazine-wordmark.png`, `hazine-lockup.png`, `hazine-desktop-v4.png`, `hazine-claude-plugin-v4.png`, `hazine-design-system-with-icon.png`.
- `src/components/StoryWidgets.jsx:138` and `:143` render desktop/plugin approved screenshots in the HybridWidget.
- `scripts/prepare-pages.mjs:7` generates `/workbench/index.html`; `:9` specifies `/404.html`; `:13` and `:14` copy the root build entry. No design-page build entry is authored in this observed script.
- `src/state/experience.js:20`: selected moment can stop playback; `:24` surface setter switches the presentation; persistence at `:34` keeps selectedMomentId/activePanel, not story progress/surface.

### Current records and provenance

- Hazine glob for CURRENT found no CURRENT file in the canonical checkout in this pass. The current consolidation record is `C:/Users/digit/GriotClients/Hazine/.prism/shared/validation/2026-09-14-hazine-acceptance-consolidation.md`.
- That record `:9` links reconciliation, implementation, acceptance report, and verification JSON under `.prism/shared/spectrum-marathon/hazine-and-griot-r3f-starter/`; `:19` records stage-04 public Pages and canonical synchronization acceptance. These are historical records, not fresh visual evidence for the new user observations.
- Historical Hazine handoff: `C:/Users/digit/GriotClients/Hazine/.prism/shared/handoffs/2026-09-02_10-22-29_hazine-scroll-story-choreography.md`. Immutable approved assets are explicitly recorded at `:30` and listed at `:126` through `:129`. It includes later bootstrap continuation beginning at `:184`; initial working-copy/canonical statements must not be treated as current without this continuation.
- Workspace reference images also exist under `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/assets/`, including `hazine-design-system.png` and `hazine-design-system-with-icon.png`.
- Workspace output handoff is `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/outputs/Hazine-handoff-2026-09-02.md`; it was located, not read during this pass.
- A canonical machine-readable Hazine brand/design matrix record was not established by this bounded pass. The actual current renderer consumes approved PNGs and locally declared CSS/JS colors. Do not infer that an image is the canonical editable matrix record.

## Starter frame geometry contract inputs

- `C:/Users/digit/GriotClients/griot-r3f-starter/src/state/experience.ts:7` declares Treasury/Slim; `:8` declares Docked/Overlapped; `:9` declares Full/Framed.
- Defaults at `:51` through `:53` are Treasury, Docked, Framed. `toggleRailPlacement` at `:81` changes only railPlacement; `togglePresentation` at `:82` changes only presentation.
- `src/App.tsx:32` through `:37` writes theme/motion/rail/railPlacement/presentation to document-root data attributes. `:45` renders `.experience-frame`.
- `src/styles/app.css:138`: root geometry variables are `--treasury-frame-right:176px`, `--treasury-rail-width:146px`, `--rail-clearance:18px`.
- `src/styles/app.css:141`: framed canvas/vignette/frame inset is `76px 36px 24px`; `:144` overrides right inset to Treasury frame-right; `:145` aligns Treasury header right to the same variable.
- `src/styles/app.css:140`: frame box shadow includes `0 0 0 28px rgba(var(--field-rgb),.5)` and `0 24px 90px rgba(0,0,0,.18)`.
- `src/styles/app.css:162`: Treasury docked rail has right `14px`, top `94px`, bottom `24px`, width Treasury rail-width.
- `src/styles/app.css:183` through `:185`: desktop Treasury/Framed/Overlapped rail right is frame-right minus half rail-width. Current resolved arithmetic is `176-73=103px`. This places the center of the 146px rail on the frame's right border, with a 103px outer region beyond the rail.
- `src/styles/app.css:186` through `:188`: overlapped inspector right is frame-right plus half rail-width plus clearance, current arithmetic `176+73+18=267px`. This retains authored `18px` inspector/rail clearance.
- `src/styles/app.css:189`: Slim overlap uses left `7px` instead of Treasury right rule.
- `src/styles/app.css:196` through `:198`: mobile framed geometry resets to `64px 10px 96px`; `:204` places Treasury horizontal rail across 10px left/right with safe-area bottom; desktop overlap rules are inside min-width `701px` at `:182`.
- `src/styles/app.css:181`: source explicitly describes placement as DOM-shell-only, not story-clock/camera ownership.

### Starter current state record

`C:/Users/digit/GriotClients/griot-r3f-starter/.prism/shared/CURRENT.md` is present and was read. It links the approved `plans/2026-09-15-experience-shell-variants-CONTEXT.md`, records uncommitted work on `spectrum/griot-r3f-starter`, publication held, and states the visible preview is intentionally Overlapped although default remains Docked. It names `.prism/local/shell-variants-progress.txt`, `.prism/local/observations/2026-09-15-shell-variants.md`, and validation `.prism/shared/validation/2026-09-15-overlapped-rail.json`. Its light/reduced screenshot is explicitly older than the contrast repair. This protects intentional user preview state from being reset as test residue.

## Unresolved inputs — do not substitute inferred fixes

1. Actual screenshot/current viewport/progress and post-hidden-mesh world bounds for office/caller need the scene-validation stage's direct evidence. Native GLB bounds above do not establish visual grounding after all transforms.
2. The desired mine orientation and geographic camera destination/zoom are user-observed concerns, not values selected in this discovery. ThreeGlobe library conversion is outside the files read here.
3. A quarry-local route/contact reference was not located in the current actor component. The present relation is sibling actors plus X drift, documented above; desired route/anchor decision remains explicit contract work.
4. Canonical Hazine brand/design matrix source and its schema/path remain unverified. Approved PNG sources were located. Landing / Live system / Design system proper page names and real-HTML Design system ownership are supplied requirements, not an existing three-route implementation.
5. Starter compact outer-border measurements require fresh screenshots in the intentional Treasury/Framed/Overlapped state before values are chosen. The observed 176/146/18 CSS geometry is an input, not a proposed replacement.

No source implementation was changed. This report is the disk record of the source relations discovered in this session.

## Fourth-page addition — Hazine — Product Requirements & Technical Experience Specification

The parent relayed the user's explicit fourth-page addition after the initial report was saved. Scope is four proper React/HTML pages: Landing, Live system, Design system, and Hazine — Product Requirements & Technical Experience Specification. This extends scope without authorizing any contract/artifact filename rename. The fourth page is not a PDF/image embed.

### Exact content sources located

- Existing delivered specification: `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/outputs/Hazine_Product_Requirements_Technical_Experience_Specification.pdf`.
- Existing authored generator/content: `C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/build_hazine_pdf.py`. `:16` names the output PDF; `:162` names document title/author; the document body is authored inline in the Python `story` composition, not loaded from a separate Markdown source in the observed matches.
- `work/build_hazine_pdf.py:173` states that the document consolidates the source conversation and preserves approved product/interaction/architecture/brand decisions, leaving unlocked framework details open. `:174` declares LOCKED / REQUIRED / ILLUSTRATIVE / OPEN status semantics. This is the document's stated authority; the underlying conversation approval was not reread in this bounded pass.
- `work/build_hazine_pdf.py:175` states the immutable brand rule, explicitly naming the approved wordmark, glyph, lockup, desktop/plugin composition, design-system matrix, and mineral-sparkle icon. This content belongs to the full specification, not an implementation ledger.
- `work/build_hazine_pdf.py:194` authors desktop/plugin role and navigation comparison; `:199` authors desktop zone content; `:210` authors live-call hierarchy; `:229` authors capability contracts; `:233` authors minimum domain fields; `:234` authors provenance invariant. These are source content locations for real HTML components rather than extracting a PDF screenshot.
- Source conversation itself was not located or reread here; the initial user request refers to the referenced ChatGPT conversation. Approval provenance beyond the authored consolidation remains for the parent/content stage to establish.

### Distinct execution-oriented documents — do not silently substitute for the full specification

- `C:/Users/digit/GriotClients/Hazine/.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`: frontmatter `:4` says `approved-for-planning`; `:5` identifies the experiential walkthrough plus starter proving ground; `:6` identifies the handoff source; `:10` titles this the Experiential Walkthrough and griot-r3f-starter PRD. `:18` through `:21` define release outcomes. This is a release/execution-scope PRD and has a different title/scope from the full fourth-page specification.
- `C:/Users/digit/GriotClients/Hazine/.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`: execution plan for the above experiential release; located earlier, not read in full here.
- `C:/Users/digit/GriotClients/Hazine/.prism/shared/plans/2026-09-01-hazine-implementation-plan.md`: earlier execution plan; located, not read in full here.
- Hazine canonical handoff and acceptance consolidation named above are execution/provenance records; they are not substitutes for the full user-facing product specification.

No fourth-page component or route exists in the observed current `src/main.jsx` two-component router. No page implementation was performed.
