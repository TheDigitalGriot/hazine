import fs from 'node:fs'
import path from 'node:path'
import { NodeIO } from '@gltf-transform/core'
import { ALL_EXTENSIONS } from '@gltf-transform/extensions'

const inputPath = path.resolve('assets/original/free__atlanta_corperate_office_building.glb')
const outputPath = path.resolve('assets/prepared/free__atlanta_corperate_office_building.glb')
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS)
const document = await io.read(inputPath)

let repaired = 0
for (const material of document.getRoot().listMaterials()) {
  const name = material.getName().toLowerCase()
  if (!name.includes('glass') && !name.includes('window')) continue

  material.setAlphaMode('BLEND').setDoubleSided(true)
  const clearcoat = material.getExtension('KHR_materials_clearcoat')
  if (clearcoat?.getClearcoatNormalTexture()) {
    // The downloaded source assigns this map to meshes without tangent space.
    // Removing only the invalid normal layer preserves clearcoat and transparency.
    clearcoat.setClearcoatNormalTexture(null)
    repaired += 1
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
await io.write(outputPath, document)
console.log(`Prepared building asset with ${repaired} invalid clearcoat normal assignment(s) removed.`)
