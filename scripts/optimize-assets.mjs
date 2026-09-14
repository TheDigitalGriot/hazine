import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { MODEL_ASSETS } from '../src/config/modelAssets.js'

const executable = path.resolve('node_modules/@gltf-transform/cli/bin/cli.js')
const inputRoot = path.resolve('assets/original')
const outputRoot = path.resolve('assets/optimized')

fs.mkdirSync(outputRoot, { recursive: true })

const models = MODEL_ASSETS.map((asset) => ({
  name: asset.file,
  source: asset.source,
  textureSize: String(asset.textureSize || 2048),
  extra: asset.simplify ? ['--simplify-ratio', String(asset.simplify.ratio), '--simplify-error', String(asset.simplify.error)] : [],
}))

const requested = new Set(process.argv.slice(2).filter((value) => value !== '--'))
const queue = requested.size ? models.filter((model) => requested.has(model.name)) : models

for (const model of queue) {
  const args = [
    'optimize',
    model.source ? path.resolve(model.source) : path.join(inputRoot, model.name),
    path.join(outputRoot, model.name),
    '--compress', 'meshopt',
    '--texture-compress', 'webp',
    '--texture-size', model.textureSize,
    ...(model.extra || []),
  ]
  const result = spawnSync(process.execPath, [executable, ...args], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
}
