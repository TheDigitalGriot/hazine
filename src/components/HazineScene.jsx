import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Html, Sparkles } from '@react-three/drei'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import ThreeGlobe from 'three-globe'
import { getProject } from '@theatre/core'
import * as THREE from 'three'
import { useExperience } from '../state/experience.js'
import theatreState from '../theatre-state.json'
import { Model as QuarryModel } from '../models/QuarryModel.jsx'
import { Model as MiningTruckModel } from '../models/MiningTruckModel.jsx'
import { Model as CrystalModel } from '../models/CrystalModel.jsx'
import { Model as ThresholdVaultModel } from '../models/ThresholdVaultModel.jsx'
import { Model as TreasuryVaultModel } from '../models/TreasuryVaultModel.jsx'
import { Model as BusinessCallModel } from '../models/BusinessCallModel.jsx'
import { Model as OfficeModel } from '../models/OfficeModel.jsx'
import { Model as OfficeBuildingModel } from '../models/OfficeBuildingModel.jsx'

const project = getProject('Hazine — Living Treasury', { state: theatreState })
export const storySheet = project.sheet('Guided Experience')

const actors = [
  { key: 'threshold', component: ThresholdVaultModel, focus: 0.035, spread: 0.085, scale: 0.13, position: [-1.25, -4.2, 0], rotation: [0, 0.7, 0] },
  { key: 'vault', component: TreasuryVaultModel, focus: 0.14, spread: 0.11, scale: 0.34, position: [0, -0.78, 0], rotation: [0, 0, 0], passage: true },
  { key: 'office', component: OfficeModel, focus: 0.265, spread: 0.072, scale: 0.42, position: [-1.15, -0.16, 0.05], rotation: [0, -0.06, 0], hide: ['Background'] },
  { key: 'caller', component: BusinessCallModel, focus: 0.265, spread: 0.068, scale: 1.62, position: [1.22, -1.08, 0.95], rotation: [0, 2.72, 0] },
  { key: 'building', component: OfficeBuildingModel, focus: 0.345, spread: 0.078, scale: 0.022, position: [-0.58, -2.28, 0.62], rotation: [0, -0.22, 0] },
  { key: 'quarry', component: QuarryModel, focus: 0.505, spread: 0.09, scale: 0.42, position: [1.48, -0.82, 0], rotation: [-0.2, -0.7, 0] },
  { key: 'truck', component: MiningTruckModel, focus: 0.565, spread: 0.075, scale: 0.11, position: [1.45, -2.35, 0], rotation: [0, 0.54, 0], drift: true },
  { key: 'crystal', component: CrystalModel, focus: 0.625, spread: 0.09, scale: 0.55, position: [1.7, -0.62, 0], rotation: [0.05, -0.4, 0], crystal: true },
]

const globePoints = [
  { lat: 43.6532, lng: -79.3832, label: 'Ezgi · Toronto', color: '#79c9b6' },
  { lat: -23.65, lng: -70.4, label: 'Mine corridor · Antofagasta', color: '#d4af37' },
]
const globeArcs = [{ startLat: 43.6532, startLng: -79.3832, endLat: -23.65, endLng: -70.4 }]
const globeRings = [{ lat: -23.65, lng: -70.4, color: '#d4af37' }]

function Loader() {
  return <Html center><div className="scene-loader"><span /> opening the treasury</div></Html>
}

function influenceAt(progress, focus, spread) {
  const raw = Math.max(0, 1 - Math.abs(progress - focus) / spread)
  return raw * raw * (3 - 2 * raw)
}

function ModelActor({ actor }) {
  const group = useRef()
  const progress = useExperience((state) => state.progress)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const Component = actor.component

  useEffect(() => {
    group.current?.traverse((object) => {
      if (!object.isMesh || !object.material) return
      if (actor.hide?.some((fragment) => object.name.includes(fragment))) {
        object.visible = false
        object.userData.hazineExcluded = true
        return
      }
      object.castShadow = true
      object.receiveShadow = true
      const material = object.material.clone()
      material.userData.hazineOpacity = material.opacity
      material.userData.hazineTransparent = material.transparent
      if (actor.crystal) {
        material.color?.set('#e2a13f')
        material.emissive?.set('#c97c24')
        material.emissiveIntensity = 1.9
        material.roughness = 0.24
        material.metalness = 0.12
      }
      object.material = material
    })
  }, [actor.crystal])

  useFrame((state, delta) => {
    if (!group.current) return
    const influence = influenceAt(progress, actor.focus, actor.spread)
    group.current.visible = influence > 0.012
    const targetScale = actor.scale * (0.88 + influence * 0.12)
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 5)
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), ease)
    const drift = actor.drift ? (progress - actor.focus) * 10 : 0
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, actor.position[0] + drift + (1 - influence) * 1.3, ease)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, actor.position[1] - (1 - influence) * 0.22, ease)
    if (!reducedMotion && (actor.crystal || actor.key === 'building')) group.current.rotation.y += delta * (actor.crystal ? 0.12 : 0.018) * influence
    group.current.traverse((object) => {
      if (!object.isMesh || !object.material) return
      if (object.userData.hazineExcluded) return
      const baseOpacity = object.material.userData.hazineOpacity ?? 1
      const opacity = THREE.MathUtils.clamp(baseOpacity * influence * 2.3, 0, baseOpacity)
      object.material.transparent = object.material.userData.hazineTransparent || opacity < 0.999
      object.material.opacity = opacity
      object.material.depthWrite = opacity > 0.74 && baseOpacity > 0.74
    })
  })

  return <group ref={group} position={actor.position} rotation={actor.rotation} scale={actor.scale}><Component /></group>
}

function IntelligenceGlobe() {
  const group = useRef()
  const progress = useExperience((state) => state.progress)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const globe = useMemo(() => new ThreeGlobe()
    .globeImageUrl('/textures/earth-night.jpg')
    .showGraticules(true)
    .showAtmosphere(true)
    .atmosphereColor('#79c9b6')
    .atmosphereAltitude(0.16)
    .pointsData(globePoints)
    .pointColor('color')
    .pointAltitude(0.025)
    .pointRadius(0.42)
    .pointsMerge(true)
    .arcsData(globeArcs)
    .arcColor(() => ['#79c9b6', '#d4af37'])
    .arcStroke(0.36)
    .arcDashLength(0.36)
    .arcDashGap(0.12)
    .arcDashAnimateTime(1450)
    .arcsTransitionDuration(900)
    .ringsData(globeRings)
    .ringColor('color')
    .ringMaxRadius(5)
    .ringPropagationSpeed(1.8)
    .ringRepeatPeriod(1150)
    .labelsData(globePoints)
    .labelText('label')
    .labelColor('color')
    .labelSize(1.05)
    .labelDotRadius(0.32)
    .labelAltitude(0.045), [])

  useFrame((_, delta) => {
    if (!group.current) return
    const influence = influenceAt(progress, 0.435, 0.145)
    group.current.visible = influence > 0.012
    group.current.scale.setScalar(0.019 * (0.84 + influence * 0.16))
    group.current.rotation.y += reducedMotion ? 0 : delta * 0.035 * influence
    group.current.traverse((object) => {
      if (!object.material) return
      object.material.transparent = influence < 0.99
      object.material.opacity = Math.min(1, influence * 1.8)
    })
  })

  return (
    <group ref={group} position={[0.35, 0.1, 0]} rotation={[0.04, -1.15, 0]} scale={0.019}>
      <primitive object={globe} />
    </group>
  )
}

function TreasurySeal() {
  const group = useRef()
  const outer = useRef()
  const inner = useRef()
  const core = useRef()
  const progress = useExperience((state) => state.progress)
  const hovered = useExperience((state) => state.sealHovered)
  const open = useExperience((state) => state.treasuryOpen)
  const reducedMotion = useExperience((state) => state.reducedMotion)

  useFrame((state, delta) => {
    if (!group.current) return
    const influence = influenceAt(progress, 0.15, 0.072)
    const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 6)
    group.current.visible = influence > 0.015
    const scale = 0.58 * (0.72 + influence * 0.28) * (open ? 4.2 : hovered ? 1.12 : 1)
    group.current.scale.lerp(new THREE.Vector3(scale, scale, scale), ease)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -0.02 + Math.sin(state.clock.elapsedTime * 1.1) * (reducedMotion ? 0 : 0.06), ease)
    outer.current.rotation.z += delta * (open ? 2.2 : hovered ? 0.75 : 0.16)
    inner.current.rotation.z -= delta * (open ? 2.8 : hovered ? 0.95 : 0.22)
    core.current.rotation.x += delta * 0.16
    core.current.rotation.y += delta * 0.22
  })

  return (
    <group ref={group} position={[0, -0.02, -6.35]}>
      <mesh ref={outer}><torusGeometry args={[0.86, 0.035, 18, 96]} /><meshStandardMaterial color="#d4af37" emissive="#b8860b" emissiveIntensity={1.1} metalness={0.86} roughness={0.22} /></mesh>
      <mesh ref={inner}><torusGeometry args={[0.63, 0.022, 14, 72]} /><meshStandardMaterial color="#79c9b6" emissive="#2f7a65" emissiveIntensity={0.75} metalness={0.74} roughness={0.28} /></mesh>
      <mesh ref={core}><dodecahedronGeometry args={[0.34, 1]} /><meshPhysicalMaterial color="#dcb15d" emissive="#8f5c19" emissiveIntensity={1.05} transmission={0.18} thickness={0.7} roughness={0.2} metalness={0.45} /></mesh>
      <pointLight color="#d4af37" intensity={hovered || open ? 10 : 4} distance={5} />
    </group>
  )
}

const vaultLocalPoints = [
  new THREE.Vector3(0, 2.45, 12), new THREE.Vector3(0, 2.42, 5), new THREE.Vector3(0, 2.38, -2.4),
  new THREE.Vector3(0, 2.34, -5.5), new THREE.Vector3(0, 2.22, -11.5), new THREE.Vector3(0, 2.05, -18.4),
]
const vaultTransform = new THREE.Matrix4().compose(new THREE.Vector3(0, -0.78, 0), new THREE.Quaternion(), new THREE.Vector3(0.34, 0.34, 0.34))
const vaultCameraCurve = new THREE.CatmullRomCurve3(vaultLocalPoints.map((point) => point.clone().applyMatrix4(vaultTransform)), false, 'catmullrom', 0.18)
const cameraKeys = [
  { p: 0, position: [0, 1.3, 8.6], look: [-0.5, -0.7, 0] },
  { p: 0.22, position: [0, 0.7, 6.8], look: [0, -0.4, 0] },
  { p: 0.255, position: [-0.1, 0.65, 7.4], look: [0.8, -0.2, 0] },
  { p: 0.31, position: [0.55, 0.35, 5.6], look: [1.0, -0.22, 0.3] },
  { p: 0.365, position: [-0.45, 2.7, 7.6], look: [0.1, 1.15, 0] },
  { p: 0.405, position: [0, 1.0, 7.4], look: [0, 0.15, 0] },
  { p: 0.47, position: [0.3, 0.55, 8.0], look: [0.3, 0, 0] },
  { p: 0.55, position: [0.7, 1.15, 7.0], look: [0.7, -0.45, 0] },
  { p: 0.64, position: [0, 0.8, 6.2], look: [0.7, -0.45, 0] },
  { p: 0.76, position: [0, 1.0, 7.2], look: [0, -0.25, 0] },
  { p: 1, position: [0, 1.2, 8.4], look: [0, -0.3, 0] },
].map((key) => ({ ...key, position: new THREE.Vector3(...key.position), look: new THREE.Vector3(...key.look) }))

function smoothstep(edge0, edge1, value) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function sampleCamera(progress, position, look) {
  let nextIndex = cameraKeys.findIndex((key) => key.p >= progress)
  if (nextIndex <= 0) nextIndex = 1
  const from = cameraKeys[nextIndex - 1]
  const to = cameraKeys[Math.min(nextIndex, cameraKeys.length - 1)]
  const t = smoothstep(from.p, to.p, progress)
  position.lerpVectors(from.position, to.position, t)
  look.lerpVectors(from.look, to.look, t)
}

function CameraRig() {
  const progress = useExperience((state) => state.progress)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])
  const vaultTarget = useMemo(() => new THREE.Vector3(), [])
  const vaultLook = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    sampleCamera(progress, target, lookAt)
    const vaultStart = 0.055
    const vaultEnd = 0.198
    if (progress >= vaultStart - 0.025 && progress <= vaultEnd + 0.025) {
      const vaultT = THREE.MathUtils.clamp((progress - vaultStart) / (vaultEnd - vaultStart), 0, 1)
      vaultCameraCurve.getPoint(vaultT, vaultTarget)
      vaultCameraCurve.getPoint(Math.min(1, vaultT + 0.055), vaultLook)
      const enterBlend = smoothstep(vaultStart - 0.025, vaultStart + 0.01, progress)
      const exitBlend = 1 - smoothstep(vaultEnd - 0.008, vaultEnd + 0.018, progress)
      const vaultBlend = Math.min(enterBlend, exitBlend)
      target.lerp(vaultTarget, vaultBlend)
      lookAt.lerp(vaultLook, vaultBlend)
    }
    target.x += reducedMotion ? 0 : state.pointer.x * 0.16
    target.y += reducedMotion ? 0 : state.pointer.y * 0.09
    camera.position.lerp(target, reducedMotion ? 1 : 1 - Math.exp(-delta * 2.7))
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
    const officeLight = influenceAt(progress, 0.31, 0.14)
    keyLight.current.intensity = 7 + officeLight * 10 + Math.sin(progress * Math.PI) * 6
    keyLight.current.color.set(officeLight > 0.25 ? '#f5e4bf' : progress > 0.42 ? '#f2b95d' : '#8ed9ce')
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

function World() {
  const reducedMotion = useExperience((state) => state.reducedMotion)
  return (
    <>
      <color attach="background" args={['#07120f']} />
      <fog attach="fog" args={['#07120f', 6.5, 19]} />
      <CameraRig />
      <TreasuryLight />
      <group>{actors.map((actor) => <ModelActor actor={actor} key={actor.key} />)}</group>
      <TreasurySeal />
      <IntelligenceGlobe />
      {!reducedMotion && <Sparkles count={64} scale={[10, 6, 7]} size={1.1} speed={0.16} color="#e8b66a" opacity={0.5} />}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]} receiveShadow><planeGeometry args={[30, 30]} /><meshStandardMaterial color="#06100d" roughness={0.88} metalness={0.15} /></mesh>
      {!reducedMotion && <EffectComposer multisampling={0}><Bloom luminanceThreshold={0.72} luminanceSmoothing={0.42} intensity={0.7} mipmapBlur /><Vignette eskil={false} offset={0.14} darkness={0.68} /><Noise opacity={0.02} /></EffectComposer>}
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
      <Canvas camera={{ position: [0, 1.3, 8.6], fov: 38, near: 0.035, far: 180 }} dpr={dpr} shadows={THREE.PCFShadowMap} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <Suspense fallback={<Loader />}><World /></Suspense>
      </Canvas>
    </div>
  )
}
