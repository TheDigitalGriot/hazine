import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { actors } from '../config/experienceManifest.js'
import { useExperience } from '../state/experience.js'
import { modelGroup } from '../lib/assetManifest.js'
import { prepareActorMaterials, releaseActorMaterials, setActorMaterialInfluence } from './materialLifecycle.js'
import { actorLayout, profileForViewport, smoothstep, trapezoidEnvelope } from './sceneProfiles.js'
import { callerFloorPosition, callerScale, measuredTerrainRoute, routeProgress, sampleTerrainRoute, spatialFrames, TRUCK_CALIBRATION } from './spatialCalibration.js'
import { refreshSceneAnchors, sceneCoordinate } from './sceneCoordinate.js'

const modelByKey = {
  threshold: lazy(() => import('../models/ThresholdVaultModel.jsx').then(({ Model }) => ({ default: Model }))),
  vault: lazy(() => import('../models/TreasuryVaultModel.jsx').then(({ Model }) => ({ default: Model }))),
  office: lazy(() => import('../models/OfficeModel.jsx').then(({ Model }) => ({ default: Model }))),
  caller: lazy(() => import('../models/BusinessCallModel.jsx').then(({ Model }) => ({ default: Model }))),
  building: lazy(() => import('../models/OfficeBuildingModel.jsx').then(({ Model }) => ({ default: Model }))),
  quarry: lazy(() => import('../models/QuarryModel.jsx').then(({ Model }) => ({ default: Model }))),
  truck: lazy(() => import('../models/MiningTruckModel.jsx').then(({ Model }) => ({ default: Model }))),
  crystal: lazy(() => import('../models/CrystalModel.jsx').then(({ Model }) => ({ default: Model }))),
}

const groupHorizon = { threshold: 0, meeting: 1, geography: 2, knowledge: 5 }

export function actorInfluence(actor, progress) {
  let influence = trapezoidEnvelope(progress, actor.focus, actor.spread)

  // The building establishes place, then explicitly hands the frame to the
  // globe rather than competing with it through the geographic reveal.
  if (actor.key === 'building') influence *= 1 - smoothstep(0.355, 0.366, progress)
  if (actor.terrainRoute) influence *= smoothstep(.495, .515, progress)
  return influence
}

function ModelActor({ actor, mobile, terrainRef }) {
  const group = useRef(null)
  const materialHandles = useRef([])
  const layout = useMemo(() => actorLayout(actor, mobile), [actor, mobile])
  const Component = modelByKey[actor.key]

  useEffect(() => {
    if (!group.current) return undefined
    materialHandles.current = prepareActorMaterials(group.current, actor)
    if (actor.key === 'quarry') terrainRef.current = group.current
    return () => {
      releaseActorMaterials(materialHandles.current)
      materialHandles.current = []
    }
  }, [actor])

  useFrame(() => {
    const node = group.current
    if (!node) return

    const progress = sceneCoordinate(useExperience.getState().progress)
    const influence = actorInfluence(actor, progress)
    node.visible = influence > 0.012
    // Calibrated children never slide or shrink independently of their frame.
    node.scale.setScalar(actor.key === 'caller' ? callerScale : layout.scale)
    node.position.fromArray(actor.key === 'caller' ? callerFloorPosition : layout.position)
    node.rotation.fromArray(layout.rotation)
    if (actor.crystal) node.rotation.y = layout.rotation[1] + smoothstep(.54, .71, progress) * .6
    if (actor.terrainRoute) {
      sampleTerrainRoute(measuredTerrainRoute, routeProgress(progress), node.position, node.quaternion)
    }

    setActorMaterialInfluence(materialHandles.current, influence)
  })

  return (
    <group ref={group} position={layout.position} rotation={layout.rotation} scale={layout.scale}>
      {actor.terrainRoute ? <group position={[-TRUCK_CALIBRATION.centerX, 0, -TRUCK_CALIBRATION.centerZ]}><Component /></group> : <Component />}
    </group>
  )
}

export function ActorDirector() {
  const size = useThree((state) => state.size)
  const chapter = useExperience((state) => state.chapter)
  const profile = profileForViewport(size.width, size.height)
  const mobile = profile.name === 'mobile'
  const [loadedGroups, setLoadedGroups] = useState(() => new Set(['threshold']))
  const terrainRef = useRef(null)
  useEffect(() => {
    const refresh = () => refreshSceneAnchors()
    refresh()
    const root = document.querySelector('.experience')
    const observer = new ResizeObserver(refresh)
    if (root) observer.observe(root)
    window.addEventListener('resize', refresh)
    return () => { observer.disconnect(); window.removeEventListener('resize', refresh) }
  }, [])

  useEffect(() => {
    setLoadedGroups((current) => {
      const next = new Set(current)
      Object.entries(groupHorizon).forEach(([group, horizon]) => {
        if (chapter >= horizon) next.add(group)
      })
      return next.size === current.size ? current : next
    })
  }, [chapter])

  const available = actors.filter((actor) => loadedGroups.has(modelGroup(actor.key)))
  const renderActor = (actor) => (
    <Suspense fallback={null} key={actor.key}>
      <ModelActor actor={actor} mobile={mobile} terrainRef={terrainRef} />
    </Suspense>
  )
  return (
    <group position-x={profile.sceneOffsetX}>
      {available.filter((actor) => !actor.frame).map(renderActor)}
      {Object.entries(spatialFrames).map(([name, frame]) => {
        const layout = mobile ? { ...frame, ...frame.mobile } : frame
        return <group key={name} name={`${name}-calibrated-frame`} position={layout.position} rotation={layout.rotation} scale={layout.scale}>
          <group position={frame.origin ?? [0, 0, 0]}>
            {available.filter((actor) => actor.frame === name).map(renderActor)}
          </group>
        </group>
      })}
    </group>
  )
}
