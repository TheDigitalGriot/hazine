import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const fixtures = [
  ['Cinzel-Variable.ttf', 'Cinzel', 'normal', 'f4d83d34d1f6c741193e4acf4b3dff9531e5a67b6aa65228d00a7db72a4e0f34', { wght: [400, 900] }],
  ['Inter-Variable.ttf', 'Inter', 'normal', '29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031', { opsz: [14, 32], wght: [100, 900] }],
  ['Inter-Italic-Variable.ttf', 'Inter', 'italic', 'acd98e64795781b2058f07b18475e0ecee2a0fe2b42a49e2f9e37d0d6bf66ce6', { opsz: [14, 32], wght: [100, 900] }],
]

test('approved typography ships real unmodified variable fonts with exact notices and a shared entry point', () => {
  const css = readFileSync(new URL('../src/fonts.css', import.meta.url), 'utf8')
  const entry = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
  assert.match(entry, /import '\.\/fonts\.css'/)
  assert.equal((css.match(/@font-face/g) || []).length, 3)
  for (const [file, family, style, sha256, expectedAxes] of fixtures) {
    const bytes = readFileSync(new URL(`../public/fonts/${file}`, import.meta.url))
    assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256, `${file} remains upstream bytes`)
    assert.equal(bytes.readUInt32BE(0), 0x00010000, `${file} has TrueType SFNT header, not a download error page`)
    const tables = {}
    for (let i = 0; i < bytes.readUInt16BE(4); i++) {
      const row = 12 + i * 16
      tables[bytes.toString('ascii', row, row + 4)] = bytes.readUInt32BE(row + 8)
    }
    assert.ok(tables.name && tables.fvar && tables.glyf, 'real names, variable axes and glyph outlines are present')
    const axes = {}
    const fvar = tables.fvar
    for (let i = 0; i < bytes.readUInt16BE(fvar + 8); i++) {
      const row = fvar + bytes.readUInt16BE(fvar + 4) + i * bytes.readUInt16BE(fvar + 10)
      axes[bytes.toString('ascii', row, row + 4)] = [bytes.readInt32BE(row + 4) / 65536, bytes.readInt32BE(row + 12) / 65536]
    }
    assert.deepEqual(axes, expectedAxes, `${file} axes match primary metadata`)
    const face = css.split('@font-face').find(block => block.includes(`/fonts/${file}`))
    assert.ok(face, `${file} has a loadable public font URL`)
    assert.ok(face.includes(`font-family: '${family}'`))
    assert.ok(face.includes(`font-style: ${style}`))
    assert.ok(face.includes('font-display: swap'))
    const license = readFileSync(new URL(`../public/fonts/${family}-OFL.txt`, import.meta.url), 'utf8')
    assert.ok(license.includes(`The ${family} Project Authors`))
    assert.ok(license.includes('SIL OPEN FONT LICENSE Version 1.1'))
    assert.ok(license.includes('TERMINATION') && license.includes('DISCLAIMER'))
  }
})
