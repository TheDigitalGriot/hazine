const panels = [
  { id: 'live', label: 'Live intelligence' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'relationship', label: 'Relationship' },
]

function Evidence({ moment }) {
  return (
    <div className="hz-evidence-list" id={`evidence-${moment.id}`}>
      <div className="hz-lineage-status"><strong>{moment.evidence.length}</strong><span>sources support this moment</span><i>Lineage intact</i></div>
      {moment.evidence.map((source, index) => (
        <article className="hz-source" key={source.id}>
          <span>0{index + 1}</span>
          <div><strong>{source.label}</strong><small>{source.source} · {source.timestamp}</small><small>Retrieved {source.retrievedAt} · {source.type} source</small><code>LINEAGE ID · {source.id}</code></div>
          <em>{source.confidence}%</em>
        </article>
      ))}
      <p className="hz-provenance-note">Every conclusion above resolves to the speaker, source, timestamp, retrieval moment, and confidence that produced it.</p>
    </div>
  )
}

function Relationship({ moment }) {
  return (
    <div className="hz-relationship">
      <header><span>MV</span><div><small>EVOLVING · SOURCE-BOUND PERSONA</small><h3>Marco Vidal</h3><p>Commercial Director · Santiago Metals</p></div></header>
      <div className="hz-vitals"><span><strong>4</strong>calls</span><span><strong>2</strong>trades</span><span><strong>14 mo</strong>history</span></div>
      <article><small>CURRENT OBSERVATION</small><strong>{moment.relationship.title}</strong><p>{moment.relationship.basis}</p><em>{moment.relationship.confidence}% pattern confidence</em></article>
      <p className="hz-provenance-note">Persona traits are revisable observations—not labels. New, contradictory evidence changes the model.</p>
    </div>
  )
}

function LiveIntelligence({ moment, onPanelChange }) {
  const geography = moment.geography
  return (
    <div className="hz-intelligence-stack">
      <article className="hz-insight-card">
        <small><i /> {moment.taxonomy} · LIVE CONTEXT</small>
        <h2>{moment.insight}</h2>
        <p>{moment.strategy.rationale}</p>
        <div className="hz-confidence" aria-label={`${moment.confidence} percent confidence`}><span><i style={{ width: `${moment.confidence}%` }} /></span><strong>{moment.confidence}%</strong><em>confidence</em></div>
      </article>

      <article className="hz-geography-card">
        <small>GEOGRAPHIC CONTEXT</small>
        <div><span>{geography.origin.label}</span><i aria-hidden="true">→</i><span>{geography.corridor.label}</span></div>
        <strong>{geography.commodity}</strong>
      </article>

      <article className="hz-strategy-card">
        <small>ACCOUNTABLE STRATEGY</small>
        <h3>{moment.strategy.title}</h3>
        <p>{moment.strategy.rationale}</p>
        <footer>SUPPORTED BY · {moment.strategy.supports.join(' · ')}</footer>
        <button type="button" onClick={() => onPanelChange('evidence')}>Inspect {moment.strategy.supports.length} supporting source{moment.strategy.supports.length === 1 ? '' : 's'} <span>→</span></button>
      </article>
    </div>
  )
}

export default function IntelligenceView({ moment, activePanel, onPanelChange, compact = false }) {
  return (
    <div className={`hz-intelligence-view ${compact ? 'is-compact' : ''}`}>
      <div className="hz-intelligence-tabs" role="tablist" aria-label="Meeting intelligence views">
        {panels.map((panel) => (
          <button key={panel.id} type="button" role="tab" aria-selected={activePanel === panel.id} className={activePanel === panel.id ? 'is-active' : ''} onClick={() => onPanelChange(panel.id)}>{panel.label}</button>
        ))}
      </div>
      <div className="hz-panel-body" role="tabpanel" key={`${activePanel}-${moment.id}`}>
        {activePanel === 'live' && <LiveIntelligence moment={moment} onPanelChange={onPanelChange} />}
        {activePanel === 'evidence' && <Evidence moment={moment} />}
        {activePanel === 'relationship' && <Relationship moment={moment} />}
      </div>
    </div>
  )
}
