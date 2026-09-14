import test from 'node:test'
import assert from 'node:assert/strict'
import { MODEL_ASSETS } from '../src/config/modelAssets.js'
import { chapters } from '../src/config/experienceManifest.js'
import { profileForViewport, sceneProfiles, trapezoidEnvelope } from '../src/scene/sceneProfiles.js'

test('approved experience inventory is complete and unique', () => {
  assert.equal(chapters.length, 10)
  assert.equal(new Set(chapters.map(({ id }) => id)).size, 10)
  assert.equal(MODEL_ASSETS.length, 8)
  assert.equal(new Set(MODEL_ASSETS.map(({ key }) => key)).size, 8)
})

test('viewport policy considers orientation as well as width', () => {
  assert.equal(profileForViewport(1440, 900).name, 'desktop')
  assert.equal(profileForViewport(700, 900).name, 'mobile')
  assert.equal(profileForViewport(900, 1200).name, 'mobile')
})

test('vault spline passes through the inner door and into room two', () => {
  for (const profile of Object.values(sceneProfiles)) {
    const points = profile.vaultCurve.getPoints(48)
    assert(points.some(({ z }) => z > 0), `${profile.name} begins before the inner door`)
    assert(points.some(({ z }) => z < -1.5), `${profile.name} enters the second room`)
  }
})

test('actor envelope has readable attack, plateau, and release', () => {
  assert.equal(trapezoidEnvelope(0.5, 0.5, 0.1), 1)
  assert.equal(trapezoidEnvelope(0.39, 0.5, 0.1), 0)
  assert.equal(trapezoidEnvelope(0.61, 0.5, 0.1), 0)
})

