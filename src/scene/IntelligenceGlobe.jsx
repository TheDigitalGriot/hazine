import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import ThreeGlobe from 'three-globe'
import * as THREE from 'three'
import { assetUrl } from '../lib/assetUrl.js'
import { momentById } from '../data/liveMeeting.js'
import { useExperience } from '../state/experience.js'
import { globeInfluence, orientGeography } from './geographicChoreography.js'
import { sceneCoordinate } from './sceneCoordinate.js'

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
  const globe = useMemo(() => new ThreeGlobe({ animateIn: false })
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
    .arcDashAnimateTime(0)
    .arcsTransitionDuration(0)
    .ringColor('color')
    .ringMaxRadius(5)
    .ringPropagationSpeed(1.8)
    .ringRepeatPeriod(0)
    .labelText('label')
    .labelColor('color')
    .labelSize(1.05)
    .labelDotRadius(0.32)
    .labelAltitude(0.045)
    .labelsTransitionDuration(0), [])
  const orientation = useMemo(() => ({ from: new THREE.Quaternion(), to: new THREE.Quaternion(), direction: new THREE.Vector3(), origin: new THREE.Vector3(), corridor: new THREE.Vector3() }), [])

  useEffect(() => {
    const data = geographyData(momentById(selectedMomentId))
    globe.pointsData(data.points).arcsData(data.arcs).ringsData(data.rings).labelsData(data.points)
  }, [globe, selectedMomentId])

  useFrame(({ camera }) => {
    const node = group.current
    if (!node) return
    const progress = sceneCoordinate(useExperience.getState().progress)
    // A deliberate leader/follower handoff: globe only reaches full presence
    // after the office-building context has released the frame.
    const influence = globeInfluence(progress)
    node.visible = influence > 0.012
    node.scale.setScalar(1.9 / globe.getGlobeRadius())
    orientGeography(globe, momentById(useExperience.getState().selectedMomentId).geography, camera.position, node, orientation, progress)
    globe.setPointOfView(camera)
  })

  return (
    <group ref={group} position={[0.35, 0.1, 0]} scale={0.019}>
      <primitive object={globe} />
    </group>
  )
}

