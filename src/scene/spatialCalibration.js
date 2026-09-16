import * as THREE from 'three'
import { smoothstep } from './sceneProfiles.js'
import measuredRoute from './measuredHaulRoute.json' with { type: 'json' }

export const OFFICE_CALIBRATION = Object.freeze({
  floorY: -1.4484886318552204,
  callerMinY: -0.9517289996147156,
  callerHeight: 1.9032080173492432,
  humanHeight: 1.7,
  windowZ: -4.375179296243172,
})
export const callerScale = OFFICE_CALIBRATION.humanHeight / OFFICE_CALIBRATION.callerHeight
export const callerFloorPosition = [2.1, OFFICE_CALIBRATION.floorY - OFFICE_CALIBRATION.callerMinY * callerScale, -2.8]

export const spatialFrames = {
  // Mobile exposes a top 3D stage above the transcript, not the canvas center.
  // Shared office/caller framing keeps the native human/floor relation intact.
  office: { position: [-2.65, -0.16, -0.3], rotation: [0, -0.22, 0], scale: .62, mobile: { position: [-.7, 1.3, -.3], rotation: [0, -1, 0], scale: .25 } },
  // Actual route vertices project into the central unoccluded reading region.
  // Move the shared frame, never detach the truck from its measured terrain.
  extraction: { position: [-.75, -.05, 0], rotation: [0, -.38, 0], scale: .42, origin: [-2.416, 1.541, -3.733], mobile: { position: [-.8, -.05, 0], scale: .31 } },
}

export const TRUCK_CALIBRATION = Object.freeze({ scale: .017, minY: -.18810986663411988, centerX: -1.756, centerZ: 1.138 })
export const wheelContactPatches = [[-10.553620805709317,-9.69840144150816],[-14.337315750706207,14.210321885185223],[8.195417801627638,-9.735200872312115],[11.333553119260927,14.216440197185468]]
// Actual quarry-native X/Z: upper eastern haul bench into the northern bench.
export const haulRoute = [[6.65, 2.35], [6.55, 3.05], [6.65, 4.1], [6.15, 5.3], [5.4, 6.05], [4.2, 6.5], [2.8, 6.7]]
export const routeProgress = (progress) => smoothstep(.505, .61, progress)
// Measured against the approved quarry triangles; tests gate source/GLB hashes
// and compare every cached contact. Never run a million-triangle bake in RAF.
export const measuredTerrainRoute = measuredRoute.map(({ t, position, quaternion, contacts }) => ({ t, position: new THREE.Vector3(...position), quaternion: new THREE.Quaternion(...quaternion), contacts }))

/** Cache contact against approved quarry triangles, not an invented plane. */
export function buildTerrainRoute(terrain, steps = 48) {
  const collider = terrain.clone(true)
  collider.position.set(0, 0, 0)
  collider.rotation.set(0, 0, 0)
  collider.scale.set(1, 1, 1)
  collider.traverse((mesh) => {
    if (mesh.isMesh) mesh.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
  })
  collider.updateMatrixWorld(true)
  const curve = new THREE.CatmullRomCurve3(haulRoute.map(([x, z]) => new THREE.Vector3(x, 0, z)), false, 'centripetal')
  const ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0))
  const surface = (x, z) => {
    ray.ray.origin.set(x, 8, z)
    const hit = ray.intersectObject(collider, true)[0]
    if (!hit) throw new Error(`Truck route misses quarry terrain at ${x},${z}`)
    return hit.point.y
  }
  const samples = []
  const wheelOffsets = wheelContactPatches.map(([x,z]) => [(x - TRUCK_CALIBRATION.centerX) * TRUCK_CALIBRATION.scale, (z - TRUCK_CALIBRATION.centerZ) * TRUCK_CALIBRATION.scale])
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const point = curve.getPoint(t)
    const forward = curve.getTangent(t).normalize()
    const right = new THREE.Vector3(forward.z, 0, -forward.x)
    const contacts = []
    for (const [x,z] of wheelOffsets) {
      const wheel = point.clone().addScaledVector(right, x).addScaledVector(forward, z)
      wheel.y = surface(wheel.x, wheel.z)
      contacts.push(wheel)
    }
    // Least-squares axle support plane y = sx*x + sz*z + y0 through the
    // measured asymmetric front/rear rubber contact patches.
    let xx=0,xz=0,zz=0,x=0,z=0,xy=0,zy=0,ySum=0
    wheelOffsets.forEach(([wx,wz],index) => {
      const wy = contacts[index].y
      xx+=wx*wx; xz+=wx*wz; zz+=wz*wz; x+=wx; z+=wz; xy+=wx*wy; zy+=wz*wy; ySum+=wy
    })
    const plane = new THREE.Vector3(xy,zy,ySum).applyMatrix3(new THREE.Matrix3().set(xx,xz,x,xz,zz,z,x,z,4).invert())
    const y = plane.z
    forward.y = plane.y
    right.y = plane.x
    forward.normalize()
    const up = new THREE.Vector3().crossVectors(forward, right).normalize()
    right.crossVectors(up, forward).normalize()
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, forward))
    samples.push({ t, position: new THREE.Vector3(point.x, y - TRUCK_CALIBRATION.minY * TRUCK_CALIBRATION.scale, point.z), quaternion, contacts: contacts.map((wheel) => wheel.toArray()) })
  }
  collider.traverse((mesh) => { if (mesh.isMesh) mesh.material.dispose() })
  return samples
}

export function sampleTerrainRoute(samples, t, position, quaternion) {
  const coordinate = THREE.MathUtils.clamp(t, 0, 1) * (samples.length - 1)
  const index = Math.min(samples.length - 2, Math.floor(coordinate))
  const alpha = coordinate - index
  position.lerpVectors(samples[index].position, samples[index + 1].position, alpha)
  quaternion.slerpQuaternions(samples[index].quaternion, samples[index + 1].quaternion, alpha)
}
