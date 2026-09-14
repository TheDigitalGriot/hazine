export const MODEL_ASSETS = Object.freeze([
  { key: 'threshold', file: 'vault_01.glb', group: 'threshold', component: 'ThresholdVaultModel.jsx' },
  { key: 'vault', file: 'xlist_vault.glb', group: 'threshold', component: 'TreasuryVaultModel.jsx' },
  { key: 'office', file: 'minimalistic_modern_office.glb', group: 'meeting', component: 'OfficeModel.jsx', textureSize: 1024 },
  { key: 'caller', file: 'business_call.glb', group: 'meeting', component: 'BusinessCallModel.jsx', textureSize: 1024, simplify: { ratio: 0.68, error: 0.00015 } },
  { key: 'building', file: 'free__atlanta_corperate_office_building.glb', group: 'geography', component: 'OfficeBuildingModel.jsx', textureSize: 1024, source: 'assets/prepared/free__atlanta_corperate_office_building.glb' },
  { key: 'quarry', file: 'mining_quarry.glb', group: 'geography', component: 'QuarryModel.jsx', simplify: { ratio: 0.72, error: 0.0002 } },
  { key: 'truck', file: 'caterpillar_797f_mining_truck.glb', group: 'geography', component: 'MiningTruckModel.jsx' },
  { key: 'crystal', file: 'sky_blue_crystal.glb', group: 'knowledge', component: 'CrystalModel.jsx' },
])

export const MODEL_ASSET_BY_KEY = Object.freeze(Object.fromEntries(
  MODEL_ASSETS.map((asset) => [asset.key, asset]),
))

