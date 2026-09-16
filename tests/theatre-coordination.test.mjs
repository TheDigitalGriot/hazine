import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import theatreCore from '@theatre/core'
import { MeshBasicMaterial } from 'three'
import { bindSemanticHaloMaterial, createSemanticHalo, followNarrativeSequence, SEMANTIC_HALO_KEY } from '../src/scene/theatreHalo.js'
import { knowledgeStageAtProgress } from '../src/config/knowledgeNarrative.js'
import { sceneCoordinate } from '../src/scene/sceneCoordinate.js'

const state = JSON.parse(readFileSync(new URL('../src/theatre-state.json', import.meta.url), 'utf8'))
const { createRafDriver, getProject } = theatreCore

test('Theatre adapter uses the same measured scene coordinate before its existing driver tick', async () => {
  const adapter = readFileSync(new URL('../src/scene/TheatreSequenceAdapter.jsx', import.meta.url), 'utf8')
  assert.match(adapter, /sceneCoordinate\(useExperience\.getState\(\)\.progress\)/, 'adapter must sample the same derivation as actors/camera/globe')
  assert.match(adapter, /followNarrativeSequence\(sheet, theatreDriver, progress, duration, performance\.now\(\)\)/)
  const project = getProject('Hazine mapped halo test', { state })
  await project.ready
  const sheet = project.sheet('Guided Experience')
  const object = createSemanticHalo(sheet)
  const driver = createRafDriver({ name: 'mapped scene driver' })
  const material = new MeshBasicMaterial({ transparent: true, opacity: 0 })
  const unsubscribe = bindSemanticHaloMaterial(object, material, driver)
  for (const [index, raw] of [2808 / 11502, 5004 / 11502, 2808 / 11502, 0].entries()) {
    const progress = sceneCoordinate(raw)
    followNarrativeSequence(sheet, driver, progress, 8, (index + 1) * 16.67)
    assert.equal(sheet.sequence.position, progress * 8)
    assert.ok(Math.abs(material.opacity - (progress === .265 ? .62 : progress === .505 ? .7 : 0)) < 1e-6, `mapped same-frame value at raw ${raw}`)
  }
  unsubscribe()
  material.dispose()
})

test('production Theatre track drives its dedicated visible material in both scroll directions', async () => {
  const project = getProject('Hazine halo coordination test', { state })
  await project.ready
  const sheet = project.sheet('Guided Experience')
  const object = createSemanticHalo(sheet)
  assert.equal(createSemanticHalo(sheet), object, 'StrictMode repeated creation reuses one object/config')
  const driver = createRafDriver({ name: 'test R3F driver' })
  const material = new MeshBasicMaterial({ transparent: true, opacity: 0 })
  const unsubscribe = bindSemanticHaloMaterial(object, material, driver)
  const samples = [[0, 0], [0.14, 0.12], [0.2025, 0.37], [0.265, 0.62], [0.36, 0.1], [0.505, 0.7], [0.64, 0.15], [0.78, 0.85], [1, 0.3], [0.505, 0.7], [0.265, 0.62], [0, 0]]
  samples.forEach(([progress, expected], index) => {
    followNarrativeSequence(sheet, driver, progress, 8, (index + 1) * 16.67)
    assert.ok(Math.abs(object.value.opacity - expected) < 1e-6, `authored core value at ${progress}`)
    assert.ok(Math.abs(material.opacity - expected) < 1e-6, `same-frame material binding at ${progress}`)
  })
  assert.deepEqual(Object.keys(object.value), ['opacity'], 'no camera or actor transform lane')
  const track = state.sheetsById['Guided Experience'].sequence.tracksByObject[SEMANTIC_HALO_KEY]
  assert.equal(track.trackData[track.trackIdByPropPath['["opacity"]']].keyframes.length, 8)
  unsubscribe()
  followNarrativeSequence(sheet, driver, 0.78, 8, 250)
  assert.equal(material.opacity, 0, 'unmounted material no longer receives values')
  material.dispose()
})

test('knowledge stages derive the semantic range from the shared story coordinate', () => {
  assert.deepEqual([0, 0.7, 0.749, 0.794, 0.839, 0.88, 1].map((progress) => knowledgeStageAtProgress(progress)), [0, 0, 1, 2, 3, 3, 3])
  assert.equal(knowledgeStageAtProgress(0.7), 0, 'backward replay resumes Capture')
})
