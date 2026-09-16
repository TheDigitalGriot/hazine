# Hazine approved typography

These self-hosted **unmodified** font binaries provide the approved Cinzel / Inter typography. They do not replace, redraw or modify the approved Hazine wordmark, glyph, lockup, app icon or matrix artwork.

Official source repository: [Google Fonts](https://github.com/google/fonts), pinned revision `1ac2012c34919f5fa2675aacf723fa98edb30b5f`, downloaded 2026-09-15.

| Local file | Exact upstream path | Axes |
| --- | --- | --- |
| `Cinzel-Variable.ttf` | `ofl/cinzel/Cinzel[wght].ttf` | Weight 400–900; normal |
| `Inter-Variable.ttf` | `ofl/inter/Inter[opsz,wght].ttf` | Weight 100–900; optical size 14–32; normal |
| `Inter-Italic-Variable.ttf` | `ofl/inter/Inter-Italic[opsz,wght].ttf` | Weight 100–900; optical size 14–32; italic |

Binary SHA256 and verification are recorded in `.prism/shared/research/2026-09-15-font-engine-finish.md` and enforced by `tests/fonts.test.mjs`. Upstream filenames are represented by filesystem-safe local filenames only; the font bytes, embedded family names and axes are unchanged. No subset or format conversion has been performed.

Cinzel is by Natanael Gama / The Cinzel Project Authors. Inter is by Rasmus Andersson / The Inter Project Authors. Both are distributed under SIL Open Font License 1.1. Their exact upstream copyright/license notices are bundled in `Cinzel-OFL.txt` and `Inter-OFL.txt`; keep these notices with any redistributed fonts. The notice and metadata have differing Inter copyright years in upstream itself (OFL: 2020; metadata: 2016); the exact notice is preserved, not silently harmonized.

`src/fonts.css` defines the actual normal/italic faces; the shared `src/main.jsx` import serves all four pages. Vite rebases font URLs for the deployment base. No third-party font network connection is required at runtime.
