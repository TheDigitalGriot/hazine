import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { assetUrl } from './lib/assetUrl.js'
import './base.css'

const App = lazy(() => import('./App.jsx'))
const WorkbenchApp = lazy(() => import('./workbench/WorkbenchApp.jsx'))

const trimTrailing = (value) => value.replace(/\/+$/, '')

/**
 * Route matching must be base-aware: under a repository base the workbench lives
 * at `/hazine/workbench/`, not `/workbench`. Comparing against `assetUrl()` keeps
 * the match in step with the navigation links that point here.
 */
function isWorkbenchRoute(pathname = window.location.pathname) {
  const current = trimTrailing(pathname)
  const workbench = trimTrailing(assetUrl('/workbench'))
  return current === workbench || current.startsWith(`${workbench}/`)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="route-loader">Opening Hazine…</div>}>
      {isWorkbenchRoute() ? <WorkbenchApp /> : <App />}
    </Suspense>
  </StrictMode>,
)
