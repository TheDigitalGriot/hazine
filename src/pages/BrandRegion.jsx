import { assetUrl } from '../lib/assetUrl.js'
import { matrixAsset } from '../data/designSystem.js'
import { useId } from 'react'

/** Display-only crop: original PNG bytes and approved glyph remain unchanged. */
export default function BrandRegion({ region, label, className = '' }) {
  const clipId = useId()
  const [x, y, width, height] = region
  return <svg className={`hz-brand-region ${className}`} viewBox={region.join(' ')} role="img" aria-label={label}><title>{label}</title><defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse"><rect x={x} y={y} width={width} height={height} /></clipPath></defs><image clipPath={`url(#${clipId})`} href={assetUrl(matrixAsset)} width="1122" height="1402" /></svg>
}
