import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'
import { getBounds } from '@gltf-transform/functions'
import { MeshoptDecoder } from 'meshoptimizer'
import fs from 'node:fs/promises'
import path from 'node:path'

const target = process.argv[2] || 'original'
const root = path.resolve(`assets/${target}`)
const names = [
  'mining_quarry.glb',
  'sky_blue_crystal.glb',
  'caterpillar_797f_mining_truck.glb',
  'xlist_vault.glb',
  'vault_01.glb',
]

await MeshoptDecoder.ready
const io = new NodeIO()
  .registerExtensions(ALL_EXTENSIONS)
  .registerDependencies({ 'meshopt.decoder': MeshoptDecoder })
const results = []

for (const name of names) {
  const input = path.join(root, name)
  const document = await io.read(input)
  const graph = document.getRoot()
  const meshes = graph.listMeshes()
  const materials = graph.listMaterials()
  const textures = graph.listTextures()
  const animations = graph.listAnimations()
  const nodes = graph.listNodes()
  let primitives = 0
  let vertices = 0
  let triangles = 0
  for (const mesh of meshes) {
    for (const primitive of mesh.listPrimitives()) {
      primitives++
      const position = primitive.getAttribute('POSITION')
      const indices = primitive.getIndices()
      vertices += position?.getCount() ?? 0
      triangles += Math.floor((indices?.getCount() ?? position?.getCount() ?? 0) / 3)
    }
  }
  const bounds = getBounds(graph.listScenes()[0])
  results.push({
    name,
    bytes: (await fs.stat(input)).size,
    nodes: nodes.length,
    meshes: meshes.length,
    primitives,
    vertices,
    triangles,
    materials: materials.length,
    textures: textures.length,
    animations: animations.map((clip) => clip.getName() || '(unnamed)'),
    bounds: { min: Array.from(bounds.min), max: Array.from(bounds.max) },
    materialNames: materials.map((m) => m.getName() || '(unnamed)'),
    textureMimes: [...new Set(textures.map((t) => t.getMimeType() || 'unknown'))],
  })
}

await fs.writeFile(`asset-report.${target}.json`, JSON.stringify(results, null, 2))
console.table(results.map(({ name, bytes, nodes, meshes, primitives, vertices, triangles, materials, textures, animations }) => ({
  name, mb: (bytes / 1024 / 1024).toFixed(2), nodes, meshes, primitives, vertices, triangles, materials, textures, clips: animations.length,
})))
