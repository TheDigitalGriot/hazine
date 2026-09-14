/**
 * Base-aware runtime URL construction.
 *
 * GitHub Pages serves this project beneath a repository prefix (e.g. `/hazine/`),
 * so no runtime reference may be root-absolute. Every model, texture, brand image,
 * and navigation target is built through `assetUrl()` so a single source of truth
 * governs how the deployed base is applied.
 *
 * Vite normalizes `import.meta.env.BASE_URL` to always carry a trailing slash —
 * `/` for root development, `/hazine/` for a repository-scoped build.
 */

const RAW_BASE = import.meta.env.BASE_URL || '/'

/** Base guaranteed to end in `/` even if a config supplies an unslashed value. */
export const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`

/** `http:`, `https:`, `data:`, `blob:`, and protocol-relative `//cdn` targets. */
const ABSOLUTE = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i

/**
 * Resolve a project-relative path against the deployed base.
 *
 * Deterministic and idempotent: the same input always yields the same string, so
 * `useGLTF(assetUrl(p))` and `useGLTF.preload(assetUrl(p))` share a cache entry.
 *
 * @param {string} path Path with or without a leading slash (`/models/x.glb`).
 * @returns {string} Base-prefixed URL (`/hazine/models/x.glb`).
 */
export function assetUrl(path = '') {
  if (typeof path !== 'string') return BASE
  // Fully-qualified targets are already resolved; never rewrite them.
  if (ABSOLUTE.test(path)) return path

  const relative = path.replace(/^\/+/, '')
  if (relative === '') return BASE

  // Idempotence: a value already carrying the base is returned unchanged rather
  // than prefixed a second time (`/hazine/hazine/...`).
  if (BASE !== '/') {
    const rooted = `/${relative}`
    if (rooted === BASE || `${rooted}/` === BASE) return BASE
    if (rooted.startsWith(BASE)) return rooted
  }

  return `${BASE}${relative}`
}

export default assetUrl
