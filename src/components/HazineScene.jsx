import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Html, Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { getProject } from '@theatre/core'
import * as THREE from 'three'
import { useExperience } from '../state/experience.js'
import theatreState from '../theatre-state.json'
import { Model as QuarryModel } from '../models/QuarryModel.jsx'
import { Model as MiningTruckModel } from '../models/MiningTruckModel.jsx'
import { Model as CrystalModel } from '../models/CrystalModel.jsx'
import { Model as ThresholdVaultModel } from '../models/ThresholdVaultModel.jsx'
import { Model as TreasuryVaultModel } from '../models/TreasuryVaultModel.jsx'

const project = getProject('Hazine — Living Treasury', { state: theatreState })
export const storySheet = project.sheet('Guided Experience')

const actors = [
  { key: 'quarry', component: QuarryModel, focus: 0.14, spread: 0.19, scale: 0.42, position: [0.8, -0.78, 0], rotation: [-0.2, -0.7, 0] },
  { key: 'truck', component: MiningTruckModel, focus: 0.23, spread: 0.09, scale: 0.11, position: [0, -2.35, 0], rotation: [0, 0.54, 0] },
  { key: 'crystal', component: CrystalModel, focus: 0.34, spread: 0.115, scale: 0.55, position: [1.5, -0.62, 0], rotation: [0.05, -0.4, 0], crystal: true },
  { key: 'threshold', component: ThresholdVaultModel, focus: 0.48, spread: 0.14, scale: 0.11, position: [1.3, -4.05, 0], rotation: [0, 0.75, 0] },
  { key: 'vault', component: TreasuryVaultModel, focus: 0.69, spread: 0.23, scale: 0.22, position: [0.8, -1.05, 2.1], rotation: [0, -0.55, 0] },
]

function Loader() {
  return (
    <Html center>
      <div className="scene-loader"><span /> opening the treasury</div>
    </Html>
  )
}

function ModelActor({ actor }) {
  const group = useRef()
  const progress = useExperience((state) => state.progress)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const Component = actor.component

  useEffect(() => {
    group.current?.traverse((object) => {
      if (!object.isMesh) return
      object.castShadow = true
      object.receiveShadow = true
      if (actor.crystal) {
        const material = object.material.clone()
        material.color?.set('#e2a13f')
        material.emissive?.set('#c97c24')
        material.emissiveIntensity = 1.9
        material.roughness = 0.24
        material.metalness = 0.12
        object.material = material
      } else if (object.material) {
        object.material = object.material.clone()
      }
    })
  }, [actor.crystal])

  useFrame((state, delta) => {
    if (!group.current) return
    const distance = Math.abs(progress - actor.focus)
    const raw = Math.max(0, 1 - distance / actor.spread)
    const influence = raw * raw * (3 - 2 * raw)
    group.current.visible = influence > 0.018
    const targetScale = actor.scale * (0.82 + influence * 0.18)
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 5)
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), ease)
    const drift = actor.key === 'truck' ? (progress - actor.focus) * 11 : 0
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, actor.position[0] + drift + (1 - influence) * 2.2, ease)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, actor.position[1] - (1 - influence) * 0.3, ease)
    group.current.rotation.y += reducedMotion ? 0 : delta * (actor.crystal ? 0.16 : 0.035) * influence
    group.current.traverse((object) => {
      if (!object.isMesh || !object.material) return
      object.material.transparent = influence < 0.98
      object.material.opacity = influence
      object.material.depthWrite = influence > 0.45
    })
  })

  return (
    <group ref={group} position={actor.position} rotation={actor.rotation} scale={actor.scale}>
      <Component />
    </group>
  )
}

const cameraPoints = [
  new THREE.Vector3(0, 1.2, 8.4),
  new THREE.Vector3(-1.2, 2.7, 7.2),
  new THREE.Vector3(1.9, 0.9, 6.2),
  new THREE.Vector3(-1.4, 1.4, 5.8),
  new THREE.Vector3(0.8, 0.4, 5.1),
  new THREE.Vector3(-0.8, 1.1, 5.9),
  new THREE.Vector3(0, 0.7, 6.6),
]
const cameraCurve = new THREE.CatmullRomCurve3(cameraPoints, false, 'catmullrom', 0.35)

function CameraRig() {
  const progress = useExperience((state) => state.progress)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const t = THREE.MathUtils.clamp(progress, 0, 0.999)
    cameraCurve.getPoint(t, target)
    const pointerX = reducedMotion ? 0 : state.pointer.x * 0.22
    const pointerY = reducedMotion ? 0 : state.pointer.y * 0.12
    target.x += pointerX
    target.y += pointerY
    camera.position.lerp(target, reducedMotion ? 1 : 1 - Math.exp(-delta * 2.4))
    lookAt.set(0, progress > 0.78 ? -0.2 : -0.55, 0)
    camera.lookAt(lookAt)
    storySheet.sequence.position = progress * 8
  })
  return null
}

function TreasuryLight() {
  const progress = useExperience((state) => state.progress)
  const keyLight = useRef()
  useFrame(() => {
    if (!keyLight.current) return
    keyLight.current.intensity = 5 + Math.sin(progress * Math.PI) * 16
    keyLight.current.color.set(progress > 0.27 ? '#f2b95d' : '#8ed9ce')
  })
  return (
    <>
      <ambientLight intensity={0.36} color="#c9d8c7" />
      <directionalLight ref={keyLight} position={[4, 7, 5]} intensity={12} color="#8ed9ce" castShadow />
      <pointLight position={[-4, 1, 2]} intensity={7} color="#db8e3e" />
      <pointLight position={[3, -1, 3]} intensity={5} color="#65b9a6" />
    </>
  )
}

function World() {
  const reducedMotion = useExperience((state) => state.reducedMotion)
  return (
    <>
      <color attach="background" args={['#07120f']} />
      <fog attach="fog" args={['#07120f', 5.7, 14]} />
      <CameraRig />
      <TreasuryLight />
      <group>
        {actors.map((actor) => <ModelActor actor={actor} key={actor.key} />)}
      </group>
      {!reducedMotion && <Sparkles count={52} scale={[9, 5, 5]} size={1.2} speed={0.18} color="#e8b66a" opacity={0.55} />}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#06100d" roughness={0.88} metalness={0.15} />
      </mesh>
      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.7} luminanceSmoothing={0.4} intensity={0.75} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.72} />
          <Noise opacity={0.025} />
        </EffectComposer>
      )}
      <AdaptiveDpr pixelated />
    </>
  )
}

export default function HazineScene() {
  const [dpr, setDpr] = useState([1, 1.65])

  useEffect(() => {
    const lowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    if (lowPower) setDpr([1, 1.25])
  }, [])

  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 1.2, 8.4], fov: 38, near: 0.1, far: 100 }} dpr={dpr} shadows={THREE.PCFShadowMap} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <Suspense fallback={<Loader />}>
          <World />
        </Suspense>
      </Canvas>
    </div>
  )
}
