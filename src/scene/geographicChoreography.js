import { smoothstep } from './sceneProfiles.js'

export const globeInfluence = (progress) => smoothstep(.368, .386, progress) * (1 - smoothstep(.465, .485, progress))
export const geographicTravel = (progress) => smoothstep(.405, .448, progress)

/** ThreeGlobe owns lat/lng projection; this owns the story orientation only. */
export function orientGeography(globe, geography, cameraPosition, node, scratch, progress) {
  const origin = globe.getCoords(geography.origin.lat, geography.origin.lng)
  const corridor = globe.getCoords(geography.corridor.lat, geography.corridor.lng)
  scratch.origin.set(origin.x, origin.y, origin.z).normalize()
  scratch.corridor.set(corridor.x, corridor.y, corridor.z).normalize()
  scratch.direction.copy(cameraPosition).sub(node.position).normalize()
  scratch.from.setFromUnitVectors(scratch.origin, scratch.direction)
  scratch.to.setFromUnitVectors(scratch.corridor, scratch.direction)
  node.quaternion.slerpQuaternions(scratch.from, scratch.to, geographicTravel(progress))
}
