// Semantic knowledge walkthrough range in the GSAP-owned 0–1 story coordinate.
// Explicit rather than an element-local scroll reader; fixtures can replay it.
export const knowledgeNarrativeRange = [0.7, 0.88]

export function knowledgeStageAtProgress(progress, range = knowledgeNarrativeRange) {
  const local = Math.max(0, Math.min(1, (progress - range[0]) / (range[1] - range[0])))
  return Math.min(3, Math.floor(local * 4))
}
