# Font and engine finish — 2026-09-15

## Observation before edits

TheatreSequenceAdapter sampled raw `useExperience.getState().progress`, while the camera, actors and globe sample `sceneCoordinate` from that same store. The mapped chapter-call coordinate is `2808 / 11502 → .265`, not the raw `.244131455399060…`. New wired adapter/real-core regression test failed before the adapter edit: Node exit 1; 3 tests, 2 pass, 1 fail; `adapter must sample the same derivation as actors/camera/globe`. This lane changes no store, clock, layout or knowledge range.

Approved Cinzel/Inter declarations existed in the component pages but no font-face loading existed at the shared entry point. Official Google Fonts metadata confirms normal Cinzel variable weight 400–900 and Inter normal/italic weight 100–900, optical size 14–32; both families carry SIL OFL 1.1. Primary checked resources: https://raw.githubusercontent.com/google/fonts/main/ofl/cinzel/METADATA.pb, https://raw.githubusercontent.com/google/fonts/main/ofl/inter/METADATA.pb and their sibling OFL.txt files. Download provenance and verification follow below.

## Routing observation

Native PowerShell Invoke-RestMethod to official GitHub API returned `Authentication failed, see inner exception`; this is an executed routing failure, not an inferred unavailability. The next direct native download surface is curl.exe; binary font resources stay unmodified and all text/code is written through apply_patch.

Native curl reproduced `schannel: AcquireCredentialsHandle failed: SEC_E_NO_CREDENTIALS (0x8009030e)`. Primary documented class: https://github.com/openai/codex/issues/17459. The same native PowerShell request outside that sandbox succeeded, source revision `1ac2012c34919f5fa2675aacf723fa98edb30b5f`. The direct download then succeeded natively with no intermediary CDN, generated font or format conversion.

## Immutable binary provenance

Pinned base URL: `https://raw.githubusercontent.com/google/fonts/1ac2012c34919f5fa2675aacf723fa98edb30b5f/ofl/`.

| Local path (repository relative) | Exact upstream path | Bytes | SHA256 |
| --- | --- | --- | --- |
| public/fonts/Cinzel-Variable.ttf | cinzel/Cinzel[wght].ttf | 125468 | F4D83D34D1F6C741193E4ACF4B3DFF9531E5A67B6AA65228D00A7DB72A4E0F34 |
| public/fonts/Inter-Variable.ttf | inter/Inter[opsz,wght].ttf | 876576 | 29160A80FF49DDCAB2C97711247E08B1FAB27A484A329CE8B813D820DC559031 |
| public/fonts/Inter-Italic-Variable.ttf | inter/Inter-Italic[opsz,wght].ttf | 906596 | ACD98E64795781B2058F07B18475E0ECEE2A0FE2B42A49E2F9E37D0D6BF66CE6 |

Exact pinned `cinzel/OFL.txt` and `inter/OFL.txt` notices were read from that same revision and written via apply_patch as `public/fonts/Cinzel-OFL.txt` and `public/fonts/Inter-OFL.txt`. Notice metadata disagreement (Inter OFL copyright 2020; font metadata 2016) is preserved as upstream states it. Local notice SHA256 (text writer final newline normalization): Cinzel F2B3029ABA64C378BF0963B62945EEE15E564FE4330B934C8F2EB058282B5E83; Inter 5B9321A4298CFEB6B34354164A1C3AFC3DB114569984C502B9B35D988FD58C57. Unmodified binary SHA is enforced by the wired Node font test, which also parses actual SFNT glyph/variable-axis tables and checks the CSS/entry point/license consumers.

## Implementation boundary

`src/fonts.css` supplies three real self-hosted variable faces, display swap, exact official weight ranges; shared `src/main.jsx` imports it without changing routes or layouts. Existing Cinzel/Inter declarations now resolve to real files. Approved brand artwork files are untouched. The source fonts are intentionally whole, not cherry-picked/subsetted; approximately 1.91 MB across all three files and only requested faces are fetched by browsers.

Theatre uses `sceneCoordinate` on the same Zustand progress as actors/camera/globe, followed by the existing `followNarrativeSequence` seek-before-tick and existing custom driver at R3F priority -100. No competing writer/store/RAF was added. Knowledge stages retain their raw `[.70, .88]` semantic section range unchanged, per explicit root boundary.

Fresh post-edit Node Theatre run: exit 0; 3 tests, 3 pass, 0 fail, including mapped chapter-link .265→.62 and .505→.70 visible material delivery on the same tick and reverse replay. Existing production authored interpolation/cleanup and raw knowledge stage assertions still pass. Browser visual verification remains root-owned, not claimed by these unit checks.

Latest scoped command this session: `node --test tests/fonts.test.mjs tests/theatre-coordination.test.mjs`, exit **0**; **4 tests, 4 pass, 0 fail**, duration 5120.4459 ms. Actual test output:

    approved typography ships real unmodified variable fonts with exact notices and a shared entry point — PASS
    Theatre adapter uses the same measured scene coordinate before its existing driver tick — PASS
    production Theatre track drives its dedicated visible material in both scroll directions — PASS
    knowledge stages derive the semantic range from the shared story coordinate — PASS

Copy register / pending combined gates: repository source fonts/CSS → dist (root's fresh Vite build must verify base-rebased `/hazine/fonts/` URLs and copied fonts/notices); source → GitHub (root's execution commit and SHA equality); GitHub → Pages (root's successful workflow, fresh font HTTP and screenshot/document.fonts observations); source → this disk receipt (read-back/hash and scoped tests passed above). No plugin, standalone skill, account snapshot, approved asset or neutral starter copy is changed by this lane. No commit, push, publication or browser action occurred here. This receipt is bounded implementation evidence, not full four-page/release completion.
