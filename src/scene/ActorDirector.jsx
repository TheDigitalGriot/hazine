import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { actors } from '../config/experienceManifest.js'
import { useExperience } from '../state/experience.js'
import { modelGroup } from '../lib/assetManifest.js'
import { prepareActorMaterials, releaseActorMaterials, setActorMaterialInfluence } from './materialLifecycle.js'
import { actorLayout, profileForViewport, smoothstep, trapezoidEnvelope } from './sceneProfiles.js'
import { frameEase } from './useMotionPolicy.js'

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

function actorInfluence(actor, progress) {
  let influence = trapezoidEnvelope(progress, actor.focus, actor.spread)

  // The building establishes place, then explicitly hands the frame to the
  // globe rather than competing with it through the geographic reveal.
  if (actor.key === 'building') influence *= 1 - smoothstep(0.345, 0.39, progress)
  return influence
}

function ModelActor({ actor, mobile }) {
  const group = useRef(null)
  const materialHandles = useRef([])
  const layout = useMemo(() => actorLayout(actor, mobile), [actor, mobile])
  const Component = modelByKey[actor.key]

  useEffect(() => {
    if (!group.current) return undefined
    materialHandles.current = prepareActorMaterials(group.current, actor)
    return () => {
      releaseActorMaterials(materialHandles.current)
      materialHandles.current = []
    }
  }, [actor])

  useFrame((_, delta) => {
    const node = group.current
    if (!node) return

    const { progress, reducedMotion } = useExperience.getState()
    const influence = actorInfluence(actor, progress)
    const ease = frameEase(delta, 5, reducedMotion)
    const targetScale = layout.scale * (0.88 + influence * 0.12)
    const drift = actor.drift ? (progress - actor.focus) * (mobile ? 5.4 : 8.5) : 0

    node.visible = influence > 0.012
    node.scale.setScalar(THREE.MathUtils.lerp(node.scale.x, targetScale, ease))
    node.position.x = THREE.MathUtils.lerp(node.position.x, layout.position[0] + drift + (1 - influence) * (mobile ? 0.55 : 1.15), ease)
    node.position.y = THREE.MathUtils.lerp(node.position.y, layout.position[1] - (1 - influence) * 0.22, ease)
    node.position.z = THREE.MathUtils.lerp(node.position.z, layout.position[2], ease)

    if (!reducedMotion && (actor.crystal || actor.key === 'building')) {
      node.rotation.y += delta * (actor.crystal ? 0.12 : 0.018) * influence
    }

    setActorMaterialInfluence(materialHandles.current, influence)
  })

  return (
    <group ref={group} position={layout.position} rotation={layout.rotation} scale={layout.scale}>
      <Component />
    </group>
  )
}

export function ActorDirector() {
  const size = useThree((state) => state.size)
  const chapter = useExperience((state) => state.chapter)
  const profile = profileForViewport(size.width, size.height)
  const mobile = profile.name === 'mobile'
  const [loadedGroups, setLoadedGroups] = useState(() => new Set(['threshold']))

  useEffect(() => {
    setLoadedGroups((current) => {
      const next = new Set(current)
      Object.entries(groupHorizon).forEach(([group, horizon]) => {
        if (chapter >= horizon) next.add(group)
      })
      return next.size === current.size ? current : next
    })
  }, [chapter])

  return (
    <group position-x={profile.sceneOffsetX}>
      {actors.filter((actor) => loadedGroups.has(modelGroup(actor.key))).map((actor) => (
        <Suspense fallback={null} key={actor.key}>
          <ModelActor actor={actor} mobile={mobile} />
        </Suspense>
      ))}
    </group>
  )
}
