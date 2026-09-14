import * as THREE from 'three'
import { safeZones } from '../config/experienceManifest.js'

export const MOBILE_BREAKPOINT = safeZones.mobile.maxWidth

export function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) return value < edge0 ? 0 : 1
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/** A smooth trapezoid: attack, a stable reading window, then release. */
export function trapezoidEnvelope(progress, focus, spread, plateauRatio = 0.3) {
  const halfPlateau = spread * plateauRatio
  const attackStart = focus - spread
  const attackEnd = focus - halfPlateau
  const releaseStart = focus + halfPlateau
  const releaseEnd = focus + spread

  if (progress <= attackStart || progress >= releaseEnd) return 0
  if (progress < attackEnd) return smoothstep(attackStart, attackEnd, progress)
  if (progress <= releaseStart) return 1
  return 1 - smoothstep(releaseStart, releaseEnd, progress)
}

function key(p, position, look) {
  return { p, position: new THREE.Vector3(...position), look: new THREE.Vector3(...look) }
}

const desktopKeys = [
  key(0, [0, 1.3, 8.6], [-0.5, -0.7, 0]),
  key(0.22, [0, 0.7, 6.8], [0, -0.4, 0]),
  key(0.255, [-0.1, 0.65, 7.4], [0.7, -0.2, 0]),
  key(0.31, [0.5, 0.35, 5.8], [0.9, -0.25, 0.25]),
  key(0.365, [-0.42, 2.65, 7.6], [0.1, 1.1, 0]),
  key(0.405, [0, 1, 7.4], [0, 0.15, 0]),
  key(0.47, [0.25, 0.55, 8], [0.3, 0, 0]),
  key(0.55, [0.7, 1.15, 7], [0.7, -0.45, 0]),
  key(0.64, [0, 0.8, 6.2], [0.7, -0.45, 0]),
  key(0.76, [0, 1, 7.2], [0, -0.25, 0]),
  key(1, [0, 1.2, 8.4], [0, -0.3, 0]),
]

const mobileKeys = [
  key(0, [0, 1.55, 10.2], [-0.2, -0.55, 0]),
  key(0.22, [0, 0.9, 8.2], [0, -0.3, 0]),
  key(0.255, [0, 0.8, 8.8], [0.25, -0.15, 0]),
  key(0.31, [0.2, 0.55, 7.7], [0.4, -0.2, 0.2]),
  key(0.365, [-0.2, 2.9, 9.2], [0, 1, 0]),
  key(0.405, [0, 1.2, 9], [0, 0.1, 0]),
  key(0.47, [0.15, 0.8, 9.6], [0.1, 0, 0]),
  key(0.55, [0.3, 1.4, 8.8], [0.35, -0.4, 0]),
  key(0.64, [0, 1.05, 8], [0.35, -0.4, 0]),
  key(0.76, [0, 1.2, 8.8], [0, -0.2, 0]),
  key(1, [0, 1.4, 9.8], [0, -0.25, 0]),
]

const vaultLocalPoints = [
  new THREE.Vector3(0, 2.45, 12),
  new THREE.Vector3(0, 2.42, 5),
  new THREE.Vector3(0, 2.38, -2.4),
  // The inner door is at local z ~= -4.6; these points keep the camera
  // centered in its frame before revealing the second room.
  new THREE.Vector3(0, 2.36, -4.55),
  new THREE.Vector3(0, 2.3, -7.1),
  new THREE.Vector3(0, 2.18, -12.5),
  new THREE.Vector3(0, 2.05, -18.4),
]

function makeVaultCurve(scale) {
  const transform = new THREE.Matrix4().compose(
    new THREE.Vector3(0, -0.78, 0),
    new THREE.Quaternion(),
    new THREE.Vector3(scale, scale, scale),
  )
  const points = vaultLocalPoints.map((point) => point.clone().applyMatrix4(transform))
  return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.14)
}

export const sceneProfiles = {
  desktop: {
    name: 'desktop',
    cameraKeys: desktopKeys,
    fov: 38,
    pointer: [0.16, 0.09],
    vaultCurve: makeVaultCurve(0.34),
    vaultWindow: [0.055, 0.205],
    sceneOffsetX: safeZones.desktop.sceneOffsetX,
  },
  mobile: {
    name: 'mobile',
    cameraKeys: mobileKeys,
    fov: 44,
    pointer: [0.08, 0.05],
    vaultCurve: makeVaultCurve(0.28),
    vaultWindow: [0.055, 0.205],
    sceneOffsetX: safeZones.mobile.sceneOffsetX,
  },
}

export function profileForWidth(width) {
  return width <= MOBILE_BREAKPOINT ? sceneProfiles.mobile : sceneProfiles.desktop
}

export function profileForViewport(width, height) {
  const portrait = height > width * 1.08
  return width <= MOBILE_BREAKPOINT || portrait ? sceneProfiles.mobile : sceneProfiles.desktop
}

export function actorLayout(actor, mobile) {
  if (!mobile || !actor.mobile) return actor
  return {
    ...actor,
    ...actor.mobile,
    position: actor.mobile.position ?? actor.position,
    rotation: actor.mobile.rotation ?? actor.rotation,
  }
}
