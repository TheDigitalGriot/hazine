---
epic: Hazine Preview Delivery
startedAt: 2026-09-03T08:17:44-04:00
---

# Spectrum Progress Log (Iteration History)

This file is append-only. It is NOT loaded by worker sessions.
For curated learnings future sessions should see, edit progress.md instead.


## STORY-001 — Resolve assets beneath the repository base
**Completed:** 2026-09-03T08:52:00-04:00 · **Gate:** `pnpm run build` PASS (base `/` and `/hazine/`)

### What was done
Created `src/lib/assetUrl.js` — a pure, idempotent wrapper over `import.meta.env.BASE_URL` —
and migrated all 21 runtime asset references off root-absolute strings:
- 8 GLB models (`src/models/*.jsx`)
- 1 globe texture (`src/components/HazineScene.jsx`)
- 3 brand images (`src/App.jsx`, `src/components/StoryWidgets.jsx`)
- 6 navigation links (`src/App.jsx`, `src/components/InstrumentRail.jsx`, `src/workbench/WorkbenchApp.jsx`)
Wired `vite.config.js` `base` to `VITE_BASE` (default `/`), and made `src/main.jsx`'s
workbench route matcher base-aware so it stays in step with the migrated nav links.

### Files changed
`src/lib/assetUrl.js` (new), `vite.config.js`, `src/main.jsx`, `src/App.jsx`,
`src/components/HazineScene.jsx`, `src/components/InstrumentRail.jsx`,
`src/components/StoryWidgets.jsx`, `src/workbench/WorkbenchApp.jsx`, `src/models/*.jsx` (8).

### Evidence
- assetUrl probe, both bases: leading slash, no leading slash, `//`, already-prefixed,
  `http:`/`data:`/protocol-relative, `""`, `"/"` — all correct. Idempotence `f(f(x))===f(x)` PASS.
- Static probe under `/hazine/`: 8 GLBs + texture + brand images → **200**;
  the same paths *without* the base → **404** (proves the fix is load-bearing, not cosmetic).
- Live browser run: 91 requests, all 200 except browser-implicit `/favicon.ico`
  (no favicon declared in the project — pre-existing, unrelated). Globe texture confirmed at
  `/hazine/textures/earth-night.jpg` [200]. Root and `/hazine/workbench/` both render,
  zero console errors on the workbench route.
- Screenshots: `.prism/local/verifications/STORY-001-{root,workbench}-under-base.png`

### Two-stage review
- Spec: ✅ Compliant, no issues. Explicitly ruled that migrating 12 files (vs. the 4 in
  `story.files`) was correct — the description and step 2 demand *every* model/texture/brand/nav
  reference, and a partial migration would trigger the story's own named risk. Also ruled the
  `main.jsx` route-matcher edit in scope: `graphTargets` assigns `main::routing` to STORY-001,
  distinct from STORY-002's `main::routeSelect`.
- Quality: ✅ Approved, no Critical/Important. Two Minor notes (below).

### Concerns / accepted minors
1. **Reviewer flagged `rooted.startsWith(BASE)` as a non-segment-safe prefix match — assessed
   and rejected as a false alarm.** `BASE` is normalized to always end in `/`, so `startsWith`
   already requires a `/` boundary; `/hazineXYZ/foo` correctly does not match. What genuinely
   remains is an *inherent policy ambiguity*: a literal folder named `hazine` under base
   `/hazine/` is indistinguishable from an already-prefixed path. The story mandates
   already-prefixed idempotence, so current behavior implements the required policy.
   **No code change. Do not re-litigate.**
2. Double normalization (`vite.config.js` + `assetUrl.js`) is intentional defensive redundancy;
   `assetUrl.js`'s contract documents its trailing-slash assumption rather than trusting it.
3. No unit test for `assetUrl.js` — the project has no test framework and `epic.qualityGates`
   is `["pnpm run build"]` only. Adding a runner would be scope creep. Verified instead by the
   probe + live browser run above. If a framework lands later, `assetUrl` is pure and trivially testable.

### Deferred to later stories (deliberately NOT done here)
- `dist/workbench/index.html` + `dist/404.html` static entry and SPA fallback → **STORY-002**.
  Direct-load of `/hazine/workbench/` currently works only because `vite preview` supplies an
  SPA fallback; **GitHub Pages does not**. That gap is STORY-002's job, not a defect here.
