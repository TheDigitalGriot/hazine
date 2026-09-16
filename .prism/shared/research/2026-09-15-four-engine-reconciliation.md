# Four-engine reconciliation — 2026-09-15

## Recorded observation and implementation boundary

The dedicated source audit `2026-09-15-engine-coordination-audit.md` observed real callers for all four libraries but empty committed Theatre tracks in both projects. Hazine's knowledge widget separately read its element bounds on browser scroll. These are the observations preceding these edits, not guessed runtime defects.

The approved contract keeps **one normalized narrative coordinate**, not a forced universal RAF scheduler. GSAP/ScrollTrigger writes narrative progress into Zustand. Camera and actor directors sample it and mutate their own R3F refs. Theatre samples the same coordinate, owns the separate **Semantic reveal halo** mesh's material opacity, and delivers authored values on an R3F-fed custom RAF driver. Anime v4 owns scoped DOM entrances and stage-change transitions; its library clock is not forcibly moved into the Canvas loop. Independent transcript replay remains independent UI state, not a narrative progress writer.

No camera position, camera target, actor transform, actor visibility, existing material or TreasuryLight property was added to Theatre. The ring has a static pose and a dedicated MeshBasicMaterial. Its opacity is the sole bound property. The Hazine adapter permits explicit composition props `haloPosition`, `haloRadius`, `haloColor`; defaults are `[0, 0, -1.25]`, `1.65`, mint. Starter uses the same neutral geometry/binder pattern with its own mint accent, no Hazine artwork or models.

## Meaningful parity, compatibility preserved

- Hazine remains React 19 / Fiber 9 with Theatre **core 0.7.2**. No Theatre R3F/Studio dependency was installed. `src/scene/TheatreSequenceAdapter.jsx` creates the core driver, creates the sheet object, subscribes with `onValuesChange(callback, driver)`, and seeks then ticks at `useFrame` priority -100 before the normal scene callbacks.
- Starter remains React 18 / Fiber 8 with Theatre core/R3F/Studio 0.7.2. Existing RafDriverProvider, SheetProvider, editable group and opt-in development Studio remain. `src/theatre/TheatreBridge.tsx` adds the same dedicated core object/material binder alongside its editable authoring surface, and changes the follower order to seek before tick.
- The two production sequences retain their existing sheet names and durations, respectively **8** and **10**. The authored normalized beat positions match; their absolute Theatre positions appropriately differ. Exact adapter/framework identity is neither required nor claimed.
- Hazine `KnowledgeTransform.jsx` now derives stages through `knowledgeStageAtProgress` over explicit `[0.70, 0.88]`, with no local scroll listener or bounding-rectangle reader. Manual tab/fragment inspection temporarily selects a stage within the current narrative beat; moving to another narrative beat resumes following and clears the override. Source receipt and relationship-memory content remain intact. Reduced motion skips Anime transitions but does not erase semantic stage changes or halo track information. Anime v4 `.revert()` cleanup cancels and restores the original inline styles, including when reduced motion is enabled mid-entrance.

## Authored production track and replay fixture

Object key: **Semantic reveal halo**. Track: `semantic-halo-opacity`. Prop path: `["opacity"]`. Eight connected keyframes use Theatre's actual BasicKeyframedTrack/trackIdByPropPath schema and `[0.5, 1, 0.5, 0]` Bezier handles for soft reveal/recession. The authored rise accents capture, extraction/evidence and knowledge surfacing rather than adding another actor entrance.

Normalized progress → opacity:

`0 → 0`, `0.14 → 0.12`, `0.265 → 0.62`, `0.36 → 0.10`, `0.505 → 0.70`, `0.64 → 0.15`, `0.78 → 0.85`, `1 → 0.30`.

Replay forward through these positions then backward `0.505 → 0.265 → 0`. At each sample, the tested real Theatre core `object.value.opacity` and an actual Three MeshBasicMaterial's bound `opacity` equal the authored value within 1e-6 **after the same driver tick**. Unsubscribing leaves the unmounted material unchanged on subsequent seeks. This is not an empty-sequence or callback-presence pass.

The tests additionally sample **0.2025 → 0.37**, a non-keyframe halfway point on the soft capture reveal, proving actual core interpolation rather than only exact-key retrieval.

## Primary API/schema evidence

- Installed core 0.7.2 declaration `node_modules/@theatre/core/dist/index.d.ts:817` confirms `onValuesChange(fn, rafDriver?)`; line 750 confirms createRafDriver and its driver tick documentation. Both projects already declare this exact version.
- [Official Theatre production example](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg) carries actual serialized BasicKeyframedTrack keyframes, trackData and encoded prop-path mapping, and the real sheet-object property binder.
- [Official Theatre RAF-driver API](https://www.theatrejs.com/docs/latest/api/core) documents custom driver usage and ticking in milliseconds; installed 0.7.2 signatures are the version-specific gate.
- [Official Anime v4 revert method](https://animejs.com/documentation/animation/animation-methods/revert/) and installed `animation/animation.d.ts:35` confirm cancellation plus original-value/inline-style restoration. The Griot motion recipe's older default-import Anime examples were not copied over the active named-import v4 lane.

## Fresh scoped verification from this session

Hazine `node --test tests/theatre-coordination.test.mjs`, exit **0**:

    production Theatre track drives its dedicated visible material in both scroll directions — PASS
    knowledge stages derive the semantic range from the shared story coordinate — PASS
    tests 2; pass 2; fail 0

Starter direct existing executable `node node_modules/vitest/vitest.mjs run tests/theatre-coordination.test.ts`, exit **0**:

    RUN v5.0.0
    Test Files 1 passed (1)
    Tests 1 passed (1)

Starter `node node_modules/typescript/bin/tsc --noEmit`, exit **0**. Starter direct Vite production build, exit **0**, `vite v8.3.0`, **675 modules transformed**, built in **510ms**. Hazine direct Vite production build, exit **0**, `vite v8.2.2`, **1012 modules transformed**, built in **1.22s**, existing large-chunk advisory reported (not suppressed).

Fresh repeated tests including the interpolated sample: Hazine **2/2 pass**, Node exit **0**; starter Vitest **1/1 pass**, exit **0**, duration **281ms**. Scoped starter ESLint check of TheatreBridge, semanticHalo and the coordination test exited **0** with no findings.

Observed verification routing: Hazine's Node test initially rejected Theatre's CommonJS named `types` export; the JS helper now uses the package's default import, preserving the Vite/Node compatibility lane. Oversized test-only project names were corrected to Theatre's observed 32-character maximum. Starter pnpm executable shim failed; direct executable hit managed-sandbox EPERM; the approved unsandboxed scoped command passed. Hazine pnpm build preflight attempted dependency-policy/network work and returned EACCES retries; that invocation was stopped, and the existing Vite compiler ran directly and passed. No dependency version was deliberately changed for this repair.

## Remaining release gates and copy register

### Bounded starter pause/resume observation

Root explicitly assigned a follow-up to the starter store only if a unit observation establishes stale progress. New wired `tests/pause-resume.test.ts` used the real Zustand store, set `.25`, paused, delivered `.45` then `.79`, and resumed without another scroll event. Pre-edit result: **Vitest 1/1 failed**, exit **1**, `expected 0.25 to be 0.79`. Progress and chapter correctly froze during pause, but the newest delivered normalized coordinate was discarded and not consumed at resume. This observation precedes the store repair; no UI/CSS or timer ownership is changed by the bounded follow-up.

Repair: starter `src/state/experience.ts` stores `pendingProgress: number | null` only when paused. Each sample coalesces to the latest clamped coordinate without changing rendered progress/chapter. A true→false pause transition consumes it in the same Zustand write as chapter resolution and clears the pending field. Reapplying true (dialog restoring an already-paused state) does not consume it; resuming without any new sample preserves the current coordinate. Existing controls and progress writer remain the callers; no helper was added without a caller.

Fresh post-repair starter full unit run: **5 files, 18 tests passed**, Vitest **5.0.0**, exit **0**, **281ms**. The new three tests cover latest-sample catch-up, already-paused restoration, no-sample resume and positive/negative clamping; existing tests remain passing. Post-repair TypeScript exited **0**. Root browser pause/resume interaction is still a separate end-to-end gate.

### Browser-observed StrictMode failure and recorded repair

Root's fresh dev browser on port 5175 entered static fallback and recorded the actual console error: `sheet.object("Semantic reveal halo", config)` called twice with different config values, at `createSemanticHalo` and the adapter's useMemo. A new repeat-create assertion then reproduced that exact error with real installed Theatre core before edits (**Hazine Node tests 1 pass, 1 fail**, exit 1). Installed core `dist/index.js:5555` compares configs and explicitly requires reusing the existing object or identical config; [official sheet-object docs](https://www.theatrejs.com/docs/latest/manual/objects) state that repeat creation returns the existing object, while actual changing config requires deliberate reconfiguration.

Repair: both helpers now create the typed opacity config once at module scope and reuse it on each call. This preserves core's schema contract, reuses the real object, and does not silently reconfigure or weaken its check. The newly wired repeat-create test is the mechanical regression gate; root's browser reload remains the visual/runtime gate.

Post-repair real-core regression run: Hazine Node **2/2 pass**, exit **0**; starter Vitest **1/1 pass**, exit **0**, duration **331ms**. Browser observation has not been relabeled as a pass by these unit checks.

Fresh SHA256 state measurements this session: Hazine `src/theatre-state.json` **D2D0A8DC395E7003B70B6CFAA6ECB5AAA12B36AB1F0D794E874A0330FD4EAEB8**; starter `src/theatre/state.json` **73507746C321FD3A0FD49B8DB49D0B560F3AAB019DE8B6B7AD23ED2238677767**. Starter source-lock currently records upstream repository/skill lineage, not hashes of mutable authored state; its current verification script requires the source-lock and proof index to resolve but defines no authored-state equality field. That lineage lock was preserved, not rewritten as a new accepted baseline. The wired production-state tests are the current authored-track/property delivery gate.

Scoped tests/builds verify real authored property delivery, not the visual composition or all release behavior. Root owns combined browser screenshots/replay, reduced-motion interactions and the fresh invariant ceremony. **Visual consumer visibility/composition is not yet verified here.** No commit/push/publication occurred in this lane.

Copies/targets: Hazine source/bundled state → Hazine dist (gate: direct build passed; final page preparation/browser/publication owned by root). Starter source/bundled state → starter dist (gate: direct build passed; final release owned by root). The equivalent neutral pattern is intentionally reconciled, not byte-identical due to JS/TS and React compatibility lanes. No standalone skill, plugin cache, account snapshot or approved brand asset was edited; those propagation targets are out of scope. Both source track fixtures mechanically test their own saved state each run.
