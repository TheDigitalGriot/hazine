// A spatial coordinate derived from GSAP's ONE normalized story clock.
// DOM sections have unequal authored heights; chapter-link positions therefore
// must map to scene reading poses, not arbitrary global focus percentages.
export const sceneReadingPoses = [0, .055, .265, .395, .505, .625, .71, .76, .87, .97]
const measuredDesktopOffsets = [0,1098,2808,3906,5004,6102,7200,8298,9783,11304]
let anchors = [...measuredDesktopOffsets.map((top, index) => ({ raw: top / 11502, scene: sceneReadingPoses[index] })), { raw: 1, scene: 1 }]

export function refreshSceneAnchors(root = document) {
  const experience = root.querySelector('.experience')
  const sections = [...root.querySelectorAll('.story-section')]
  if (!experience || sections.length !== sceneReadingPoses.length) return
  const range = Math.max(1, experience.offsetHeight - window.innerHeight)
  anchors = [...sections.map((section, index) => ({ raw: (section.offsetTop - experience.offsetTop) / range, scene: sceneReadingPoses[index] })), { raw: 1, scene: 1 }]
}

export function sceneCoordinate(rawProgress, knots = anchors) {
  const p = Math.max(0, Math.min(1, rawProgress))
  let index = 1
  while (index < knots.length - 1 && knots[index].raw < p) index++
  const from = knots[index - 1], to = knots[index]
  const t = Math.max(0, Math.min(1, (p - from.raw) / Math.max(1e-9, to.raw - from.raw)))
  return from.scene + (to.scene - from.scene) * t
}

export function sceneAnchorSnapshot() { return anchors.map((anchor) => ({ ...anchor })) }
