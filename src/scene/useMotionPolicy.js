import { useExperience } from '../state/experience.js'

export function useMotionPolicy() {
  const reduced = useExperience((state) => state.reducedMotion)
  return {
    reduced,
    decorative: !reduced,
    damping: reduced ? Number.POSITIVE_INFINITY : 5,
    cameraDamping: reduced ? Number.POSITIVE_INFINITY : 2.7,
  }
}

export function frameEase(delta, damping, reduced) {
  return reduced ? 1 : 1 - Math.exp(-delta * damping)
}

