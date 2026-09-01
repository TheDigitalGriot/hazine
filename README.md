# Hazine — A Living Treasury of Intelligence

An interactive guided experience for Ezgi, showing how Hazine turns scattered market information into provenance-first strategic memory.

## Narrative

**Extraction → discernment → connection → preservation → strategic recall**

The story moves through a quarry, a mining truck, a mineral signal, an architectural threshold, and a treasury vault before resolving into the approved Hazine desktop and agent/plugin surfaces.

## Motion ownership

- **Theatre.js Core** is the authored cinematic clock for 3D sequences. Its sequence position is synchronized to the shared scroll clock without the legacy Fiber 8 adapter.
- **React Three Fiber** owns rendering, scene objects, materials, and interaction.
- **GSAP ScrollTrigger** owns scroll progress, chapter activation, and DOM entrances.
- **Anime.js** owns small widget, taxonomy, and typographic sequences.
- **CSS** owns simple hover, focus, and ambient loops.

One property has one motion owner. Reduced-motion preferences remove camera drift, sparkles, post-processing, scrub inertia, and ambient loops.

## Development

```bash
pnpm install
pnpm dev
pnpm build
```

Asset pipeline:

```bash
pnpm optimize:assets
pnpm generate:models
pnpm inspect:assets -- optimized
```

Original GLBs live in `assets/original/` and are intentionally excluded from Git. Optimized web assets live in `public/models/`. See [MODEL_ATTRIBUTIONS.md](./MODEL_ATTRIBUTIONS.md).

## Canonical product decisions

- Ezgi is the trader and the experience is shaped around her craft.
- Hazine is a hybrid desktop application and agent/plugin intelligence layer.
- The center workspace is light; navigation rails and surrounding context are dark.
- Provenance travels with every claim.
- Epistemic states are explicit: FACT, SIGNAL, INTERPRETATION, HYPOTHESIS, STRATEGY.
- Approved Hazine brand assets are treated as immutable source material.
