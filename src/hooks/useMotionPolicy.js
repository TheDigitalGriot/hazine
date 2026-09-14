import { useEffect, useMemo, useState } from 'react'
import { useExperience } from '../state/experience.js'

export function useMotionPolicy() {
  const [reduced, setReduced] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ))
  const setReducedMotion = useExperience((state) => state.setReducedMotion)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setReduced(media.matches)
      setReducedMotion(media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [setReducedMotion])

  return useMemo(() => ({
    reduced,
    scrollBehavior: reduced ? 'auto' : 'smooth',
    duration: (normal) => reduced ? 0 : normal,
    allowDecorative: !reduced,
    allowParallax: !reduced,
    allowSpatialTravel: !reduced,
  }), [reduced])
}
