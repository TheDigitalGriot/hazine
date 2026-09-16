import { useEffect, useState } from 'react'
import { assetUrl } from '../lib/assetUrl.js'
import PageNavigation from './PageNavigation.jsx'

export default function PageShell({ current, children }) {
  const [theme, setTheme] = useState('light')
  useEffect(() => { document.title = current === 'specification' ? 'Hazine — Product Requirements & Technical Experience Specification' : 'Hazine — Design system' }, [current])
  return <div className="hz-component-page" data-page-theme={theme}>
    <a className="hz-skip" href="#page-content">Skip to content</a>
    <header className="hz-page-header"><a href={assetUrl('/')} aria-label="Hazine landing"><img className="hz-brand-art" src={assetUrl('/brand/hazine-wordmark.png')} alt="Hazine — approved sweeping-Z wordmark" /></a><PageNavigation current={current} /><button className="hz-theme-button" type="button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? 'Dark' : 'Light'} theme</button></header>
    <main id="page-content">{children}</main>
    <footer className="hz-page-footer"><img src={assetUrl('/brand/hazine-lockup.png')} alt="Hazine approved glyph and wordmark lockup" /><p>A living treasury of intelligence.<br /><span>Collect · Connect · Surface</span></p><PageNavigation current={current} /></footer>
  </div>
}
