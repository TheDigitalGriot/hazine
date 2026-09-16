import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BASE } from './lib/assetUrl.js'
import { resolvePage } from './lib/pageRoutes.js'
import './base.css'
import './fonts.css'

const App = lazy(() => import('./App.jsx'))
const WorkbenchApp = lazy(() => import('./workbench/WorkbenchApp.jsx'))
const DesignSystemPage = lazy(() => import('./pages/DesignSystemPage.jsx'))
const SpecificationPage = lazy(() => import('./pages/SpecificationPage.jsx'))

const pages = { landing: App, workbench: WorkbenchApp, 'design-system': DesignSystemPage, specification: SpecificationPage }
const CurrentPage = pages[resolvePage(window.location.pathname, BASE)]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="route-loader">Opening Hazine…</div>}>
      <CurrentPage />
    </Suspense>
  </StrictMode>,
)
