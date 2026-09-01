import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const executable = path.resolve('node_modules/.bin/gltf-transform' + (process.platform === 'win32' ? '.CMD' : ''))
const inputRoot = path.resolve('assets/original')
const outputRoot = path.resolve('assets/optimized')

fs.mkdirSync(outputRoot, { recursive: true })

const models = [
  { name: 'mining_quarry.glb', extra: ['--simplify-ratio', '0.72', '--simplify-error', '0.0002'] },
  { name: 'sky_blue_crystal.glb' },
  { name: 'caterpillar_797f_mining_truck.glb' },
  { name: 'xlist_vault.glb' },
  { name: 'vault_01.glb' },
]

for (const model of models) {
  const args = [
    'optimize',
    path.join(inputRoot, model.name),
    path.join(outputRoot, model.name),
    '--compress', 'meshopt',
    '--texture-compress', 'webp',
    '--texture-size', '2048',
    ...(model.extra || []),
  ]
  const result = spawnSync(executable, args, { stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) process.exit(result.status || 1)
}
