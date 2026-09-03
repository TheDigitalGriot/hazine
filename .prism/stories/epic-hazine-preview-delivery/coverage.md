# Coverage Report: epic-hazine-preview-delivery

**Source specs**: `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-PRD.md`; `.prism/shared/plans/2026-09-03-hazine-experience-and-griot-r3f-starter-IMPLEMENTATION.md`  
**Generated**: 2026-09-03  
**Global behavioral inventory range**: BR-001–BR-008  
**Requirements found**: 8 distinct behaviors  
**Stories emitted**: 8  
**Coverage**: 100% (8/8 distinct behaviors mapped)

## Behavioral Requirement Inventory

| # | Observable behavioral requirement | Story ID | Source |
|---|---|---|---|
| BR-001 | every runtime model, texture, brand, and navigation asset loads beneath the configured GitHub Pages repository base. | STORY-001 | FR-13; preview delivery |
| BR-002 | I can navigate directly to or refresh /workbench beneath the repository base without a 404. | STORY-002 | FR-8/FR-13; preview delivery |
| BR-003 | I receive explicit compatible dependency ranges instead of mutable latest releases. | STORY-003 | Plan Phase 1 |
| BR-004 | the same frozen install and production build create deployable root, workbench, and fallback artifacts locally and in GitHub Pages CI. | STORY-004 | FR-13; Plan Phase 1 |
| BR-005 | I can see exactly which Hazine preview behaviors are present, provisional, or deferred, with evidence for the deployed progress scope. | STORY-005 | Plan Phase 1 |
| BR-006 | the canonical repository points to the explicitly discovered TheDigitalGriot Hazine remote and Pages target rather than an inferred destination. | STORY-006 | Plan Phase 1 |
| BR-007 | only the reviewed progress commit is pushed and deployed through the configured Pages workflow. | STORY-007 | FR-13; Plan Phase 1 |
| BR-008 | the public root and direct /workbench URL load the reviewed commit with assets, refresh behavior, console, and desktop/mobile layout intact. | STORY-008 | AC-H9; Plan Phase 1 |

## PRD Source-Clause Ledger

Each in-scope PRD clause appears in exactly one epic ledger. Repeated acceptance language points to the single story that owns its proof.

| Source clause | Story |
|---|---|
| FR-8.4 direct workbench navigation/refresh | STORY-002 |
| FR-13.1 repository-subpath asset routing | STORY-001 |
| FR-13.2 Pages-compatible workbench fallback | STORY-002 |
| FR-13.3 reproducible canonical build | STORY-004 |
| FR-13.4 deploy verified commit and expose URL | STORY-007 |
| AC-H9 direct root/workbench Pages navigation | STORY-008 |

## Intentional Exclusions

None. The report must label full-experience and hardening behavior as deferred preview scope, not exclude it from the release plan.

## Dependency Contract

The controller verifies Phase 0's clean canonical baseline branch/commit before launch. STORY-001 is the local root; STORY-002–008 form a scalar, transitive chain. The controller verifies STORY-008 and the preview report before launching `epic-hazine-experience`.

