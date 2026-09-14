import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const outputDirectory = path.resolve(process.argv[2] ?? '.prism/local/acceptance-screenshots')
const origin = process.argv[3] ?? 'http://127.0.0.1:4175'
const chromePath = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'

if (!existsSync(chromePath)) throw new Error(`Chrome was not found at ${chromePath}`)

await mkdir(outputDirectory, { recursive: true })
const profile = await mkdtemp(path.join(tmpdir(), 'hazine-acceptance-'))
const chrome = spawn(chromePath, [
  '--headless=new',
  '--hide-scrollbars',
  '--disable-gpu-sandbox',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  'about:blank',
], { stdio: 'ignore', windowsHide: true })

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

async function waitForDebugPort() {
  const activePort = path.join(profile, 'DevToolsActivePort')
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (existsSync(activePort)) {
      const [port] = (await readFile(activePort, 'utf8')).trim().split(/\r?\n/)
      return Number(port)
    }
    await delay(100)
  }
  throw new Error('Chrome did not expose a DevTools port')
}

async function openPage(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
  if (!response.ok) throw new Error(`Unable to create capture target: ${response.status}`)
  return response.json()
}

function connect(webSocketDebuggerUrl) {
  const socket = new WebSocket(webSocketDebuggerUrl)
  const pending = new Map()
  let sequence = 0

  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data)
    if (!message.id || !pending.has(message.id)) return
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(message.error.message))
    else resolve(message.result)
  })

  const ready = new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })

  return {
    ready,
    close: () => socket.close(),
    send: async (method, params = {}) => {
      await ready
      const id = ++sequence
      const response = new Promise((resolve, reject) => pending.set(id, { resolve, reject }))
      socket.send(JSON.stringify({ id, method, params }))
      return response
    },
  }
}

async function waitForExperience(client) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    const { result } = await client.send('Runtime.evaluate', {
      expression: `Boolean(document.querySelector('.app-shell, .hazine-workbench')) && !document.querySelector('.route-loader')`,
      returnByValue: true,
    })
    if (result.value) {
      await delay(2200)
      return
    }
    await delay(100)
  }
  throw new Error('The Hazine route did not become capture-ready')
}

async function capture(client, { name, url, width, height, reduced = false, prepare }) {
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 600,
    screenWidth: width,
    screenHeight: height,
  })
  await client.send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: reduced ? 'reduce' : 'no-preference' }],
  })
  await client.send('Page.navigate', { url })
  await waitForExperience(client)
  if (prepare) {
    await client.send('Runtime.evaluate', { expression: prepare })
    await delay(900)
  }
  const { data } = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  })
  await writeFile(path.join(outputDirectory, name), Buffer.from(data, 'base64'))
}

let client
try {
  const port = await waitForDebugPort()
  const page = await openPage(port)
  client = connect(page.webSocketDebuggerUrl)
  await client.ready
  await client.send('Page.enable')
  await client.send('Runtime.enable')

  const desktop = { width: 1440, height: 900 }
  const routes = ['threshold', 'vault', 'call', 'geography', 'evidence', 'decision']
  for (const route of routes) {
    await capture(client, { ...desktop, name: `desktop-${route}.png`, url: `${origin}/#${route}` })
  }
  await capture(client, { ...desktop, name: 'workbench-plugin.png', url: `${origin}/workbench/` })
  await capture(client, {
    ...desktop,
    name: 'workbench-desktop.png',
    url: `${origin}/workbench/`,
    prepare: `Array.from(document.querySelectorAll('button')).find((button) => button.textContent.includes('Desktop app'))?.click()`,
  })
  await capture(client, { width: 430, height: 932, name: 'mobile-threshold.png', url: `${origin}/#threshold` })
  await capture(client, { width: 430, height: 932, name: 'mobile-call.png', url: `${origin}/#call` })
  await capture(client, { ...desktop, reduced: true, name: 'reduced-motion-threshold.png', url: `${origin}/#threshold` })
} finally {
  client?.close()
  if (!chrome.killed) chrome.kill()
  if (chrome.exitCode === null) await once(chrome, 'exit')
  await rm(profile, { recursive: true, force: true, maxRetries: 8, retryDelay: 150 })
}

console.log(`Captured Hazine acceptance states in ${outputDirectory}`)
