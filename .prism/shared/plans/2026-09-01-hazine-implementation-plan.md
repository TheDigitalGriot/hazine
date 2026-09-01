---
plan: Hazine — Implementation Plan
project: Hazine (client: Ezgi · commodities trader)
target_repo: GriotClients/hazine  (to scaffold via Fragment)
source_of_truth: Hazine PRD (Product Requirements & Technical Experience Specification, 2026-09-01) + hazine-codex
status: greenfield · brand + composition LOCKED · tech OPEN
authored: 2026-09-01 (Cowork) — execute in Claude Code / Cursor
workflow: Prism (Research done → this Plan → Implement per phase → Validate → Bookend)
---

# Hazine — Implementation Plan

## 1. Overview

Build **Hazine** — a persistent, provenance-first **market-intelligence platform + Claude sidecar** for Ezgi, a commodities trader. Hazine is *not* a trading dashboard with a chatbot bolted on; it is an intelligence layer that **collects** what she sees/hears/reads/watches, **connects** it into a time-aware knowledge graph, and **surfaces** the right context when it becomes strategically relevant. It augments her judgment; it never trades or decides for her.

The build is an **assembly**, not a from-scratch write: we **lift the Cinopsis and Meridian architectures directly**, stand them on the **Audion** (capture) and **Synaptiq** (graph/memory) substrate, and **augment each layer with the harvested OSS shelf**. Prism builds it; Ezgi validates it.

## 2. Current state

- **PRD is canonical** — the 23-page Product Requirements & Technical Experience Specification is the contract. Section 20 is an explicit Prism handoff. Treat its LOCKED items as non-negotiable.
- **Brand + composition are LOCKED** — wordmark, glyph, lockup, mineral-sparkle icon, design matrix, the three-zone desktop composition, and the dark Claude sidecar are production references. Do not redraw, regenerate, restyle, or approximate them. (See hazine-codex + the design matrix.)
- **No repo yet** — Hazine is unscaffolded. Intended home: `C:\Users\digit\GriotClients\hazine`.
- **Lift sources are in-hand** — Cinopsis (`GriotApps/cinopsis`), Meridian, Audion, Synaptiq are Gavin's own apps; their architectures are lifted directly, not reimplemented from a blank page.
- **Tech stack is OPEN** — framework, storage/graph engine, model routing are undecided; resolve in Phase 0 with Ezgi, not pre-committed here.

## 3. Desired end state

The product communicates: *"I have an intelligence system accumulating around my craft"* — not *"I have another AI app."* Concretely: **Collect → Connect → Surface**, over one shared core, on two surfaces (desktop deep-work + Claude sidecar), with every surfaced statement carrying its provenance and its epistemic type, and Ezgi able to move from any assertion to its exact evidence and observation time.

## 4. What we are NOT doing

- Not redesigning the brand or the canonical desktop/plugin composition (LOCKED).
- Not building two knowledge systems — desktop and plugin share **one** Hazine Core; never duplicate business logic.
- Not letting model-generated interpretation masquerade as evidence.
- Not making it cloud-dependent where local is the point (capture/ASR run on-device).
- Not executing trades or giving Ezgi financial advice — strategy is presented as options; agency stays with her.
- Not committing the tech stack in this document — that is Phase 0's job.

## 5. Architecture — one Core, two surfaces, assembled from lifts

**Hazine Core** (shared): ingestion · entity/claim extraction · relationship discovery · contradiction detection · market-signal interpretation · memory · knowledge graph · provenance · retrieval · agent interface.

```
   LIFTED (Griot architectures, whole)          SUBSTRATE            OSS AUGMENT (harvest per layer)
   ┌───────────────┐  ┌───────────────┐     ┌──────────────┐     capture · memory · market
   │   Cinopsis     │  │   Meridian     │     │   Audion     │
   │ video/transcript│ │ reflect·prep   │     │  capture     │──┐
   │  intelligence   │ │ ·attention     │     ├──────────────┤  │
   └───────┬────────┘  └───────┬────────┘     │  Synaptiq    │  │
           └──────────┬────────┴───────────────┤  graph/mem   │  │
                      ▼                         └──────┬───────┘  │
                 ┌──────────────────────────────────── ▼ ────────┘
                 │                HAZINE CORE                      │
                 │  ingest · intelligence · memory+graph ·         │
                 │  provenance · retrieval · agent interface       │
                 └───────────────┬───────────────┬─────────────────┘
                                 ▼               ▼
                        ┌────────────────┐  ┌────────────────┐
                        │ Desktop (deep) │  │ Claude sidecar │
                        │ 3-zone, locked │  │ dark, in-flow  │
                        └────────────────┘  └────────────────┘
```

**Lift map (what each contributes):**
- **Cinopsis → Hazine** — lift the video/transcript intelligence engine whole: transcription → speaker ID → timestamp/topic segmentation → claim/entity/market extraction → graph connection; comparison of sources with every claim linked to its exact timestamp.
- **Meridian → Hazine** — lift the reflection/attention engine: meeting prep, "what changed since last interaction", close-the-loop, estimate-vs-actual, contextual recall.
- **Audion → Hazine** — the live-capture layer (real-time listening; glanceable, never a teleprompter).
- **Synaptiq → Hazine** — the knowledge-graph / memory substrate the Core stores into.

## 6. Open decisions — resolve in Phase 0 (with Ezgi)

| # | Decision | Notes |
|---|---|---|
| D1 | App framework/shell | Tauri (Rust) is favored by the lift sources (Meetily) + local-first goal; confirm vs Electron given the locked composition. |
| D2 | Graph + vector store | Kuzu (embedded, Cypher, MIT) + sqlite-vec vs TencentDB-Agent-Memory L0–L3 vs BrainAPI2's time-aware graph. |
| D3 | ASR/diarization engine | Whisper vs Parakeet (Meetily ships both); quill's two-track "me-vs-them" diarization trick. |
| D4 | Summarization/model routing | local Ollama vs Claude — route through the Prism model-policy control-plane; never silently bill metered. |
| D5 | Market data source | cata-centavo (open-finance over MCP) / Folio Fox (Yahoo Finance) / a market-data API — confirm what Ezgi's markets need. |

## 7. Implementation phases

> Order is load-bearing: **build trust infrastructure before compounding intelligence.** Each phase has a checkable exit. "Harvest" = lift the pattern/code from the named repo into Hazine's terms (MIT repos are code-safe; verify license per tool before lifting code; GPL/AGPL = pattern-only).

### Phase 0 — Scaffold & decisions
- **Goal:** repo + tech decisions locked.
- **Do:** scaffold `GriotClients/hazine` via **Fragment** (Prism-image multi-surface: shared core + desktop + Claude plugin surfaces); `prism-init` the `.prism/` tree; resolve D1–D5 with Ezgi.
- **Success:** repo builds an empty shell on the two locked surfaces; decision log written to `.prism/shared/`.

### Phase 01 — Foundation (provenance + memory + retrieval)
- **Goal:** the trust substrate.
- **Do:** shared identity/schema; ingestion envelope; source locators; **provenance chain**; memory inspection (pin/correct/merge/forget/reclassify/trace); retrieval baseline.
- **Harvest:** **Synaptiq** substrate + **BrainAPI2** (time-aware KG, traceable reasoning, MCP) · **Kuzu** (embedded graph) · **sqlite-vec** / **TencentDB-Agent-Memory** (L0–L3 memory) · **OptMem**/**Mem0**/**MemOS** (persistent agent memory patterns) · **Almanac** (in-repo decision wiki).
- **Success:** minimum durable records exist (TranscriptSegment, Insight, EvidenceLink, Hypothesis, Memory, Deep link) with the non-negotiable invariant enforced: *interpretation never masquerades as evidence*.

### Phase 02 — Desktop shell
- **Goal:** the canonical three-zone composition at layout parity.
- **Do:** dark left rail (nav + Vault + mineral ornament) · light ivory center (Intelligence Brief, Market Overview, Connected Insights, Knowledge Atlas) · dark right rail (Live Signals, Watchlist, Meeting Prep) · ambient market-regime strip · contextual command (NL embedded, never chatbot-first).
- **Harvest:** note/second-brain surfaces for the center — **graybox** (verbatim immutable inbox + citing wiki), **inkstone** (backlinks/graph), **Melo** (UX ref only).
- **Success:** matches the approved reference (PRD §06); dates/prices/confidence are real data, never mock literals.

### Phase 03 — Ingestion (video + transcript intelligence) — **Cinopsis lift**
- **Goal:** evidence navigable to the moment it occurred.
- **Do:** lift Cinopsis's pipeline — transcription → speaker ID → timestamp/topic segmentation → claim/entity/market extraction → graph connection; player + transcript + chapters + claims + saved moments + annotations; source comparison (agreement/disagreement/changed-opinion/contradiction) with each claim linked to the exact timestamp.
- **Harvest:** **CrisperWhisper** (verbatim ASR fidelity) · **rescript** (edit-by-transcript word-level timestamps).
- **Success:** a video-comparison claim jumps to the cited timestamp in the correct source.

### Phase 04 — Live intelligence (calls + calendar) — **Audion + Meridian lift**
- **Goal:** the live-call + prep loop.
- **Do:** conversation capture (transcribe + diarize, on-device) → progressive visual notes → retrieve prior context → surface contradictions + useful questions **without becoming a teleprompter**; calendar-aware **meeting prep** (checklist, prep pack, delta-from-last-interaction) via the Meridian lift.
- **Harvest:** **Meetily** (MIT — the capture→diarize→summarize pipeline, code-safe) · **quill** (two-track diarization) · **Qwen-Scribe**/**yap** (OS-native on-device dictation).
- **Success:** live support stays glanceable + ambient; post-call the new evidence is structured and the hypothesis delta is shown.

### Phase 05 — Claude sidecar (plugin) — same Core
- **Goal:** a dark intelligence aperture inside Claude.
- **Do:** Brief · Signals · Sources · Atlas · Prep Pack over the **same** capabilities + memory; today's context; compact signals; transcript evidence; meeting prep; provenance footer; **"Open in Hazine"** deep-links the exact active entity/brief/strategy (never default Home).
- **Success:** desktop and plugin read/write through the same core contracts; deep-link restores exact context.

### Phase 06 — Compound (quality learning) — **Meridian close-the-loop**
- **Goal:** the treasury compounds.
- **Do:** correction feedback · source-quality history · hypothesis resolution · outcome tracking · retrieval evaluation.
- **Success:** accumulated memory, corrections, and source-quality demonstrably improve retrieval — **without** uncontrolled autonomous retraining.

## 8. First vertical slice (the proving story)

**The copper strategy call.** Ezgi has a Horizon Metals copper call in 20 minutes. Hazine detects the calendar event; assembles prior conversations, market movements, news, research, video moments and open hypotheses; supports the live call; structures the new evidence; shows the hypothesis delta; and preserves the reasoning trail across desktop and plugin. Build this **provenance-complete** end-to-end (source → insight → brief → plugin → exact desktop deep-link) as the first slice — it exercises every layer thinly.

## 9. Data model & capability contracts (from PRD — illustrative names, shared behavior required)

**Core entities:** Source · Entity · Relationship · Transcript · TranscriptSegment · Claim · MarketObservation · MarketSignal · Insight · Hypothesis · Conversation · Meeting · Counterparty · Strategy · Deal · Memory · EvidenceLink.

**Capabilities (both surfaces call the same):** `search(query, scope)` · `getBrief(context)` · `getMarketContext(instrument, timeRange)` · `compareSources(sourceIds, question)` · `getTranscriptMoment(sourceId, timestamp)` · `getMeetingPrep(eventId)` · `getConversationHistory(counterpartyId)` · `traceInsight(insightId)` · `inspectMemory(memoryId)`.

## 10. Epistemic model & provenance invariants (non-negotiable)

Every surfaced statement declares its type: **FACT → SIGNAL → INTERPRETATION → HYPOTHESIS → STRATEGY**, kept visually + semantically distinct. UI obligations: facts show source+time; signals show indicator/window/severity; interpretations use calibrated language + supporting/contradicting evidence; hypotheses carry owner/horizon/confidence/resolution; strategy is action-oriented options, never evidence-colored. **Invariant:** transformations from source → claim → insight → strategy remain inspectable; interpretation never masquerades as evidence.

## 11. Acceptance criteria (the 10 the implementation must prove)

1. Ezgi can move from any non-trivial assertion to its exact evidence + observation time.
2. FACT/SIGNAL/INTERPRETATION/HYPOTHESIS/STRATEGY are visually + semantically distinct.
3. Desktop and plugin read/write through the same core capabilities + memory model.
4. "Open in Hazine" restores the exact active context, not Home.
5. Video-comparison claims jump to the cited timestamp in the correct source.
6. Live conversation support stays glanceable + ambient, not a teleprompter.
7. Memory can be inspected, pinned, corrected, merged, forgotten, reclassified, traced.
8. The light-center / dark-rails desktop composition matches the approved reference.
9. The approved wordmark, glyph, lockup, matrices and special icon are composited unchanged.
10. Dates, prices, confidence, status, freshness and identity are real data, never mock literals.

## 12. Validation strategy

Per phase, verify against the acceptance criteria above + the PRD's per-module required behaviors. Use the Prism validate phase; for UI, drive the device-local Playwright (dgs `verify.mjs` pattern) for render + parity checks against the approved surfaces. Two-stage review (spec compliance → quality) before each phase closes.

## 13. References

- **Hazine PRD** — Product Requirements & Technical Experience Specification (2026-09-01) — canonical.
- **hazine-codex** — architecture one-pager (griot-live-artifacts/live/hazine-codex.html + published artifact).
- **DGS Definitive Plan** — Hazine node + edges (git: griot-live-artifacts/live/dgs-definitive-plan.html).
- **Lift sources:** Cinopsis (`GriotApps/cinopsis`), Meridian, Audion, Synaptiq.
- **OSS lift-shelf (Griot Potluck):** capture (Meetily MIT · quill · CrisperWhisper · Qwen-Scribe · yap · rescript) · memory/graph (BrainAPI2 · Kuzu · sqlite-vec · TencentDB-Agent-Memory · Mem0 · Letta · MemOS · OptMem · PageIndex · Almanac · Root · Nanobot) · note/second-brain (graybox · inkstone · Hubble.md · Alexandrie · shiki · omniget) · market (Quant · Vibe-Trading · cata-centavo · Folio Fox). Verify each license before lifting code.

---

*Execution: `/prism:decompose_plan` this into stories, then `/prism:prism-spectrum` (or `/prism:implement_plan`) phase by phase in Claude Code / Cursor. Keep the plan-nod interactive; run research/implement/validate device-side.*
