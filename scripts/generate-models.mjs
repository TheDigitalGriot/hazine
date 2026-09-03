import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const executable = path.resolve('node_modules/gltfjsx/cli.js')
const pairs = [
  ['mining_quarry.glb', 'QuarryModel.jsx'],
  ['caterpillar_797f_mining_truck.glb', 'MiningTruckModel.jsx'],
  ['sky_blue_crystal.glb', 'CrystalModel.jsx'],
  ['vault_01.glb', 'ThresholdVaultModel.jsx'],
  ['xlist_vault.glb', 'TreasuryVaultModel.jsx'],
  ['business_call.glb', 'BusinessCallModel.jsx'],
  ['minimalistic_modern_office.glb', 'OfficeModel.jsx'],
  ['free__atlanta_corperate_office_building.glb', 'OfficeBuildingModel.jsx'],
]

fs.mkdirSync(path.resolve('src/models'), { recursive: true })
const requested = new Set(process.argv.slice(2))
const queue = requested.size ? pairs.filter(([input]) => requested.has(input)) : pairs

for (const [input, output] of queue) {
  const result = spawnSync(process.execPath, [executable,
    path.resolve('public/models', input),
    '--output', path.resolve('src/models', output),
    '--keepnames', '--meta', '--shadows', '--root', 'public',
  ], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}
