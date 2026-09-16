import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createRafDriver } from '@theatre/core'
import { useExperience } from '../state/experience.js'
import { sceneCoordinate } from './sceneCoordinate.js'
import { bindSemanticHaloMaterial, createSemanticHalo, followNarrativeSequence } from './theatreHalo.js'

const theatreDriver = createRafDriver({ name: 'Hazine R3F frame driver' })

/**
 * Scroll remains canonical. Theatre owns only the dedicated semantic halo's
 * material opacity; camera/actor transforms remain with their R3F directors.
 * Core 0.7.2 is used directly to preserve React 19 / Fiber 9 compatibility.
 */
export function TheatreSequenceAdapter({ sheet, duration = 8, haloPosition = [0, 0, -1.25], haloRadius = 1.65, haloColor = '#79c9b6' }) {
  const material = useRef(null)
  const halo = useMemo(() => sheet ? createSemanticHalo(sheet) : null, [sheet])

  useEffect(() => {
    if (!halo || !material.current) return undefined
    return bindSemanticHaloMaterial(halo, material.current, theatreDriver)
  }, [halo])

  useFrame(() => {
    if (!sheet?.sequence) return
    const progress = sceneCoordinate(useExperience.getState().progress)
    followNarrativeSequence(sheet, theatreDriver, progress, duration, performance.now())
  }, -100)

  if (!halo) return null
  return (
    <mesh name="Semantic reveal halo" position={haloPosition} renderOrder={-1}>
      <torusGeometry args={[haloRadius, 0.022, 8, 128]} />
      <meshBasicMaterial ref={material} color={haloColor} transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}
