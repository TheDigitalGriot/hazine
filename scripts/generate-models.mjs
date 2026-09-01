import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const executable = path.resolve('node_modules/.bin/gltfjsx' + (process.platform === 'win32' ? '.CMD' : ''))
const pairs = [
  ['mining_quarry.glb', 'QuarryModel.jsx'],
  ['caterpillar_797f_mining_truck.glb', 'MiningTruckModel.jsx'],
  ['sky_blue_crystal.glb', 'CrystalModel.jsx'],
  ['vault_01.glb', 'ThresholdVaultModel.jsx'],
  ['xlist_vault.glb', 'TreasuryVaultModel.jsx'],
]

fs.mkdirSync(path.resolve('src/models'), { recursive: true })

for (const [input, output] of pairs) {
  const result = spawnSync(executable, [
    path.resolve('public/models', input),
    '--output', path.resolve('src/models', output),
    '--keepnames', '--meta', '--shadows', '--root', 'public',
  ], { stdio: 'inherit', shell: process.platform === 'win32' })
  if (result.status !== 0) process.exit(result.status || 1)
}
