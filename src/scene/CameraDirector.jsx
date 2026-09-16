import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useExperience } from '../state/experience.js'
import { profileForViewport, smoothstep } from './sceneProfiles.js'
import { sceneCoordinate } from './sceneCoordinate.js'

function sampleCamera(keys, progress, position, look) {
  let nextIndex = 1
  while (nextIndex < keys.length - 1 && keys[nextIndex].p < progress) nextIndex += 1
  const from = keys[nextIndex - 1]
  const to = keys[nextIndex]
  const t = smoothstep(from.p, to.p, progress)
  position.lerpVectors(from.position, to.position, t)
  look.lerpVectors(from.look, to.look, t)
}

/** The only owner of camera position, target and FOV in the experience. */
export function CameraDirector() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)
  const profile = profileForViewport(size.width, size.height)
  const target = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])
  const vaultTarget = useMemo(() => new THREE.Vector3(), [])
  const vaultLook = useMemo(() => new THREE.Vector3(), [])

  useEffect(() => {
    camera.fov = profile.fov
    camera.updateProjectionMatrix()
  }, [camera, profile])

  useFrame((state, delta) => {
    const { reducedMotion } = useExperience.getState()
    const progress = sceneCoordinate(useExperience.getState().progress)
    sampleCamera(profile.cameraKeys, progress, target, lookAt)

    const [vaultStart, vaultEnd] = profile.vaultWindow
    if (progress >= vaultStart - 0.025 && progress <= vaultEnd + 0.025) {
      const vaultT = THREE.MathUtils.clamp((progress - vaultStart) / (vaultEnd - vaultStart), 0, 1)
      profile.vaultCurve.getPoint(vaultT, vaultTarget)
      profile.vaultCurve.getPoint(Math.min(1, vaultT + 0.05), vaultLook)
      const entry = smoothstep(vaultStart - 0.025, vaultStart + 0.008, progress)
      const exit = 1 - smoothstep(vaultEnd - 0.008, vaultEnd + 0.02, progress)
      const blend = Math.min(entry, exit)
      target.lerp(vaultTarget, blend)
      lookAt.lerp(vaultLook, blend)
    }

    if (!reducedMotion) {
      target.x += state.pointer.x * profile.pointer[0]
      target.y += state.pointer.y * profile.pointer[1]
    }

    // Actor placement owns the scene offset. Camera never cancels it by
    // applying the same displacement again, and replay does not depend on lag.
    camera.position.copy(target)
    camera.lookAt(lookAt)
  })

  return null
}
