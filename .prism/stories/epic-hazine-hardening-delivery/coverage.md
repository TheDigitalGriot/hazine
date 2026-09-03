# Coverage Report: epic-hazine-hardening-delivery

**Source specs**: `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`; `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`  
**Generated**: 2026-09-03  
**Global behavioral inventory range**: BR-051–BR-076  
**Requirements found**: 26 distinct behaviors  
**Stories emitted**: 26  
**Coverage**: 100% (26/26 distinct behaviors mapped)

## Behavioral Requirement Inventory

| # | Observable behavioral requirement | Story ID | Source |
|---|---|---|---|
| BR-051 | I see intentional route, lazy scene-module, and asset-loading states while Hazine prepares. | STORY-051 | FR-10 |
| BR-052 | lazy-module, WebGL, scene, and asset failures are caught by an explicit boundary with a retry path. | STORY-052 | FR-10 |
| BR-053 | I receive an intentional static narrative experience instead of a broken canvas. | STORY-053 | FR-10 |
| BR-054 | live prefers-reduced-motion changes immediately govern GSAP, Anime.js, R3F actors, seal, globe, camera, pointer effects, and CSS. | STORY-054 | FR-10 |
| BR-055 | no decorative spatial or CSS motion remains active while state changes retain clear meaning. | STORY-055 | FR-10 |
| BR-056 | source GLBs under assets/original and approved public/brand assets remain byte-for-byte untouched while derivatives are produced elsewhere. | STORY-056 | FR-11/Visual |
| BR-057 | inspect, repair, optimize, validate, promote, and gltfjsx generation all consume one asset manifest. | STORY-057 | FR-11 |
| BR-058 | every optimized GLB is validated and its source/license attribution remains recorded and publishable. | STORY-058 | FR-11 |
| BR-059 | optimized artifacts reach public/models and generated components only through a repeatable validate-then-promote step. | STORY-059 | FR-11 |
| BR-060 | custom frame loops avoid per-frame object allocation and React state writes that degrade interaction. | STORY-060 | FR-12 |
| BR-061 | cloned materials are released exactly once without disposing shared source materials. | STORY-061 | FR-12 |
| BR-062 | actor fading preserves material arrays and transparent/glass behavior instead of assuming one opaque material. | STORY-062 | FR-12 |
| BR-063 | narrative actors load by chapter-oriented group rather than all blocking the initial scene. | STORY-063 | FR-12 |
| BR-064 | I receive bundle, transferred-byte, and frame-time baselines before any further mesh or shader reduction. | STORY-064 | FR-12/Performance |
| BR-065 | I can interact with the first chapter and its static scene while later 3D groups continue loading. | STORY-065 | FR-12/Performance |
| BR-066 | large copy stays restrained, labels stay concise, approved assets are used unchanged, gold means attention/value, mineral green means living context, and anomaly/danger colors remain reserved. | STORY-066 | Visual |
| BR-067 | motion follows leader/follower sequencing with 20-40% overlap, feedback begins within 150ms, UI transitions land within 350ms, and cinematic transitions remain within 600-1500ms. | STORY-067 | Visual |
| BR-068 | every control has semantics, labels, visible focus, and readable contrast even over dark or luminous 3D apertures. | STORY-068 | Visual/Accessibility |
| BR-069 | every live-intelligence phase passes visual checks at 1440x900 and 390x844. | STORY-069 | AC-H10 |
| BR-070 | the verified flows have no uncaught or unexpected console errors and the obsolete r3f-globe wrapper is absent. | STORY-070 | AC-H11 |
| BR-071 | hardening does not regress initial transferred bytes or median frame time by more than 10%, and active 3D transitions sustain at least 30 FPS on the defined low-power profile. | STORY-071 | Performance |
| BR-072 | a clean frozen dependency install reproducibly builds the root and Pages-compatible workbench artifacts from the canonical source tree. | STORY-072 | Plan Phase 6 |
| BR-073 | every PRD acceptance criterion and phase quality gate has concrete pass/fail evidence in one validation report. | STORY-073 | Plan Phase 6/DoD |
| BR-074 | the final canonical diff contains only intended Hazine and validation changes while preserving Phase 0 history, unmatched user files, and unrelated work. | STORY-074 | Plan Phase 6 |
| BR-075 | the reviewed final canonical state is committed atomically and that exact commit is deployed through the remote and Pages target already proven by the preview. | STORY-075 | AC-H13/Plan Phase 6 |
| BR-076 | the public root, chapter anchor, and direct /workbench URL load the verified commit with assets, interactions, console, and mobile layout passing, and the canonical repository is clean at that deployed SHA. | STORY-076 | Plan Phase 6/DoD |

## PRD Source-Clause Ledger

Each in-scope PRD clause appears in exactly one epic ledger. Repeated acceptance language points to the single story that owns its proof.

| Source clause | Story |
|---|---|
| FR-10.1 authored route/module/asset loading | STORY-051 |
| FR-10.2 explicit error boundary | STORY-052 |
| FR-10.3 WebGL static experience | STORY-053 |
| FR-10.4 live reduced-motion changes | STORY-054 |
| FR-10.5 no decorative reduced-motion activity | STORY-055 |
| FR-11.1 preserve originals | STORY-056 |
| FR-11.2 one asset manifest | STORY-057 |
| FR-11.3 validate GLBs and record attribution | STORY-058 |
| FR-11.4 explicit promotion | STORY-059 |
| FR-12.1 no per-frame allocation/state | STORY-060 |
| FR-12.2 safe cloned-material disposal | STORY-061 |
| FR-12.3 arrays and transparent/glass materials | STORY-062 |
| FR-12.4 lazy narrative actors | STORY-063 |
| FR-12.5 measure before reduction | STORY-064 |
| FR-12.6 static fallback during late load | STORY-065 |
| AC-H10 desktop/mobile live-phase checks | STORY-069 |
| AC-H11 clean runtime and no r3f-globe | STORY-070 |
| AC-H12 no reduced-motion decoration | STORY-055 |
| AC-H13 production build and Pages success | STORY-075 |
| VR-1 immutable approved assets | STORY-056 |
| VR-2 restrained copy/concise labels | STORY-066 |
| VR-3 semantic/reserved colors | STORY-066 |
| VR-4 leader/follower 20-40% overlap | STORY-067 |
| VR-5 150/350/600-1500ms timing budgets | STORY-067 |
| VR-6 visible focus on every control | STORY-068 |
| VR-7 contrast over transparent aperture | STORY-068 |
| SM-1 100% provenance completeness | STORY-032 |
| SM-2 100% behavioral decomposition coverage | STORY-073 |
| SM-3 same-frame connected update | STORY-029 |
| SM-4 zero uncaught runtime errors | STORY-070 |
| SM-5 zero accessibility blockers | STORY-068 |
| SM-6 actor opacity envelopes | STORY-021 |
| PG-1 baseline before optimization | STORY-064 |
| PG-2 no regression above 10% | STORY-071 |
| PG-3 30 FPS low-power floor | STORY-071 |
| PG-4 late assets do not block first interaction | STORY-065 |

## Intentional Exclusions

Business KPIs and production data latency are explicitly excluded by PRD §12. No in-scope hardening or final-delivery behavior is excluded.

## Dependency Contract

The controller verifies `epic-hazine-experience` and its full-experience gates before launch. STORY-051 is the local root; STORY-052–076 form a scalar, transitive chain. The controller verifies STORY-076, the acceptance report, clean canonical state, and final public proof before launching `epic-griot-r3f-starter`.

