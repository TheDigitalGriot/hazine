# Coverage Report: epic-griot-r3f-starter

**Source specs**: `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`; `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`  
**Generated**: 2026-09-03  
**Global behavioral inventory range**: BR-077–BR-087  
**Requirements found**: 11 distinct behaviors  
**Stories emitted**: 11  
**Coverage**: 100% (11/11 distinct behaviors mapped)

## Behavioral Requirement Inventory

| # | Observable behavioral requirement | Story ID | Source |
|---|---|---|---|
| BR-077 | every exported primitive includes a provenance note naming the Hazine source module and acceptance check that proved it. | STORY-077 | SR-1 |
| BR-078 | I can declare actors, visibility envelopes, transforms, responsive variants, preload groups, and material behavior in a typed scene manifest. | STORY-078 | SR-2 |
| BR-079 | I can configure normalized scroll chapters, camera keys, spline passages, Theatre synchronization, and reduced-motion behavior without Hazine-specific names or geometry. | STORY-079 | SR-3 |
| BR-080 | DOM controls, R3F reactions, data selection, and product-surface switching share a small predictable state bridge. | STORY-080 | SR-4 |
| BR-081 | reusable Anime.js helpers scope animations to a root, replay safely, cancel on change/unmount, and honor live reduced-motion policy. | STORY-081 | SR-5 |
| BR-082 | documented commands inspect, optionally repair, optimize, validate, promote, and generate gltfjsx output from a license-aware manifest. | STORY-082 | SR-6 |
| BR-083 | reusable boundaries detect WebGL, report loading progress, contain scene/asset/module failures, offer retry, and preserve an authored static fallback. | STORY-083 | SR-7 |
| BR-084 | I can supply aspect-ratio-aware camera/actor profiles and verify them with standard viewport fixtures. | STORY-084 | SR-8 |
| BR-085 | I can opt into development performance instrumentation, adaptive DPR, lazy scene groups, bundle reports, and allocation-free render-loop examples. | STORY-085 | SR-9 |
| BR-086 | pinned compatible dependencies, configurable Vite base paths, SPA/subroute handling, and a GitHub Pages workflow deploy the sample beneath any repository subpath. | STORY-086 | SR-10 |
| BR-087 | I receive architecture and extension-point documentation, practical recipes, and a reduced Hazine-derived sample that contains no client brand assets or licensed models. | STORY-087 | SR-11 |

## PRD Source-Clause Ledger

Each in-scope PRD clause appears in exactly one epic ledger. Repeated acceptance language points to the single story that owns its proof.

| Source clause | Story |
|---|---|
| SR-1 provenance and traceability | STORY-077 |
| SR-2 reusable scene contract | STORY-078 |
| SR-3 choreography contract | STORY-079 |
| SR-4 DOM/3D bridge | STORY-080 |
| SR-5 motion lifecycle | STORY-081 |
| SR-6 asset toolchain | STORY-082 |
| SR-7 resilience | STORY-083 |
| SR-8 responsive 3D | STORY-084 |
| SR-9 performance instrumentation | STORY-085 |
| SR-10 deployment readiness | STORY-086 |
| SR-11 documentation and examples | STORY-087 |
| AC-S1 every primitive traces to validated Hazine | STORY-077 |
| AC-S2 neutral sample excludes brand/licensed GLBs | STORY-087 |
| AC-S3 repeatable manifest asset pipeline | STORY-082 |
| AC-S4 responsive/reduced-motion/failure/loading/performance examples | STORY-087 |
| AC-S5 pinned dependencies and CI build/type/lint/test | STORY-086 |
| AC-S6 configurable repository-subpath Pages deployment | STORY-086 |

## Intentional Exclusions

Future shader/WebGPU tracks are deliberately deferred. Hazine brand files, licensed Hazine GLBs, and unvalidated experimental code are prohibited inputs, not dropped requirements.

## Dependency Contract

The controller verifies the completed final Hazine acceptance report, public proof, and clean canonical repository before launch. STORY-077 is the local root; STORY-078–087 form a scalar, transitive chain. STORY-087 is the starter exit.

