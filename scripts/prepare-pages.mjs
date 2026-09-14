import { copyFile, mkdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const dist = path.resolve(process.cwd(), 'dist')
const entry = path.join(dist, 'index.html')
const workbenchDirectory = path.join(dist, 'workbench')
const workbenchEntry = path.join(workbenchDirectory, 'index.html')
const fallbackEntry = path.join(dist, '404.html')

await readFile(entry, 'utf8')
await mkdir(workbenchDirectory, { recursive: true })
await copyFile(entry, workbenchEntry)
await copyFile(entry, fallbackEntry)

console.log('Prepared GitHub Pages entries: /, /workbench/, and /404.html')
