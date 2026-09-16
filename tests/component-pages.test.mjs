import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { resolvePage } from '../src/lib/pageRoutes.js'
import { specificationSections, specificationProvenance, specificationTitle } from '../src/data/productSpecification.js'
import { designColors, designSections, approvedIconRegion } from '../src/data/designSystem.js'

test('all four page routes resolve at root and repository base, including direct refresh', () => {
  for (const base of ['/', '/hazine/', '/non-root-base/']) {
    assert.equal(resolvePage(base, base), 'landing')
    for (const page of ['workbench', 'design-system', 'specification']) {
      for (const suffix of ['', '/', '/index.html']) assert.equal(resolvePage(`${base}${page}${suffix}`, base), page)
    }
    assert.equal(resolvePage(`${base}workbench-other`, base), 'landing')
  }
})
test('delivered specification includes all 22 sections and preserves full content/status/provenance', () => {
  assert.equal(specificationTitle, 'Hazine — Product Requirements & Technical Experience Specification')
  assert.equal(specificationSections.length, 22)
  assert.equal(new Set(specificationSections.map(section => section.id)).size, 22)
  assert.equal(specificationSections.flatMap(section => section.blocks).length, 70)
  assert.equal(specificationSections[0].label, 'DOCUMENT CONTROL')
  assert.equal(specificationSections.at(-1).label, 'APPENDIX · SOURCE TRACEABILITY')
  assert.deepEqual(specificationSections.slice(1, 21).map(section => section.label.split(' · ')[0]), Array.from({ length:20 }, (_, i) => String(i + 1).padStart(2,'0')))
  const statusTable = specificationSections[0].blocks.find(block => block.type === 'table')
  assert.deepEqual(statusTable.rows.slice(1).map(row => row[0]), ['LOCKED','REQUIRED','ILLUSTRATIVE','OPEN'])
  assert.match(specificationProvenance.originalCompleteness, /^PARTIAL.*section 35/)
  assert.deepEqual(specificationProvenance.iconRegion, [970,145,125,185])
  const conditions = specificationSections[19].blocks.find(block => block.type === 'table')
  assert.equal(conditions.rows.length, 11)
  assert.equal(conditions.rows[1][0], '01')
  assert.equal(conditions.rows.at(-1)[0], '10')
})
test('fresh AST extraction equals every delivered heading, text, cell, image and diagram', { skip: !existsSync(specificationProvenance.source) && 'Original structured source unavailable on this checkout' }, () => {
  const fresh = JSON.parse(execFileSync('python', ['scripts/extract-specification.py', specificationProvenance.source], { encoding:'utf8', maxBuffer:1024*1024 }))
  assert.equal(fresh.sha256, specificationProvenance.sha256)
  assert.deepEqual(specificationSections.map(({ id, ...section }) => section), fresh.sections)
})
test('design matrix renders eight selectable sections, exact colors and original artwork', () => {
  assert.equal(designSections.length, 8)
  assert.equal(designColors.length, 7)
  assert.equal(designColors[0][1], '#0B0F16')
  assert.deepEqual(approvedIconRegion, [970,145,125,185])
  const source = readFileSync('src/pages/DesignSystemPage.jsx','utf8')
  for (const [id] of designSections) assert.ok(source.includes(`id="${id}"`), id)
  assert.match(source,/aria-pressed/)
  assert.match(source,/type="search"|Search vault specimen/)
  assert.match(source,/role="switch"/)
  assert.doesNotMatch(source,/<iframe|<canvas|<embed|backgroundImage/)
})
test('specification is text/table/section components, never a document embed', () => {
  const source = readFileSync('src/pages/SpecificationPage.jsx','utf8')
  assert.match(source,/data-spec-section/)
  assert.match(source,/visible\.map\(section/)
  assert.match(source,/type="search"/)
  assert.match(source,/DocumentTable/)
  assert.doesNotMatch(source,/<iframe|<embed|<object|\.pdf['"]|application\/pdf/)
  const visuals = readFileSync('src/pages/SpecificationVisual.jsx','utf8')
  for (const kind of ['architecture','pipeline','memory','roadmap','surfaces','layout','epistemic']) assert.match(visuals,new RegExp(`${kind}:`))
  assert.match(visuals,/Core branches independently to desktop and plugin/)
})
test('production preparation generates every direct-refresh route without changing workbench', () => {
  const source = readFileSync('scripts/prepare-pages.mjs','utf8')
  for (const route of ['workbench','design-system','specification']) assert.ok(source.includes(`'${route}'`))
  assert.match(source,/copyFile\(entry, path\.join\(directory, 'index\.html'\)\)/)
})
