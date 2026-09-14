import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '../state/experience.js'
import { trapezoidEnvelope } from './sceneProfiles.js'
import { frameEase } from './useMotionPolicy.js'

export function TreasurySeal() {
  const group = useRef(null)
  const outer = useRef(null)
  const inner = useRef(null)
  const core = useRef(null)
  const glow = useRef(null)

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return
    const { progress, sealHovered, treasuryOpen, reducedMotion } = useExperience.getState()
    const influence = trapezoidEnvelope(progress, 0.15, 0.072, 0.34)
    const ease = frameEase(delta, 6, reducedMotion)
    const scale = 0.4 * (0.72 + influence * 0.28) * (treasuryOpen ? 4.2 : sealHovered ? 1.12 : 1)

    node.visible = influence > 0.015
    node.scale.setScalar(THREE.MathUtils.lerp(node.scale.x, scale, ease))
    const floatY = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.1) * 0.06
    node.position.y = THREE.MathUtils.lerp(node.position.y, -0.02 + floatY, ease)
    if (glow.current) glow.current.intensity = THREE.MathUtils.lerp(glow.current.intensity, sealHovered || treasuryOpen ? 10 : 4, ease)

    if (!reducedMotion) {
      outer.current.rotation.z += delta * (treasuryOpen ? 2.2 : sealHovered ? 0.75 : 0.16)
      inner.current.rotation.z -= delta * (treasuryOpen ? 2.8 : sealHovered ? 0.95 : 0.22)
      core.current.rotation.x += delta * 0.16
      core.current.rotation.y += delta * 0.22
    }
  })

  return (
    <group ref={group} position={[0, -0.02, -6.35]}>
      <mesh ref={outer}><torusGeometry args={[0.86, 0.035, 18, 96]} /><meshStandardMaterial color="#d4af37" emissive="#b8860b" emissiveIntensity={1.1} metalness={0.86} roughness={0.22} /></mesh>
      <mesh ref={inner}><torusGeometry args={[0.63, 0.022, 14, 72]} /><meshStandardMaterial color="#79c9b6" emissive="#2f7a65" emissiveIntensity={0.75} metalness={0.74} roughness={0.28} /></mesh>
      <mesh ref={core}><dodecahedronGeometry args={[0.34, 1]} /><meshPhysicalMaterial color="#dcb15d" emissive="#8f5c19" emissiveIntensity={1.05} transmission={0.18} thickness={0.7} roughness={0.2} metalness={0.45} /></mesh>
      <pointLight ref={glow} color="#d4af37" intensity={4} distance={5} />
    </group>
  )
}
