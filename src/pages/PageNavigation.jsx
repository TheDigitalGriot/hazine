import { assetUrl } from '../lib/assetUrl.js'
import './component-pages.css'

export const pageRoutes = [['landing', 'Landing', '/'], ['workbench', 'Live system', '/workbench/'], ['design-system', 'Design system', '/design-system/'], ['specification', 'Product specification', '/specification/']]
export default function PageNavigation({ current }) {
  return <nav className="hz-page-links" aria-label="Hazine pages">{pageRoutes.map(([id, title, route]) => <a key={id} href={assetUrl(route)} aria-current={id === current ? 'page' : undefined}>{title}</a>)}</nav>
}
