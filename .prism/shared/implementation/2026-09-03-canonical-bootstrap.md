---
date: 2026-09-03
stage: phase-0-canonical-bootstrap
status: complete
source: C:/Users/digit/Documents/Codex/2026-09-01/referenced-chatgpt-conversation-this-is-an/work/hazine-experience
target: C:/Users/digit/GriotClients/Hazine
pre_copy_head: 98bca9e36fe8712245f7e9ba7bc6cb7d1dda97c4
pre_copy_branch: main
---

# Hazine canonical bootstrap

## Safety contract

- The source and target were resolved to the exact absolute paths above.
- The target contains the canonical `.git` directory and was clean before copying.
- Copy is additive/overwriting only. No mirror, recursive delete, move, reset, or clean operation is permitted.
- Preserve `.git`, the target-only `.prism/shared/plans/2026-09-01-hazine-implementation-plan.md`, and every unmatched target path.
- Preserve immutable original GLBs; `assets/original/` remains ignored by Git.

## Explicit copy manifest

Copy these source entries to the same target-relative paths:

- `.prism/` — handoff, approved PRD, approved implementation plan, four decomposed epics, coverage ledgers, and this bootstrap record.
- `assets/optimized/`
- `assets/original/` — local immutable source assets; intentionally ignored by Git.
- `assets/prepared/`
- `public/`
- `scripts/`
- `src/`
- `.gitignore`
- `asset-report.optimized.json`
- `asset-report.original.json`
- `index.html`
- `MODEL_ATTRIBUTIONS.md`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `README.md`
- `vite.config.js`

Never copy these generated or repository-owned roots:

- `.git/`
- `node_modules/`
- `.pnpm-store/`
- `dist/`

## Pre-copy inventory

- Source included files: 81 before this record; 82 including this record.
- Canonical included files: 44.
- Source additions: 38 before this record; 39 including this record.
- Changed same-path files: 11.
- Identical same-path files: 32.
- Target-only files to preserve: 1, the prior 2026-09-01 Prism plan.
- Canonical remote: none configured.

## Completion record

- Baseline branch: `prism/hazine-experience-baseline`
- Baseline snapshot commit: `fdd6a7c0d69b28c14a6016db05f0aa5c85e395df`
- Frozen install: passed with the locked 426-package dependency graph using pnpm 11.19.0.
- Production build: passed with Vite 8.2.2; 988 modules transformed in 4.56 seconds.
- Canonical diff review: passed; 42 tracked files committed, original GLBs remain locally preserved and ignored, and the prior target-only Prism plan remains intact.
- Copy integrity: all 82 manifest files matched the source snapshot by SHA-256 before commit.
- Final status: Phase 0 complete; the canonical branch was clean immediately after the baseline snapshot commit.
