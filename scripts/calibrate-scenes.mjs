import fs from 'node:fs/promises'
import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { MeshoptDecoder } from 'meshoptimizer'
import * as THREE from 'three'
import { MODEL_ASSET_BY_KEY } from '../src/config/modelAssets.js'
import { buildTerrainRoute } from '../src/scene/spatialCalibration.js'

// Reconstruct the geometry and authored transforms used by generated gltfjsx,
// without loading browser textures or replacing the approved source models.
export async function loadGeneratedModel(key) {
  await MeshoptDecoder.ready
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder })
  const asset = MODEL_ASSET_BY_KEY[key]
  const doc = await io.read(new URL(`../public/models/${asset.file}`, import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'))
  const source = await fs.readFile(new URL(`../src/models/${asset.component}`, import.meta.url), 'utf8')
  const group = new THREE.Group()
  for (const match of source.matchAll(/<mesh\s+([^>]+)\/>/g)) {
    const props = match[1]
    const nodeName = /geometry=\{nodes\.([^\.]+)\.geometry\}/.exec(props)?.[1]
    const node = doc.getRoot().listNodes().find((candidate) => candidate.getName().replace(/[^a-zA-Z0-9_]/g, '_') === nodeName)
    if (!node) throw new Error(`Generated node not found: ${key}/${nodeName}`)
    const primitive = node.getMesh().listPrimitives()[0]
    const geometry = new THREE.BufferGeometry()
    const positions = primitive.getAttribute('POSITION')
    geometry.setAttribute('position', new THREE.BufferAttribute(positions.getArray(), 3, positions.getNormalized()))
    if (primitive.getIndices()) geometry.setIndex(new THREE.BufferAttribute(primitive.getIndices().getArray(), 1))
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }))
    mesh.name = /name="([^"]+)"/.exec(props)?.[1] ?? nodeName
    for (const prop of ['position', 'rotation', 'scale']) {
      const expression = new RegExp(`${prop}=\\{([^}]+)\\}`).exec(props)?.[1]
      if (!expression) continue
      const value = Function('Math', `return (${expression})`)(Math)
      if (prop === 'scale' && !Array.isArray(value)) mesh.scale.setScalar(value)
      else mesh[prop].fromArray(value)
    }
    group.add(mesh)
  }
  group.updateMatrixWorld(true)
  return group
}

export function visibleBounds(group, hide = []) {
  const bounds = new THREE.Box3()
  const meshes = []
  group.traverse((mesh) => {
    if (!mesh.isMesh || hide.some((fragment) => mesh.name.includes(fragment))) return
    const box = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld)
    bounds.union(box)
    meshes.push({ name: mesh.name, min: box.min.toArray(), max: box.max.toArray() })
  })
  return { min: bounds.min.toArray(), max: bounds.max.toArray(), size: bounds.getSize(new THREE.Vector3()).toArray(), meshes }
}

if (process.argv[1]?.endsWith('calibrate-scenes.mjs')) {
  if (process.argv.includes('--route')) {
    const route = buildTerrainRoute(await loadGeneratedModel('quarry'))
    await fs.writeFile(new URL('../src/scene/measuredHaulRoute.json', import.meta.url), JSON.stringify(route.map(({ t, position, quaternion, contacts }) => ({ t, position: position.toArray(), quaternion: quaternion.toArray(), contacts }))))
    console.log('Measured haul route refreshed; update/verify geometry hash gate if source geometry changed.')
    process.exit(0)
  }
  const result = { observedAt: new Date().toISOString(), generatedTransformGeometry: true, models: {} }
  for (const key of ['office', 'caller', 'quarry', 'truck']) {
    const model = await loadGeneratedModel(key)
    result.models[key] = visibleBounds(model, key === 'office' ? ['Background'] : [])
    if (key === 'quarry' || key === 'office') {
      const ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0))
      result.models[key].surfaceGrid = []
      const xs = key === 'office' ? [0, 2, 4, 6, 8] : [-4, -2, 0, 2, 4, 6, 8]
      const zs = key === 'office' ? [-3, -1, 0, 1, 3] : [0, 1, 2, 3, 4, 5, 6, 7]
      for (const z of zs) for (const x of xs) {
        ray.ray.origin.set(x, 10, z)
        const hits = ray.intersectObjects(model.children.filter((mesh) => !mesh.name.includes('Background')), true)
        result.models[key].surfaceGrid.push({ x, z, hits: hits.slice(0, 4).map((hit) => ({ y: hit.point.y, mesh: hit.object.name })) })
      }
    }
  }
  await fs.writeFile(new URL('../.prism/shared/research/2026-09-15-native-scene-calibration.json', import.meta.url), JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))
}
