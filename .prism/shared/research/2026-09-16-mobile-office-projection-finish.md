# Mobile office projection finish — 2026-09-16

Status: numerical gates PASS; fresh root browser acceptance of the final rotated view is PENDING. This is not a release claim.

## Observed defect and measured cause

Root's 390×844 mobile screenshot used an actual 375×844 Canvas. Before correction, actual generated post-hide office vertices projected x-167.19..476.83,y262.10..629.55, while Ezgi projected x101.04..124.38,y391.13..468.95. The available scene stage was above the transcript, so the composition sat outside it.

The first shared-frame fit made the room visible, but `mobile-office-corrected.png` still did not make Ezgi discernible. Actual triangle ray tests explained the visual observation: with the prior mobile office rotation-.22, all20/20 sampled rays that hit caller geometry encountered `Minimalistic_Modern_Office_Glass_0` first. Rotation-.6 was also invalid:20/20 rays were blocked by `Minimalistic_Modern_Office_Structure_0`. No transform was accepted from projection bounds alone.

## Measured correction

Only the mobile override of the existing shared office frame changed:

- position[-.7,1.3,-.3]
- rotation[0,-1,0]
- scale.25

Desktop office position[-2.65,-.16,-.3], rotation[0,-.22,0], scale.62 is unchanged. Caller local position,1.7m native height scale and exact observed floor contact remain unchanged, so the office/person relationship and grounding are still one transform. Mobile camera keys and the vault curve were not edited.

At scene .265 and375×844, actual generated vertices now project:

- office x-3.01..374.83,y195.36..357.98; modest3px edge crop
- caller x200.91..214.38,y269.14..315.85; height46.72px

At375×667, the caller remains36.92px tall rather than collapsing to the rejected~21px fit. Fixtures cover scene .255,.265,.285 at both heights. Every fixture keeps the caller within the relative stage and at least36px tall.

## Actual triangle visibility

Each fixture casts a5×7 screen grid, counts rays that hit actual caller triangles, and then raycasts the post-hide office to the caller-hit distance. Each fixture produced18 caller-hit rays and17 unobstructed rays (94.44%). The only residual blocked ray is the bottom sample at pixel202.26,312.52 in the844px fixture, where `Minimalistic_Modern_Office_Table_0` is closer than the caller. This is a measured minor lower-body/table relationship; it is not a wall/glass/body occlusion. The prior state was0/20 unobstructed.

All full results, including pixel coordinates, distances, blocker names and actual projection bounds, are saved in `2026-09-15-mobile-office-projection.json`. The source observation remains `2026-09-15-mobile-office-OBSERVATION.md`.

## Scope and acceptance

No CSS, page, mapper, Theatre, desktop camera, desktop office transform, quarry route, asset or vault-door routing was changed in this mobile correction. Root owns the final browser screenshot and must verify that Ezgi is visually discernible in the textured composition; numerical visibility alone is not presented as visual acceptance.

Fresh bounded test evidence: `node --test tests/sceneProfiles.test.mjs tests/spatialCalibration.test.mjs` completed exit0 on2026-09-16:10 tests /10 pass /0 fail /15527.6748ms. This run refreshed both mobile projection and exact terrain replay JSON evidence after scoped write permission was restored.
