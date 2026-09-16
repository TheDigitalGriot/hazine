import theatreCore from '@theatre/core'

const { types } = theatreCore

export const SEMANTIC_HALO_KEY = 'Semantic reveal halo'
// Core compares prop configs on repeat creation. Type constructors carry
// function identities, so StrictMode must reuse this one stable config.
const semanticHaloConfig = { opacity: types.number(0, { range: [0, 1] }) }

/** Dedicated material lane: Theatre never writes camera/actor transforms. */
export function createSemanticHalo(sheet) {
  return sheet.object(SEMANTIC_HALO_KEY, semanticHaloConfig)
}

export function bindSemanticHaloMaterial(object, material, driver) {
  const apply = ({ opacity }) => { material.opacity = opacity }
  apply(object.value)
  return object.onValuesChange(apply, driver)
}

/** Seek before ticking so authored properties reach this R3F render, not the next. */
export function followNarrativeSequence(sheet, driver, progress, duration, now) {
  sheet.sequence.position = Math.max(0, Math.min(1, progress)) * duration
  driver.tick(now)
}
