# Hazine Acceptance Report

**Stage:** 03 — Validate Hazine  
**Verdict:** PASS WITH EXPLICIT PRODUCT DEFERRALS  
**Captured:** 2026-09-14  
**Evidence:** 12 persistent screenshots, 9.31 MB total

## Acceptance outcome

Hazine’s walkthrough and separate workbench meet the approved experience specification at prototype fidelity. The visual system is legible on desktop and mobile, the 3D world remains present behind the interface, the Claude plugin is the default, the desktop alternate works, provenance stays visible, and the vault path reads as a passage into a two-room treasury.

One defect was directly observed and repaired during this stage: fresh loads of non-opening chapter hashes produced dark frames because chapter/progress state was not hydrated with the initial scroll position. The fix now derives the initial chapter from the hash and synchronizes ScrollTrigger after the browser scrolls. The same direct routes were recaptured successfully after repair.

## Evidence matrix

| Requirement | Verdict | Evidence |
|---|---|---|
| Islamic threshold and two-room vault passage | PASS | `desktop-threshold.png`, `desktop-vault.png`, vault spline test |
| Office and live-call scene with Ezgi | PASS | `desktop-call.png` |
| Geography / wider-world connection | PASS | `desktop-geography.png` |
| Evidence and provenance-first intelligence | PASS | `desktop-evidence.png`, sourced evidence tab interaction |
| Relationship intelligence and revisable persona | PASS | relationship tab interaction; persona facts and confidence rendered |
| Deal-closing decision window | PASS | `desktop-decision.png` |
| Plugin-first hybrid product | PASS | `workbench-plugin.png`; default control state verified |
| Desktop alternate with light center and dark rails | PASS | `workbench-desktop.png` |
| Mobile visual story and horizontal instrument | PASS | `mobile-threshold.png`, `mobile-call.png` |
| Reduced-motion presentation | PASS | `reduced-motion-threshold.png`; Chrome emulated media |
| WebGL/static fallback and retry | PASS | `webgl-fallback-threshold.png` |
| Direct route refresh and Pages base | PASS | repaired chapter hydration; HTTP 200 for `/hazine/`, `/hazine/workbench/`, `/hazine/404.html`, and JS asset |
| Keyboard operation | PASS | Shift+Tab and Return activated the Evidence tab in the rendered workbench |
| Live/evidence/relationship controls | PASS | all three views driven in the browser |
| Transcript selection and pause/resume | PASS | selected “Almost seventy percent”; playback paused automatically and resumed |
| FACT / SIGNAL / INTERPRETATION / HYPOTHESIS / STRATEGY | PASS | rendered transcript and canonical manifest |
| Approved immutable brand references | PASS | approved visual assets remain referenced; no replacement or lossy re-export |
| Production microphone/transcription | DEFERRED | outside walkthrough scope |
| Production Claude MCP/plugin transport | DEFERRED | outside walkthrough scope |
| Persistent intelligence graph / market connectors | DEFERRED | outside walkthrough scope |
| Electron packaging | DEFERRED | outside walkthrough scope |

## Technical gate

- `pnpm run check`: PASS
- `pnpm run test`: PASS — 4 passed, 0 failed
- `pnpm run build`: PASS at `/`
- `VITE_BASE=/hazine/ pnpm run build`: PASS
- `pnpm run verify:capture`: PASS after its browser-cleanup race was observed and corrected
- `pnpm run inspect:assets -- optimized`: PASS for all 8 promoted GLBs
- Browser console: 0 application errors
- Expected upstream warning: stable React Three Fiber 9.x reaches Three.js’s deprecated `Clock`; v10’s replacement scheduler remains alpha, so the warning is recorded rather than hidden with an unstable upgrade.

## Budget record

- Largest model: `mining_quarry.glb`, 5.20 MB
- Largest application scene chunk: `HazineScene`, 506.70 kB minified
- R3F stack: 515.92 kB minified
- Largest vendor chunk: Three core, 636.88 kB minified / 178.09 kB gzip
- Deliberate exception: the Three core vendor chunk exceeds Vite’s 550 kB minified warning threshold. It is load-bearing rendering code, not duplicated Hazine scene code; it remains separately cached. No dependency was stripped merely to silence the warning.

## Screenshot inventory

- `desktop-threshold.png`
- `desktop-vault.png`
- `desktop-call.png`
- `desktop-geography.png`
- `desktop-evidence.png`
- `desktop-decision.png`
- `workbench-plugin.png`
- `workbench-desktop.png`
- `mobile-threshold.png`
- `mobile-call.png`
- `reduced-motion-threshold.png`
- `webgl-fallback-threshold.png`

## Release verdict

The Hazine walkthrough is ready for the publication stage as an explicitly labeled interactive product vision. The four production integrations above remain intentionally deferred and must not be represented as live.
