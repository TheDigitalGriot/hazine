import { useMemo, useState } from 'react'
import { assetUrl } from '../lib/assetUrl.js'
import { specificationTitle, specificationSections, specificationProvenance } from '../data/productSpecification.js'
import PageShell from './PageShell.jsx'
import BrandRegion from './BrandRegion.jsx'
import SpecificationVisual from './SpecificationVisual.jsx'

function DocumentTable({ rows }) { return <div className="hz-document-table-wrap"><table className="hz-document-table"><thead><tr>{rows[0].map((heading, i) => <th scope="col" key={i}>{heading}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div> }
function Block({ block }) {
  if (block.type === 'table') return <DocumentTable rows={block.rows} />
  if (block.type === 'diagram') return <SpecificationVisual kind={block.kind} sourceLine={block.line} />
  if (block.type === 'image') {
    if (block.asset === 'approved-icon-region') return <figure className="hz-document-art hz-icon-reference"><BrandRegion region={specificationProvenance.iconRegion} label="Exact approved glassmorphic mineral-sparkle icon region" /><figcaption>Approved source artwork · exact source crop · not regenerated</figcaption></figure>
    const asset = block.asset
    return <figure className="hz-document-art"><img loading="lazy" src={assetUrl(`/${asset}`)} alt={`Approved immutable reference: ${block.asset.split('/').pop()}`} /><figcaption>Approved immutable reference artwork · source line {block.line}</figcaption></figure>
  }
  if (block.style === 'H2X') return <h3 className="hz-document-subhead">{block.text}</h3>
  if (block.style === 'QuoteX') return <blockquote>{block.text}</blockquote>
  return <p className={block.style === 'SmallX' ? 'hz-document-caption' : ''}>{block.text}</p>
}
export default function SpecificationPage() {
  const [query, setQuery] = useState('')
  const visible = useMemo(() => specificationSections.filter(section => JSON.stringify(section).toLowerCase().includes(query.trim().toLowerCase())), [query])
  return <PageShell current="specification">
    <section className="hz-document-hero"><div><small>PRODUCT CONTRACT · DELIVERED DOCUMENT · 01 SEPTEMBER 2026</small><h1>{specificationTitle}</h1><p>A persistent intelligence layer surrounding a trader’s craft.</p></div><div className="hz-document-seal"><BrandRegion region={specificationProvenance.iconRegion} label="Approved Hazine mineral-sparkle application icon" /><span>22 source sections<br />70 authored content blocks</span></div></section>
    <div className="hz-specification-layout"><aside className="hz-document-directory" aria-label="Specification contents"><label htmlFor="spec-search">Find in specification</label><input id="spec-search" type="search" placeholder="Evidence, memory, plugin…" value={query} onChange={event => setQuery(event.target.value)} /><p className="hz-search-count" role="status">{visible.length} of {specificationSections.length} sections</p><nav>{visible.map(section => <a key={section.id} href={`#${section.id}`}><small>{section.label.split(' · ')[0]}</small><span>{section.title}</span></a>)}</nav></aside>
      <article className="hz-document-content">
        <section className="hz-provenance-note" aria-labelledby="authority-title"><div className="hz-status-row"><span className="hz-status locked">LOCKED · PRODUCT SOURCE</span><span className="hz-status open">DEMO ≠ FULL PRODUCT</span></div><h2 id="authority-title">Authority, coverage and implementation status</h2><p>This page preserves the complete authored body of the delivered consolidated specification: Document Control, sections 01–20 and the Source Traceability appendix. It is not the experiential execution PRD, and not a verbatim conversation transcript.</p><p>The original conversation <em>{specificationProvenance.originalConversation}</em> is separately <strong>PARTIAL</strong>: the accepted 20,000-character passage truncates in section 35. The delivered document consolidates those decisions; its requirements are not claims that every capability exists in the current demonstration.</p><details><summary>Source provenance and reconciliation</summary><p>Structured source: <code>work/build_hazine_pdf.py</code>, body line 173 onward. Delivered PDF: <code>{specificationProvenance.deliveredPdf}</code>. Extraction preserves all 22 headings, 70 content blocks, tables, acceptance conditions, seven authored diagram kinds and approved image references.</p><p>Source SHA-256: <code>{specificationProvenance.sha256}</code>.</p><p>Brand reconciliation: the base matrix used by the delivered PDF is copied byte-for-byte from its original work asset. The special icon displays the exact source crop declared at line 22. No standalone production glyph or icon master exists in this repository; these are displays of actual approved matrix artwork, not fabricated substitutes.</p></details></section>
        {visible.map(section => <section className="hz-document-section" id={section.id} key={section.id} data-spec-section={section.id} data-source-line={section.line}><header><small>{section.label}</small><h2>{section.title}</h2><span className="hz-status required">{section.id === 'section-13' ? 'ILLUSTRATIVE NAMES · REQUIRED BEHAVIOR' : section.id === 'section-18' ? 'PHASED DELIVERY · NOT COMPLETION STATUS' : section.id === 'section-20' ? 'RECOMMENDED WORKFLOW' : ['section-06', 'section-11', 'section-16', 'section-17'].includes(section.id) ? 'LOCKED REFERENCE' : 'SOURCE REQUIREMENT'}</span></header>{section.blocks.map((block, index) => <Block key={index} block={block} />)}<a className="hz-section-top" href="#page-content">Back to contents ↑</a></section>)}
        {visible.length === 0 && <p className="hz-empty">No section matches “{query}”. Try evidence, desktop or memory.</p>}
      </article>
    </div>
  </PageShell>
}
