import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const executable = path.resolve('node_modules/@gltf-transform/cli/bin/cli.js')
const inputRoot = path.resolve('assets/original')
const outputRoot = path.resolve('assets/optimized')

fs.mkdirSync(outputRoot, { recursive: true })

const models = [
  { name: 'mining_quarry.glb', extra: ['--simplify-ratio', '0.72', '--simplify-error', '0.0002'] },
  { name: 'sky_blue_crystal.glb' },
  { name: 'caterpillar_797f_mining_truck.glb' },
  { name: 'xlist_vault.glb' },
  { name: 'vault_01.glb' },
  { name: 'business_call.glb', extra: ['--simplify-ratio', '0.68', '--simplify-error', '0.00015'], textureSize: '1024' },
  { name: 'minimalistic_modern_office.glb', textureSize: '1024' },
  { name: 'free__atlanta_corperate_office_building.glb', source: 'assets/prepared/free__atlanta_corperate_office_building.glb', textureSize: '1024' },
]

const requested = new Set(process.argv.slice(2))
const queue = requested.size ? models.filter((model) => requested.has(model.name)) : models

for (const model of queue) {
  const args = [
    'optimize',
    model.source ? path.resolve(model.source) : path.join(inputRoot, model.name),
    path.join(outputRoot, model.name),
    '--compress', 'meshopt',
    '--texture-compress', 'webp',
    '--texture-size', model.textureSize || '2048',
    ...(model.extra || []),
  ]
  const result = spawnSync(process.execPath, [executable, ...args], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}
