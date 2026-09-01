import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { taxonomy } from '../data/chapters.js'

export function CollectionWidget() {
  const streams = ['Market data', 'Calls', 'Research', 'News', 'Notes']
  return (
    <div className="widget collection-widget" aria-label="Five intelligence sources flowing into Hazine">
      <div className="stream-list">
        {streams.map((stream, index) => (
          <div className="stream-row" key={stream} style={{ '--delay': `${index * 0.18}s` }}>
            <span className="stream-pulse" />
            <span>{stream}</span>
            <i />
          </div>
        ))}
      </div>
      <div className="collection-core">
        <span className="glyph-mark">H</span>
        <small>captured with context</small>
      </div>
    </div>
  )
}

export function TaxonomyWidget() {
  const [active, setActive] = useState(0)
  const root = useRef()
  useEffect(() => {
    const motion = animate(root.current.querySelectorAll('.taxonomy-button'), {
      opacity: [0, 1],
      translateY: [14, 0],
      delay: stagger(70),
      duration: 560,
      ease: 'out(3)',
    })
    return () => motion.cancel()
  }, [])

  return (
    <div className="widget taxonomy-widget" ref={root}>
      <div className="taxonomy-row" role="tablist" aria-label="Hazine intelligence taxonomy">
        {taxonomy.map((item, index) => (
          <button
            className={`taxonomy-button ${active === index ? 'is-active' : ''}`}
            key={item.label}
            onClick={() => setActive(index)}
            style={{ '--taxonomy-color': item.color }}
            role="tab"
            aria-selected={active === index}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="taxonomy-detail">
        <span style={{ background: taxonomy[active].color }} />
        <div>
          <strong>{taxonomy[active].label}</strong>
          <p>{taxonomy[active].detail}</p>
        </div>
      </div>
      <p className="widget-caption">Select each layer. Hazine never disguises interpretation as fact.</p>
    </div>
  )
}

export function ConnectionWidget() {
  return (
    <div className="widget connection-widget">
      <svg viewBox="0 0 640 300" role="img" aria-label="A living knowledge graph connecting a commodity signal to people, calls, and strategy">
        <defs>
          <linearGradient id="thread" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d9993c" /><stop offset="1" stopColor="#2f7a65" /></linearGradient>
        </defs>
        <g className="graph-lines" fill="none" stroke="url(#thread)" strokeWidth="2">
          <path d="M320 150 C250 70 170 55 105 80" />
          <path d="M320 150 C420 75 505 80 552 112" />
          <path d="M320 150 C238 220 175 238 105 220" />
          <path d="M320 150 C408 225 490 240 552 210" />
          <path d="M105 80 C180 135 190 175 105 220" opacity=".35" />
        </g>
        <g className="graph-node core"><circle cx="320" cy="150" r="52" /><text x="320" y="145">Copper</text><text x="320" y="166" className="node-meta">Supply signal</text></g>
        <g className="graph-node"><circle cx="105" cy="80" r="36" /><text x="105" y="85">Call</text></g>
        <g className="graph-node"><circle cx="552" cy="112" r="36" /><text x="552" y="117">Market</text></g>
        <g className="graph-node"><circle cx="105" cy="220" r="36" /><text x="105" y="225">Research</text></g>
        <g className="graph-node strategy"><circle cx="552" cy="210" r="42" /><text x="552" y="207">Strategy</text><text x="552" y="225" className="node-meta">watch</text></g>
      </svg>
      <p className="widget-caption">A fact becomes useful when Hazine remembers what—and whom—it touches.</p>
    </div>
  )
}

export function ProvenanceWidget() {
  const trail = [
    ['09:42:16', 'Call transcript', '“Smelter maintenance may extend into Q3.”'],
    ['09:42:18', 'Evidence anchor', 'Speaker + timestamp preserved'],
    ['09:42:21', 'Interpretation', 'Regional concentrate tightness may persist'],
    ['09:42:28', 'Linked memory', 'Ezgi’s Feb 12 supply hypothesis'],
  ]
  return (
    <div className="widget provenance-widget">
      <div className="provenance-head"><span>Evidence chain</span><span className="verified">verified lineage</span></div>
      {trail.map(([time, kind, copy], index) => (
        <div className="provenance-row" key={kind} style={{ '--delay': `${index * 0.25}s` }}>
          <time>{time}</time><span className="trail-dot" /><div><strong>{kind}</strong><p>{copy}</p></div>
        </div>
      ))}
    </div>
  )
}

export function RecallWidget() {
  const [recalled, setRecalled] = useState(false)
  return (
    <div className={`widget recall-widget ${recalled ? 'is-recalled' : ''}`}>
      <div className="call-bar"><span className="live-dot" /> Live call · Santiago Metals</div>
      <blockquote>“We may see a longer disruption at the northern smelter.”</blockquote>
      <button onClick={() => setRecalled(true)} aria-expanded={recalled} aria-controls="recalled-memory">{recalled ? 'Memory surfaced' : 'Let Hazine listen'}</button>
      <div className="memory-card" id="recalled-memory" aria-hidden={!recalled}>
        <small>Relevant memory · 83% confidence</small>
        <strong>February supply hypothesis</strong>
        <p>Ezgi noted that scheduled maintenance could overlap with declining regional inventories.</p>
        <span>Source: Research note · Feb 12 · 14:08</span>
      </div>
    </div>
  )
}

export function HybridWidget() {
  return (
    <div className="hybrid-stage">
      <div className="product-frame desktop-frame">
        <div className="frame-label">Hazine desktop</div>
        <img src="/brand/hazine-desktop-v4.png" alt="Approved Hazine desktop application design" />
      </div>
      <div className="bridge-line"><span>shared intelligence layer</span></div>
      <div className="product-frame plugin-frame">
        <div className="frame-label">Agent plugin</div>
        <img src="/brand/hazine-claude-plugin-v4.png" alt="Approved Hazine Claude plugin design" />
      </div>
    </div>
  )
}
