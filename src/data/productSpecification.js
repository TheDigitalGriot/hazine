// Exact authored delivered-document content, extracted with scripts/extract-specification.py.
// This is not a verbatim transcript; original-conversation recovery remains PARTIAL.
export const specificationTitle = 'Hazine — Product Requirements & Technical Experience Specification'
export const specificationProvenance = {
  "source": "C:\\Users\\digit\\Documents\\Codex\\2026-09-01\\referenced-chatgpt-conversation-this-is-an\\work\\build_hazine_pdf.py",
  "sha256": "102292c012b7aa1b5502c31a080e6ab162bc65570d9bd67cf5a3b978e3bfc909",
  "deliveredPdf": "Hazine_Product_Requirements_Technical_Experience_Specification.pdf",
  "originalConversation": "Agentic Tool Naming Ideas",
  "originalCompleteness": "PARTIAL — accepted 20,000-character passage truncates in section 35",
  "iconRegion": [
    970,
    145,
    125,
    185
  ]
}
export const specificationSections = [
  {
    "label": "DOCUMENT CONTROL",
    "title": "What is locked, what remains open",
    "line": 172,
    "blocks": [
      {
        "type": "text",
        "text": "This document consolidates the source conversation into an implementation-ready specification. It preserves approved product, interaction, architecture, and brand decisions while keeping framework details open where the conversation did not lock them.",
        "style": "BodyX",
        "line": 173
      },
      {
        "type": "table",
        "rows": [
          [
            "Status",
            "Meaning",
            "Instruction"
          ],
          [
            "LOCKED",
            "Approved canonical decision",
            "Implement without reinterpretation"
          ],
          [
            "REQUIRED",
            "Behavior necessary to preserve trust",
            "May vary technically; outcome cannot"
          ],
          [
            "ILLUSTRATIVE",
            "Example contract or content",
            "Adapt to the existing framework"
          ],
          [
            "OPEN",
            "Not decided in the source conversation",
            "Resolve through Prism planning / Ezgi validation"
          ]
        ],
        "line": 174
      },
      {
        "type": "text",
        "text": "Immutable brand rule",
        "style": "H2X",
        "line": 175
      },
      {
        "type": "text",
        "text": "The approved wordmark, glyph, lockup, desktop composition, plugin composition, design-system matrix, and mineral-sparkle icon are production references. Do not redraw, regenerate, approximate, restyle, or replace them. HAZINE wordmark = artwork; brand typography = type system.",
        "style": "BodyX",
        "line": 175
      },
      {
        "type": "text",
        "text": "Primary user",
        "style": "H2X",
        "line": 176
      },
      {
        "type": "text",
        "text": "Ezgi - a motivated, brilliant commodities trader. The system augments her judgment; it does not pretend to trade or decide for her.",
        "style": "BodyX",
        "line": 176
      }
    ],
    "id": "document-control"
  },
  {
    "label": "01 · PRODUCT THESIS",
    "title": "A persistent intelligence layer surrounding a trader's craft",
    "line": 178,
    "blocks": [
      {
        "type": "text",
        "text": "Hazine is not a trading dashboard with an AI chatbot attached. It continuously collects what Ezgi sees, hears, reads, watches, says, learns, and observes; connects that material over time; and surfaces the right context when it becomes strategically relevant.",
        "style": "BodyX",
        "line": 179
      },
      {
        "type": "text",
        "text": "What you know, when it matters.",
        "style": "QuoteX",
        "line": 179
      },
      {
        "type": "diagram",
        "kind": "pipeline",
        "line": 180
      },
      {
        "type": "table",
        "rows": [
          [
            "Collect",
            "Connect",
            "Surface"
          ],
          [
            "Market data, signals, news, video, transcripts, research, calls, calendar, notes, hypotheses, deal and counterparty context",
            "People, organizations, commodities, events, sources, claims, hypotheses, strategies, conversations and deals",
            "Briefs, evidence-linked insights, meeting preparation, contradiction alerts, contextual recall and strategy support"
          ]
        ],
        "line": 181
      }
    ],
    "id": "section-01"
  },
  {
    "label": "02 · PRODUCT DOCTRINE",
    "title": "The treasury metaphor is architecture, not decoration",
    "line": 183,
    "blocks": [
      {
        "type": "text",
        "text": "Hazine means treasury. Its value comes from deliberate preservation: knowledge, memory, evidence, relationships, market observations, conversations, hypotheses, and strategy history become more useful as context compounds.",
        "style": "BodyX",
        "line": 184
      },
      {
        "type": "table",
        "rows": [
          [
            "Should feel",
            "Must never become"
          ],
          [
            "Observant · precise · cultured · strategic · quietly powerful · trustworthy · human · worldly · adaptive",
            "Loud · crypto-coded · gamer-like · cyberpunk · generic fintech · Bloomberg imitation · chatbot-first · stereotypically Turkish · excessively ornate"
          ]
        ],
        "line": 185
      },
      {
        "type": "text",
        "text": "Cultural DNA",
        "style": "H2X",
        "line": 186
      },
      {
        "type": "text",
        "text": "The Turkish connection lives in the name, treasury metaphor, mercantile intelligence, exchange, memory, and craftsmanship. Avoid flags, crescents, Ottoman ornament, faux calligraphy, or decorative cultural shorthand. Heritage should shape how knowledge is preserved and exchanged, not become surface costume.",
        "style": "BodyX",
        "line": 186
      },
      {
        "type": "text",
        "text": "North-star question",
        "style": "H2X",
        "line": 187
      },
      {
        "type": "text",
        "text": "How can the system help Ezgi see what she knows?",
        "style": "BodyX",
        "line": 187
      }
    ],
    "id": "section-02"
  },
  {
    "label": "03 · SYSTEM ARCHITECTURE",
    "title": "One intelligence core, two purpose-built surfaces",
    "line": 189,
    "blocks": [
      {
        "type": "diagram",
        "kind": "architecture",
        "line": 190
      },
      {
        "type": "text",
        "text": "Hazine Core",
        "style": "H2X",
        "line": 190
      },
      {
        "type": "text",
        "text": "Shared ingestion, entity and claim extraction, relationship discovery, contradiction detection, market-signal interpretation, memory, knowledge graph, provenance, retrieval, and agent interface. Desktop and plugin must never maintain independent knowledge systems or duplicate business logic.",
        "style": "BodyX",
        "line": 190
      },
      {
        "type": "diagram",
        "kind": "surfaces",
        "line": 191
      }
    ],
    "id": "section-03"
  },
  {
    "label": "04 · DESKTOP / PLUGIN RELATIONSHIP",
    "title": "Depth in Hazine; aperture in the agent",
    "line": 193,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Dimension",
            "Desktop application",
            "Claude / agent plugin"
          ],
          [
            "Role",
            "Full intelligence environment",
            "Contextual aperture into Hazine"
          ],
          [
            "Primary mode",
            "Explore, compare, inspect, prepare, strategize",
            "Brief, retrieve, verify, deep-link"
          ],
          [
            "Visual identity",
            "Hazine's complete material system",
            "Claude remains Claude; Hazine is a dark sidecar"
          ],
          [
            "Knowledge",
            "Shared Hazine Core",
            "Shared Hazine Core"
          ],
          [
            "Navigation",
            "Full product information architecture",
            "Brief · Signals · Sources · Atlas · Prep Pack"
          ],
          [
            "Transition",
            "Receives exact context deep-links",
            "Open in Hazine lands on current entity, brief, meeting or strategy"
          ]
        ],
        "line": 194
      },
      {
        "type": "text",
        "text": "Claude = reasoning and conversation interface. Hazine = memory, market intelligence, and provenance layer.",
        "style": "QuoteX",
        "line": 195
      }
    ],
    "id": "section-04"
  },
  {
    "label": "05 · DESKTOP EXPERIENCE",
    "title": "Canonical three-zone composition",
    "line": 197,
    "blocks": [
      {
        "type": "diagram",
        "kind": "layout",
        "line": 198
      },
      {
        "type": "table",
        "rows": [
          [
            "Zone",
            "Canonical content",
            "Experience rule"
          ],
          [
            "Left dark rail",
            "Home, Markets, Research, Video Intelligence, Transcripts, Conversations, Knowledge Atlas, Strategy, Calendar, Settings; Hazine Vault card",
            "Persistent, calm; preserve lower-left mineral ornament"
          ],
          [
            "Light center",
            "Intelligence Brief, Market Overview, Connected Insights, Knowledge Atlas",
            "Warm ivory, luminous, editorial, comfortable for long sessions"
          ],
          [
            "Right dark rail",
            "Live Signals, Watchlist, Meeting Prep",
            "High-frequency situational awareness; dimensional, not flat black"
          ],
          [
            "Bottom strip",
            "Market regime, sentiment, liquidity, Hazine thought",
            "Ambient context, never a competing dashboard"
          ]
        ],
        "line": 199
      }
    ],
    "id": "section-05"
  },
  {
    "label": "06 · APPROVED DESKTOP SURFACE",
    "title": "Immutable high-fidelity reference",
    "line": 201,
    "blocks": [
      {
        "type": "image",
        "asset": "brand/hazine-desktop-v4.png",
        "line": 202
      },
      {
        "type": "text",
        "text": "Locked: information architecture, proportions, bright center, dark rails, Ezgi identity, Market Overview, Connected Insights, Knowledge Atlas, Live Signals, Watchlist, Meeting Prep, Vault treatment, and regime strip. Dates and market values shown are mock data and must be dynamic.",
        "style": "SmallX",
        "line": 202
      }
    ],
    "id": "section-06"
  },
  {
    "label": "07 · DESKTOP MODULE REQUIREMENTS",
    "title": "Narrative intelligence before dashboard density",
    "line": 204,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Module",
            "Question answered",
            "Required behaviors"
          ],
          [
            "Intelligence Brief",
            "What changed, why it matters, what deserves attention?",
            "Dynamic locale date; short narrative; full brief link; evidence paths"
          ],
          [
            "Market Overview",
            "What is moving?",
            "Ezgi-selected markets; price, unit, exchange, movement, quiet microtrend"
          ],
          [
            "Connected Insights",
            "What meaning connects across sources?",
            "Meaning-first retrieval; source tabs; person/time/tags; evidence one click away"
          ],
          [
            "Knowledge Atlas",
            "How are causes, claims and outcomes connected?",
            "Semantic edges; progressive disclosure; graph-to-evidence descent"
          ],
          [
            "Right rail",
            "What needs immediate awareness?",
            "Severity, timestamps, concise rationale, watchlist, event-aware prep"
          ],
          [
            "Command",
            "What can Hazine retrieve or compare here?",
            "Natural language embedded in context; never chatbot-first"
          ]
        ],
        "line": 205
      }
    ],
    "id": "section-07"
  },
  {
    "label": "08 · VIDEO & LIVE CONVERSATION INTELLIGENCE",
    "title": "Evidence must remain navigable to the moment it occurred",
    "line": 207,
    "blocks": [
      {
        "type": "text",
        "text": "Video is a first-class source: transcription -> speaker identification -> timestamp and topic segmentation -> claim/entity/market extraction -> graph connection. The workspace exposes player, transcript, chapters, claims, named entities, saved moments, annotations, and linked hypotheses.",
        "style": "BodyX",
        "line": 208
      },
      {
        "type": "table",
        "rows": [
          [
            "Video comparison",
            "Live conversation"
          ],
          [
            "Compare analyst agreement, disagreement, changed opinions, contradictions, assumptions and horizons. Every comparison claim links to the exact timestamp.",
            "Transcribe and diarize; recognize people, firms, commodities, prices and quantities; assemble visual notes; retrieve prior context; surface contradictions and useful questions without becoming a teleprompter."
          ]
        ],
        "line": 209
      },
      {
        "type": "text",
        "text": "Ambient live-call hierarchy",
        "style": "H2X",
        "line": 210
      },
      {
        "type": "text",
        "text": "WHAT IS BEING DISCUSSED -> WHAT HAZINE REMEMBERS -> WHAT HAS CHANGED -> WHAT MAY MATTER",
        "style": "BodyX",
        "line": 210
      }
    ],
    "id": "section-08"
  },
  {
    "label": "09 · EPISTEMIC MODEL",
    "title": "Evidence -> inference -> strategy",
    "line": 212,
    "blocks": [
      {
        "type": "diagram",
        "kind": "epistemic",
        "line": 213
      },
      {
        "type": "text",
        "text": "The taxonomy is foundational to trust. A market price is a FACT. A declining-inventory pattern may be a SIGNAL. 'Supply is tightening' is an INTERPRETATION. 'Premiums will rise next month' is a HYPOTHESIS. 'Raise delivery optionality in negotiation' is STRATEGY.",
        "style": "BodyX",
        "line": 213
      },
      {
        "type": "table",
        "rows": [
          [
            "Type",
            "UI obligation",
            "Agent obligation"
          ],
          [
            "FACT",
            "Source and observation time",
            "State directly only when supported"
          ],
          [
            "SIGNAL",
            "Indicator definition, time window, severity",
            "Explain measured change"
          ],
          [
            "INTERPRETATION",
            "Inference treatment + supporting/contradicting evidence",
            "Use calibrated language"
          ],
          [
            "HYPOTHESIS",
            "Owner, horizon, confidence, resolution state",
            "Track what would confirm or falsify"
          ],
          [
            "STRATEGY",
            "Clearly action-oriented, never evidence-colored",
            "Present options to Ezgi; preserve her agency"
          ]
        ],
        "line": 214
      }
    ],
    "id": "section-09"
  },
  {
    "label": "10 · PROVENANCE & MEMORY",
    "title": "Confidence at a glance; evidence one click away",
    "line": 216,
    "blocks": [
      {
        "type": "diagram",
        "kind": "memory",
        "line": 217
      },
      {
        "type": "table",
        "rows": [
          [
            "Every assertion answers",
            "Every memory exposes"
          ],
          [
            "Where did this come from? When was it observed? What supports it? What contradicts it? How confident are we? Has the underlying information changed?",
            "Source · created · last confirmed · confidence · related entities · related memories · classification · version history"
          ]
        ],
        "line": 218
      },
      {
        "type": "text",
        "text": "User controls",
        "style": "H2X",
        "line": 219
      },
      {
        "type": "text",
        "text": "Pin · Correct · Merge · Forget · Reclassify · Trace. The user should never wonder why Hazine believes something.",
        "style": "BodyX",
        "line": 219
      },
      {
        "type": "text",
        "text": "Self-improvement boundary",
        "style": "H2X",
        "line": 220
      },
      {
        "type": "text",
        "text": "Self-improving means accumulated memory, relationships, corrections, preference learning, source-quality history, retrieval feedback, entity familiarity, strategy outcomes, and hypothesis resolution. It does not imply uncontrolled autonomous retraining.",
        "style": "BodyX",
        "line": 220
      }
    ],
    "id": "section-10"
  },
  {
    "label": "11 · APPROVED CLAUDE PLUGIN",
    "title": "A dark intelligence sidecar inside Claude",
    "line": 222,
    "blocks": [
      {
        "type": "image",
        "asset": "brand/hazine-claude-plugin-v4.png",
        "line": 223
      },
      {
        "type": "text",
        "text": "Locked: Claude remains visually Claude; Hazine occupies a dark sidecar with Brief, Signals, Sources, Atlas and Prep Pack; live status; Today’s Context; compact signals; transcript evidence; meeting prep; quick actions; provenance footer.",
        "style": "SmallX",
        "line": 223
      }
    ],
    "id": "section-11"
  },
  {
    "label": "12 · PLUGIN BEHAVIOR",
    "title": "Situational context, not a miniature desktop",
    "line": 225,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Module",
            "Purpose",
            "Required action"
          ],
          [
            "Today's Context",
            "What matters right now?",
            "Concise narrative + topic chips + freshness"
          ],
          [
            "Live Signals",
            "Immediate market state",
            "Compact cards; link to supporting context"
          ],
          [
            "Latest Transcript Insight",
            "Evidence in the flow",
            "Playable excerpt + timestamp + speaker/source"
          ],
          [
            "Meeting Prep",
            "Current conversational context",
            "Checklist, prep pack, delta from last interaction"
          ],
          [
            "Quick Actions",
            "Move work forward",
            "Open in Hazine · Build brief · View sources · Prep pack"
          ],
          [
            "Open in Hazine",
            "Continue deep work",
            "Deep-link exact context, never default Home"
          ]
        ],
        "line": 226
      }
    ],
    "id": "section-12"
  },
  {
    "label": "13 · SHARED CAPABILITY CONTRACTS",
    "title": "Illustrative names; shared behavior is required",
    "line": 228,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Capability",
            "Intent"
          ],
          [
            "search(query, scope)",
            "Meaning-first retrieval across source types"
          ],
          [
            "getBrief(context)",
            "Narrative synthesis with traceable evidence"
          ],
          [
            "getMarketContext(instrument, timeRange)",
            "Market state plus connected knowledge"
          ],
          [
            "compareSources(sourceIds, question)",
            "Agreement, disagreement and assumptions with citations"
          ],
          [
            "getTranscriptMoment(sourceId, timestamp)",
            "Exact playable evidence"
          ],
          [
            "getMeetingPrep(eventId)",
            "Event-aware briefing and open questions"
          ],
          [
            "getConversationHistory(counterpartyId)",
            "Longitudinal counterparty memory"
          ],
          [
            "traceInsight(insightId)",
            "Evidence, contradictions, transformations and versions"
          ],
          [
            "inspectMemory(memoryId)",
            "Inspectable, correctable stored context"
          ]
        ],
        "line": 229
      },
      {
        "type": "text",
        "text": "Core entities",
        "style": "H2X",
        "line": 230
      },
      {
        "type": "text",
        "text": "Source · Entity · Relationship · Transcript · TranscriptSegment · Claim · MarketObservation · MarketSignal · Insight · Hypothesis · Conversation · Meeting · Counterparty · Strategy · Deal · Memory · EvidenceLink",
        "style": "BodyX",
        "line": 230
      }
    ],
    "id": "section-13"
  },
  {
    "label": "14 · DATA & TRUST REQUIREMENTS",
    "title": "Minimum durable records",
    "line": 232,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Object",
            "Minimum fields"
          ],
          [
            "TranscriptSegment",
            "sourceId · speaker · startTime · endTime · text · confidence · entities[] · claims[]"
          ],
          [
            "Insight",
            "statement · taxonomy type · evidence[] · confidence · createdAt · lastValidatedAt · contradictions[]"
          ],
          [
            "EvidenceLink",
            "sourceId · locator/timestamp · excerpt pointer · observedAt · extraction method"
          ],
          [
            "Hypothesis",
            "statement · owner · horizon · confidence · support[] · contradictions[] · status · resolution"
          ],
          [
            "Memory",
            "content · class · source · created · lastConfirmed · confidence · relations · versions"
          ],
          [
            "Deep link",
            "surface · entity/context ID · active scope · selected evidence · return target"
          ]
        ],
        "line": 233
      },
      {
        "type": "text",
        "text": "Non-negotiable invariant",
        "style": "H2X",
        "line": 234
      },
      {
        "type": "text",
        "text": "Model-generated interpretation must never masquerade as evidence. Transformations from source to claim to insight to strategy must remain inspectable.",
        "style": "BodyX",
        "line": 234
      }
    ],
    "id": "section-14"
  },
  {
    "label": "15 · VISUAL SYSTEM",
    "title": "Precision instrument × contemporary glass × mineral materiality",
    "line": 236,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Layer",
            "Direction"
          ],
          [
            "Center workspace",
            "Near-white / warm ivory (#FAF8F4 -> #FFFDFC territory), spacious and editorial"
          ],
          [
            "Rails",
            "Midnight navy / smoked graphite; dimensional; restrained internal highlights"
          ],
          [
            "Glass",
            "Material, not decoration: translucency, subtle blur, hairline edges, specular detail, realistic depth"
          ],
          [
            "Skeuomorphism",
            "Tactile controls, inset wells, subtle bevels, polished-metal hints; never faux leather or 2010 gloss"
          ],
          [
            "Signal language",
            "Warm mineral gold for intelligence and interaction; green/red only for semantic states"
          ],
          [
            "Digital mineral",
            "Fine particulate sparkle, mineral refraction, veining and data-like constellations used selectively"
          ],
          [
            "Motion",
            "Show cognition: evidence joining memory, relationships resolving, contradictions surfacing"
          ]
        ],
        "line": 237
      }
    ],
    "id": "section-15"
  },
  {
    "label": "16 · APPROVED DESIGN SYSTEM MATRIX",
    "title": "Production reference, not a prompt for regeneration",
    "line": 239,
    "blocks": [
      {
        "type": "image",
        "asset": "brand/hazine-design-system.png",
        "line": 240
      },
      {
        "type": "text",
        "text": "Use the matrix as a visual specification. Where a typography specimen resembles the Hazine wordmark, the immutable supplied wordmark artwork remains authoritative; interface typography must not attempt to recreate it.",
        "style": "SmallX",
        "line": 240
      }
    ],
    "id": "section-16"
  },
  {
    "label": "17 · IMMUTABLE BRAND ASSETS",
    "title": "Wordmark, glyph, lockup and special icon",
    "line": 242,
    "blocks": [
      {
        "type": "text",
        "text": "Approved sweeping-Z wordmark",
        "style": "H2X",
        "line": 245
      },
      {
        "type": "image",
        "asset": "brand/hazine-wordmark.png",
        "line": 243
      },
      {
        "type": "text",
        "text": "Approved glyph + wordmark lockup",
        "style": "H2X",
        "line": 245
      },
      {
        "type": "image",
        "asset": "brand/hazine-lockup.png",
        "line": 244
      },
      {
        "type": "text",
        "text": "Special glassmorphic mineral-sparkle application icon",
        "style": "H2X",
        "line": 245
      },
      {
        "type": "image",
        "asset": "approved-icon-region",
        "line": 246
      },
      {
        "type": "text",
        "text": "The approved special application treatment. Preserve its smoked glass, warm internal glow, particulate mineral sparkle, rounded-square depth, and exact approved glyph. Use the production master rather than regenerating.",
        "style": "SmallX",
        "line": 246
      }
    ],
    "id": "section-17"
  },
  {
    "label": "18 · PHASED BUILD ROADMAP",
    "title": "Build trust infrastructure before compounding intelligence",
    "line": 248,
    "blocks": [
      {
        "type": "diagram",
        "kind": "roadmap",
        "line": 249
      },
      {
        "type": "table",
        "rows": [
          [
            "Phase",
            "Exit criteria"
          ],
          [
            "01 Foundation",
            "Shared identity/schema; ingestion envelope; source locators; provenance chain; memory inspection; retrieval baseline"
          ],
          [
            "02 Desktop",
            "Canonical shell; Intelligence Brief; Market Overview; Connected Insights; Atlas; right rail; contextual command"
          ],
          [
            "03 Ingestion",
            "Video/transcript pipeline; timestamp navigation; speaker/entity/claim extraction; source comparison"
          ],
          [
            "04 Live intelligence",
            "Conversation capture; calendar awareness; meeting prep; progressive visual notes; post-call structuring"
          ],
          [
            "05 Plugin",
            "Claude sidecar; same contracts; exact context deep-links; evidence playback; prep actions"
          ],
          [
            "06 Compound",
            "Correction feedback; source-quality history; hypothesis resolution; outcome tracking; retrieval evaluation"
          ]
        ],
        "line": 250
      }
    ],
    "id": "section-18"
  },
  {
    "label": "19 · ACCEPTANCE CRITERIA",
    "title": "What the implementation must prove",
    "line": 252,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "#",
            "Pass condition"
          ],
          [
            "01",
            "Ezgi can move from any non-trivial assertion to its exact evidence and observation time."
          ],
          [
            "02",
            "FACT, SIGNAL, INTERPRETATION, HYPOTHESIS and STRATEGY are visually and semantically distinct."
          ],
          [
            "03",
            "Desktop and plugin read and write through the same core capabilities and memory model."
          ],
          [
            "04",
            "Open in Hazine restores the exact active context rather than opening Home."
          ],
          [
            "05",
            "Video comparison claims jump to the cited timestamp in the correct source."
          ],
          [
            "06",
            "Live conversation support remains glanceable and ambient, not a teleprompter."
          ],
          [
            "07",
            "Memory can be inspected, pinned, corrected, merged, forgotten, reclassified and traced."
          ],
          [
            "08",
            "The light-center / dark-rails desktop composition matches the approved reference."
          ],
          [
            "09",
            "The approved wordmark, glyph, lockup, matrices, and special icon are composited unchanged."
          ],
          [
            "10",
            "Dates, prices, confidence, status, freshness and user identity are real data, never mockup literals."
          ]
        ],
        "line": 265
      }
    ],
    "id": "section-19"
  },
  {
    "label": "20 · PRISM HANDOFF",
    "title": "Recommended workflow for the custom coding agent",
    "line": 267,
    "blocks": [
      {
        "type": "text",
        "text": "Treat this PDF as the canonical product and experience contract. Begin by mapping the existing framework to the shared-core boundary, source/provenance model, memory operations, and deep-link contract. Then implement the desktop shell at layout parity before widening capability scope.",
        "style": "BodyX",
        "line": 268
      },
      {
        "type": "table",
        "rows": [
          [
            "Sequence",
            "Agent task"
          ],
          [
            "Research",
            "Locate existing architecture, schemas, ingestion, agent interfaces, desktop shell, plugin surface, deep-linking and design tokens"
          ],
          [
            "Plan",
            "Create a decision log separating locked requirements from open technical choices; define vertical slices and migrations"
          ],
          [
            "Implement",
            "Start with one provenance-complete copper scenario spanning source -> insight -> brief -> plugin -> exact desktop deep-link"
          ],
          [
            "Validate",
            "Visual parity, evidence navigation, taxonomy semantics, memory correction, cross-surface consistency, keyboard/accessibility, long-session comfort"
          ],
          [
            "Bookend",
            "Record decisions, remaining risks, asset hashes/locations and screenshots of acceptance scenarios"
          ]
        ],
        "line": 269
      },
      {
        "type": "text",
        "text": "First vertical slice",
        "style": "H2X",
        "line": 270
      },
      {
        "type": "text",
        "text": "Ezgi has a Horizon Metals copper strategy call in 20 minutes. Hazine detects the calendar event, assembles prior conversations, market movements, news, research, video moments and open hypotheses; supports the live call; structures the new evidence; shows the hypothesis delta; and preserves the reasoning trail across desktop and plugin.",
        "style": "BodyX",
        "line": 270
      }
    ],
    "id": "section-20"
  },
  {
    "label": "APPENDIX · SOURCE TRACEABILITY",
    "title": "Conversation-derived canonical decisions",
    "line": 272,
    "blocks": [
      {
        "type": "table",
        "rows": [
          [
            "Decision",
            "Source status"
          ],
          [
            "Name and thesis: Hazine as living treasury",
            "Established from initial naming exploration and subsequent product definition"
          ],
          [
            "Primary user: Ezgi, commodities trader",
            "Explicit correction and locked requirement"
          ],
          [
            "Hybrid desktop + agent/plugin",
            "Explicit user requirement and source-of-truth PRD"
          ],
          [
            "Light center + dark rails",
            "Explicitly approved after fatigue/modernity correction"
          ],
          [
            "Desktop and plugin layouts",
            "Approved high-fidelity v4 assets"
          ],
          [
            "Provenance-first intelligence",
            "Repeated core trust requirement"
          ],
          [
            "FACT/SIGNAL/INTERPRETATION/HYPOTHESIS/STRATEGY",
            "Explicit canonical taxonomy"
          ],
          [
            "Evidence -> inference -> strategy",
            "Explicit epistemic separation"
          ],
          [
            "Immutable wordmark/glyph/lockup",
            "Explicit surgical-correction rule"
          ],
          [
            "Glassmorphic mineral-sparkle icon",
            "Explicit approved special icon direction"
          ],
          [
            "Design matrix",
            "Approved product visual-system reference"
          ]
        ],
        "line": 273
      },
      {
        "type": "text",
        "text": "End state",
        "style": "H2X",
        "line": 273
      },
      {
        "type": "text",
        "text": "The product should communicate: ‘I have an intelligence system accumulating around my craft.’ Not: ‘I have another AI app.’",
        "style": "BodyX",
        "line": 273
      },
      {
        "type": "text",
        "text": "Collect -> Connect -> Surface",
        "style": "QuoteX",
        "line": 273
      }
    ],
    "id": "source-traceability"
  }
]
