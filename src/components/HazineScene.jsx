import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Html, Sparkles, useProgress } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { getProject } from '@theatre/core'
import * as THREE from 'three'
import theatreState from '../theatre-state.json'
import { useMotionPolicy } from '../scene/useMotionPolicy.js'
import { ActorDirector } from '../scene/ActorDirector.jsx'
import { CameraDirector } from '../scene/CameraDirector.jsx'
import { IntelligenceGlobe } from '../scene/IntelligenceGlobe.jsx'
import { TheatreSequenceAdapter } from '../scene/TheatreSequenceAdapter.jsx'
import { TreasuryLight } from '../scene/TreasuryLight.jsx'
import { TreasurySeal } from '../scene/TreasurySeal.jsx'

const project = getProject('Hazine — Living Treasury', { state: theatreState })
export const storySheet = project.sheet('Guided Experience')

function Loader() {
  const { progress, item } = useProgress()
  return <Html center><div className="scene-loader" role="status"><span /> opening the treasury · {Math.round(progress)}%<small>{item?.split('/').pop()}</small></div></Html>
}

function World() {
  const motion = useMotionPolicy()

  return (
    <>
      <color attach="background" args={['#07120f']} />
      <fog attach="fog" args={['#07120f', 6.5, 19]} />
      <CameraDirector />
      <TheatreSequenceAdapter sheet={storySheet} />
      <TreasuryLight />
      <ActorDirector />
      <TreasurySeal />
      <IntelligenceGlobe />
      {motion.decorative && <Sparkles count={64} scale={[10, 6, 7]} size={1.1} speed={0.16} color="#e8b66a" opacity={0.5} />}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#06100d" roughness={0.88} metalness={0.15} />
      </mesh>
      {motion.decorative && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.72} luminanceSmoothing={0.42} intensity={0.7} mipmapBlur />
          <Vignette eskil={false} offset={0.14} darkness={0.68} />
          <Noise opacity={0.02} />
        </EffectComposer>
      )}
      <AdaptiveDpr pixelated />
    </>
  )
}

export default function HazineScene() {
  const [dpr, setDpr] = useState([1, 1.65])
  const [webgl, setWebgl] = useState(null)

  useEffect(() => {
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    if (lowPower) setDpr([1, 1.25])
    const canvas = document.createElement('canvas')
    setWebgl(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')))
  }, [])

  if (webgl === null) return <div className="scene-shell"><div className="scene-loader"><span /> checking the treasury</div></div>
  if (!webgl) throw new Error('WebGL is unavailable on this device.')

  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 1.3, 8.6], fov: 38, near: 0.035, far: 180 }}
        dpr={dpr}
        shadows={THREE.PCFShadowMap}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<Loader />}><World /></Suspense>
      </Canvas>
    </div>
  )
}
