import { assetUrl } from './assetUrl.js'
import { MODEL_ASSETS, MODEL_ASSET_BY_KEY } from '../config/modelAssets.js'

const modelAssets = Object.freeze(Object.fromEntries(MODEL_ASSETS.map((asset) => [
  asset.key,
  { ...asset, path: `/models/${asset.file}` },
])))

export const assetManifest = Object.freeze({
  models: modelAssets,
  textures: { earth: assetUrl('/textures/earth-night.jpg') },
  brand: {
    desktop: assetUrl('/brand/hazine-desktop-v4.png'),
    plugin: assetUrl('/brand/hazine-claude-plugin-v4.png'),
    system: assetUrl('/brand/hazine-design-system-with-icon.png'),
  },
})

export function modelUrl(key) {
  const asset = MODEL_ASSET_BY_KEY[key]
  if (!asset) throw new Error(`Unknown Hazine model asset: ${key}`)
  return assetUrl(`/models/${asset.file}`)
}

export function modelsForGroup(group) {
  return Object.entries(modelAssets)
    .filter(([, asset]) => asset.group === group)
    .map(([key, asset]) => ({ key, url: assetUrl(asset.path) }))
}

export function modelGroup(key) {
  return MODEL_ASSET_BY_KEY[key]?.group
}
