import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { MODEL_ASSETS } from '../src/config/modelAssets.js'

const executable = path.resolve('node_modules/gltfjsx/cli.js')
const pairs = MODEL_ASSETS.map(({ file, component }) => [file, component])

fs.mkdirSync(path.resolve('src/models'), { recursive: true })
const requested = new Set(process.argv.slice(2).filter((value) => value !== '--'))
const queue = requested.size ? pairs.filter(([input]) => requested.has(input)) : pairs

for (const [input, output] of queue) {
  const result = spawnSync(process.execPath, [executable,
    path.resolve('public/models', input),
    '--output', path.resolve('src/models', output),
    '--keepnames', '--meta', '--shadows', '--root', 'public',
  ], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}
