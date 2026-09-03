import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const WorkbenchApp = lazy(() => import('./workbench/WorkbenchApp.jsx'))

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="route-loader">Opening Hazine…</div>}>
      {window.location.pathname.startsWith('/workbench') ? <WorkbenchApp /> : <App />}
    </Suspense>
  </StrictMode>,
)
