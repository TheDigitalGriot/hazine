import { copyFile, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const dist = path.resolve(process.cwd(), 'dist')
const entry = path.join(dist, 'index.html')
const routes = ['workbench', 'design-system', 'specification']
const fallbackEntry = path.join(dist, '404.html')

await readFile(entry, 'utf8')
for (const route of routes) {
  const directory = path.join(dist, route)
  await mkdir(directory, { recursive: true })
  await copyFile(entry, path.join(directory, 'index.html'))
}
await copyFile(entry, fallbackEntry)

console.log('Prepared GitHub Pages entries: /, /workbench/, /design-system/, /specification/, and /404.html')
