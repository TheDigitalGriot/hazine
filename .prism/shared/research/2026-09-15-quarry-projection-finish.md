# Quarry projection finish — 2026-09-15

Status: numerical gates PASS; root-owned desktop screenshot ACCEPTED. This is not a release claim. Root observed visible truck on mine bench in the reading center and absent crystal at scrollY5505; screenshot `C:/Users/digit/.codex/visualizations/2026/09/01/01a05da2-4aa2-7fc1-a63e-59cb67397ab6/continuation-2026-09-15/desktop-extraction-corrected.png`. Root measured actual Canvas x0/y0/width1425/height900, matching projection exactly. Typography changed section heights slightly; use refreshed runtime anchors rather than old raw extent for future replays.

## Observation → correction

The real screenshot observation is saved in `2026-09-15-quarry-projection-OBSERVATION.md`, before edits. A new actual-vertex projection helper, `scripts/project-quarry.mjs`, reconstructs approved generated truck geometry using the existing calibration loader, composes the exact runtime root offset / extraction frame / quarry origin / sampled truck transform / truck-native center shift, and projects each vertex through the actual camera key interpolation. It uses neutral pointer, 1425×900 full-canvas screen coordinates until root supplies browser Canvas bounds. API references checked this session: [Three Vector3](https://threejs.org/docs/#api/en/math/Vector3), [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster).

Before correction, scene .5597540983606557 (scroll5505/11502) projected the truck at x910.34..987.06,y467.15..517.00: fully beyond the unoccluded scene region's x890 edge and behind the inspector. Its actual size was76.72×49.85px; independent truck scale was not the cause.

Correction: shift the SHARED extraction frame from desktop x.45 to-.75, mobile x0 to-.8. Native route waypoints, exact49 measured positions/quaternions/contacts, truck scale.017, quarry rotation-.38, quarry origin[-2.416,1.541,-3.733], all camera/vault keys and approved asset bytes stay unchanged. The truck remains attached to actual terrain everywhere. No route cache refresh is required because no quarry-native geometry/route/contact calculation changed.

Fresh actual projections (neutral pointer):

| Scene progress | Truck x pixels | Truck y pixels | Visible size |
|---|---|---|---|
| .505 |817.05..872.46|307.23..348.05|55.42×40.82|
| .535 |796.87..848.15|325.76..384.27|51.28×58.51|
| .5597540984 |692.20..767.43|467.65..517.54|75.23×49.89|
| .575 |575.97..651.77|485.18..539.45|75.80×54.27|

All four fall wholly in x520..890,y125..800. At .559754, a5×5 pixel grid over actual projected bounds produced16 rays that hit truck geometry; all16 reached truck before any quarry triangle. This verifies actual mesh line-of-sight, not just a bounding center. Mobile390×844 projects .56 truck x177.39..214.90,y422.66..445.31,37.51×22.65px, within the measured middle scene region. Final textured impression still requires screenshots.

Crystal envelope formerly attacked at .54 and therefore appeared during extraction. New focus .685 / spread .055 attacks at .63, after quarry's .619 full release, and releases at .74. A whole-coordinate sweep verifies no quarry/crystal envelope overlap. This is a deterministic story-derived visibility change, not a load-order or opacity hack.

## Fresh objective evidence

`node scripts/project-quarry.mjs` completed successfully this session and wrote `2026-09-15-quarry-projection.json` at2026-09-15T19:36:34.634Z. This includes every actual vertex projection bound, sampled route native position, camera position, mobile projection and16 individual real triangle line-of-sight verdicts.

`node --test tests/sceneProfiles.test.mjs tests/spatialCalibration.test.mjs` completed exit0:9 tests /9 pass /0 fail /13588.4031ms. New gate checks actual projected vertices, mobile crop, line-of-sight and crystal exclusion; existing gate re-bakes actual terrain, compares every cache contact/position/quaternion, checks geometry hashes and exact reverse replay. The helper has callers in this test plus its documented CLI invocation. No edits to mapper, Theatre, ActorDirector, camera director, pages or fonts.

## Root replay / acceptance

Use the real GSAP story handler. Desktop current measured extent11502: scrollY5505 is scene .559754. Additional forward reads: scroll5278.5→scene .535, scroll5644.5→scene .575. Replay the same offsets in reverse, restore user's found state. At5505, confirm a textured truck is visible centrally on quarry road/bench, not hidden behind inspector; at extraction-mid, confirm crystal fragments are absent. Check mobile390×844 with the actual runtime section anchor mapping, not desktop scroll offsets. Root alone owns browser state/screenshot acceptance.

Propagation register: these are product source changes only. Local source→GitHub gate = execution commit and SHA equality (not performed by worker). GitHub→Pages gate = successful deployment and fresh served browser routes (root release). Source→local calibration gate = actual-vertex report read-back, exact terrain reconstruction and tests this session (PASS); source→visual acceptance = fresh root screenshots (PENDING). No plugin/account/skill propagation targets changed.
