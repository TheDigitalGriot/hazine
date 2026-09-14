import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '../state/experience.js'
import { trapezoidEnvelope } from './sceneProfiles.js'

export function TreasuryLight() {
  const keyLight = useRef(null)
  const colors = useMemo(() => ({
    cool: new THREE.Color('#8ed9ce'),
    office: new THREE.Color('#f5e4bf'),
    earth: new THREE.Color('#f2b95d'),
  }), [])

  useFrame(() => {
    if (!keyLight.current) return
    const { progress } = useExperience.getState()
    const officeLight = trapezoidEnvelope(progress, 0.31, 0.14, 0.2)
    keyLight.current.intensity = 7 + officeLight * 10 + Math.sin(progress * Math.PI) * 6
    keyLight.current.color.copy(officeLight > 0.25 ? colors.office : progress > 0.42 ? colors.earth : colors.cool)
  })

  return (
    <>
      <ambientLight intensity={0.52} color="#d7dfd2" />
      <directionalLight ref={keyLight} position={[4, 7, 5]} intensity={12} color="#8ed9ce" castShadow />
      <pointLight position={[-4, 1, 2]} intensity={7} color="#db8e3e" />
      <pointLight position={[3, -1, 3]} intensity={5} color="#65b9a6" />
      <pointLight position={[0, 1.9, -3.6]} intensity={9} distance={9} color="#e2b55d" />
      <pointLight position={[0, 1.2, -6.2]} intensity={7} distance={8} color="#6bd1ba" />
    </>
  )
}

