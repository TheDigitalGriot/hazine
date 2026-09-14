import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { MODEL_ASSETS } from '../src/config/modelAssets.js'

const root = process.cwd()
const seenKeys = new Set()
const seenFiles = new Set()

assert.equal(MODEL_ASSETS.length, 8, 'The experience must declare all eight approved models.')

for (const asset of MODEL_ASSETS) {
  assert(!seenKeys.has(asset.key), `Duplicate model key: ${asset.key}`)
  assert(!seenFiles.has(asset.file), `Duplicate model file: ${asset.file}`)
  seenKeys.add(asset.key)
  seenFiles.add(asset.file)

  const modelPath = path.join(root, 'public', 'models', asset.file)
  const componentPath = path.join(root, 'src', 'models', asset.component)
  assert(fs.existsSync(modelPath), `Missing promoted model: ${modelPath}`)
  assert(fs.statSync(modelPath).size > 0, `Empty promoted model: ${modelPath}`)
  assert(fs.existsSync(componentPath), `Missing generated component: ${componentPath}`)
  const component = fs.readFileSync(componentPath, 'utf8')
  assert(component.includes(`modelUrl('${asset.key}')`), `${asset.component} must resolve through modelUrl('${asset.key}').`)
}

for (const script of ['inspect-assets.mjs', 'optimize-assets.mjs', 'generate-models.mjs']) {
  const source = fs.readFileSync(path.join(root, 'scripts', script), 'utf8')
  assert(source.includes('MODEL_ASSETS'), `${script} must consume the canonical model manifest.`)
}

const scene = fs.readFileSync(path.join(root, 'src', 'components', 'HazineScene.jsx'), 'utf8')
assert(!scene.includes('class SceneErrorBoundary'), 'The scene must use the shared error boundary.')
assert(scene.includes('useProgress'), 'The scene must expose asset-loading progress.')

console.log(`Verified ${MODEL_ASSETS.length} model assets, generated components, and one manifest-driven pipeline.`)

