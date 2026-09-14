import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import ThreeGlobe from 'three-globe'
import { assetUrl } from '../lib/assetUrl.js'
import { momentById } from '../data/liveMeeting.js'
import { useExperience } from '../state/experience.js'
import { smoothstep, trapezoidEnvelope } from './sceneProfiles.js'

const taxonomyColors = {
  FACT: '#2f7a65',
  SIGNAL: '#d4af37',
  INTERPRETATION: '#65b9a6',
  HYPOTHESIS: '#a77dc2',
  STRATEGY: '#e09164',
}

function geographyData(moment) {
  const { origin, corridor } = moment.geography
  const accent = taxonomyColors[moment.taxonomy] ?? '#d4af37'
  return {
    points: [
      { ...origin, color: '#79c9b6' },
      { ...corridor, color: accent },
    ],
    arcs: [{ startLat: origin.lat, startLng: origin.lng, endLat: corridor.lat, endLng: corridor.lng }],
    rings: [{ ...corridor, color: accent }],
  }
}

export function IntelligenceGlobe() {
  const group = useRef(null)
  const selectedMomentId = useExperience((state) => state.selectedMomentId)
  const globe = useMemo(() => new ThreeGlobe()
    .globeImageUrl(assetUrl('/textures/earth-night.jpg'))
    .showGraticules(true)
    .showAtmosphere(true)
    .atmosphereColor('#79c9b6')
    .atmosphereAltitude(0.16)
    .pointColor('color')
    .pointAltitude(0.025)
    .pointRadius(0.42)
    .pointsMerge(true)
    .arcColor(() => ['#79c9b6', '#d4af37'])
    .arcStroke(0.36)
    .arcDashLength(0.36)
    .arcDashGap(0.12)
    .arcDashAnimateTime(1450)
    .arcsTransitionDuration(900)
    .ringColor('color')
    .ringMaxRadius(5)
    .ringPropagationSpeed(1.8)
    .ringRepeatPeriod(1150)
    .labelText('label')
    .labelColor('color')
    .labelSize(1.05)
    .labelDotRadius(0.32)
    .labelAltitude(0.045), [])

  useEffect(() => {
    const data = geographyData(momentById(selectedMomentId))
    globe.pointsData(data.points).arcsData(data.arcs).ringsData(data.rings).labelsData(data.points)
  }, [globe, selectedMomentId])

  useFrame((_, delta) => {
    const node = group.current
    if (!node) return
    const { progress, reducedMotion } = useExperience.getState()
    // A deliberate leader/follower handoff: globe only reaches full presence
    // after the office-building context has released the frame.
    const leaderReleased = smoothstep(0.35, 0.39, progress)
    const influence = trapezoidEnvelope(progress, 0.445, 0.145, 0.22) * leaderReleased
    node.visible = influence > 0.012
    node.scale.setScalar(0.019 * (0.84 + influence * 0.16))
    if (!reducedMotion) node.rotation.y += delta * 0.035 * influence
  })

  return (
    <group ref={group} position={[0.35, 0.1, 0]} rotation={[0.04, -1.15, 0]} scale={0.019}>
      <primitive object={globe} />
    </group>
  )
}

