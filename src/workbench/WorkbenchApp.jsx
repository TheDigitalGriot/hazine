import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { participants, sources, transcript } from '../data/demoMeeting.js'
import './workbench.css'

const panelNames = ['Live intelligence', 'Evidence', 'Relationship']

function MiniInventoryChart() {
  return (
    <figure className="mini-chart">
      <figcaption><span>LME COPPER STOCKS</span><strong>−12.4%</strong></figcaption>
      <svg viewBox="0 0 420 130" role="img" aria-label="Copper stocks declining 12.4 percent over eight weeks">
        <defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d99a3c" stopOpacity=".28" /><stop offset="1" stopColor="#d99a3c" stopOpacity="0" /></linearGradient></defs>
        <path className="chart-grid" d="M10 25H410M10 65H410M10 105H410" />
        <path className="chart-area" d="M10 24 C70 30 84 42 130 38 S205 61 246 66 S318 82 410 108 L410 120H10Z" />
        <path className="chart-line" d="M10 24 C70 30 84 42 130 38 S205 61 246 66 S318 82 410 108" />
        <circle cx="410" cy="108" r="5" />
      </svg>
      <small>Source: LME daily warehouse report · retrieved 08:00 UTC</small>
    </figure>
  )
}

function Transcript({ activeLine, setActiveLine }) {
  const listRef = useRef(null)
  useEffect(() => {
    const line = listRef.current?.querySelector(`[data-line="${activeLine}"]`)
    line?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeLine])
  return (
    <div className="meeting-transcript" ref={listRef}>
      {transcript.map((line) => {
        const person = participants[line.speaker]
        return (
          <button key={line.id} data-line={line.id} className={`transcript-line ${activeLine === line.id ? 'is-active' : ''} ${line.signal ? 'is-signal' : ''} ${line.deal ? 'is-deal' : ''}`} onClick={() => setActiveLine(line.id)}>
            <span className="speaker-avatar">{person.initials}</span>
            <span className="transcript-copy"><small>{person.name} · {line.time}</small><strong>{line.text}</strong>{line.signal && <em>SIGNAL DETECTED</em>}{line.deal && <em>DECISION WINDOW</em>}</span>
          </button>
        )
      })}
    </div>
  )
}

function IntelligencePanel({ activeLine, activePanel, setActivePanel }) {
  const selected = transcript[activeLine]
  return (
    <aside className="intelligence-panel">
      <div className="intel-tabs" role="tablist" aria-label="Meeting intelligence views">
        {panelNames.map((name, index) => <button key={name} className={activePanel === index ? 'is-active' : ''} onClick={() => setActivePanel(index)} role="tab" aria-selected={activePanel === index}>{name}</button>)}
      </div>
      {activePanel === 0 && (
        <div className="intel-stack">
          <article className={`intel-card moment-card ${selected.deal ? 'is-hot' : ''}`}>
            <div className="intel-label"><span className="intel-pulse" /> {selected.deal ? 'CLOSING MOMENT' : selected.signal ? 'MATERIAL SIGNAL' : 'LIVE CONTEXT'}</div>
            <h2>{selected.deal ? 'A time-bound concession is on the table.' : selected.signal ? 'Supply risk is moving from hypothesis to evidence.' : 'Hazine is listening for what changes the decision.'}</h2>
            <p>{selected.deal ? 'Marco has paired price protection with a same-day volume commitment. Confirm authority, preserve the exact term, and request the revised tonnage.' : selected.signal ? 'The counterparty’s 70% commitment figure supports Ezgi’s February overlap hypothesis.' : 'Select any spoken moment to inspect its meaning and lineage.'}</p>
            <div className="confidence"><span><i style={{ width: selected.deal ? '91%' : selected.signal ? '87%' : '64%' }} /></span><strong>{selected.deal ? '91' : selected.signal ? '87' : '64'}%</strong> confidence</div>
          </article>
          <MiniInventoryChart />
          <article className="intel-card memory-cue">
            <small>RELEVANT MEMORY · FEB 12</small>
            <strong>Maintenance could overlap declining regional inventory.</strong>
            <p>Ezgi’s hypothesis is now supported by two independent signals.</p>
            <a href="#source-list" onClick={() => setActivePanel(1)}>Inspect the evidence <span>→</span></a>
          </article>
        </div>
      )}
      {activePanel === 1 && (
        <div className="source-list" id="source-list">
          <div className="source-summary"><strong>4</strong><span>sources support this moment</span><i>Lineage intact</i></div>
          {sources.map((source, index) => <article className="source-card" key={source.label}><span>0{index + 1}</span><div><strong>{source.label}</strong><small>{source.meta}</small></div><em>{source.confidence}</em></article>)}
        </div>
      )}
      {activePanel === 2 && <RelationshipProfile />}
    </aside>
  )
}

function RelationshipProfile() {
  const observations = [
    ['Concrete terms unlock movement', 'Observed across 4 calls', '89%'],
    ['Concessions arrive with deadlines', '2 prior negotiations', '84%'],
    ['Responds to sourced market evidence', 'Call + email history', '78%'],
  ]
  return (
    <div className="relationship-profile">
      <div className="relationship-person"><span>MV</span><div><small>EVOLVING RELATIONSHIP MODEL</small><h2>Marco Vidal</h2><p>Commercial Director · Santiago Metals</p></div></div>
      <div className="relationship-vitals"><span><strong>4</strong>calls</span><span><strong>2</strong>trades</span><span><strong>14 mo</strong>history</span></div>
      <p className="relationship-rule">Every observation links to the moments that produced it. Recency and contradictory evidence continuously revise the model.</p>
      {observations.map(([title, source, confidence]) => <article className="observation" key={title}><div><strong>{title}</strong><small>{source}</small></div><span>{confidence}</span></article>)}
      <button className="relationship-link">Open relationship history <span>→</span></button>
    </div>
  )
}

export default function WorkbenchApp() {
  const root = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [activeLine, setActiveLine] = useState(0)
  const [activePanel, setActivePanel] = useState(0)
  const elapsed = transcript[activeLine].time

  useEffect(() => {
    const intro = animate(root.current.querySelectorAll('.workbench-reveal'), { opacity: [0, 1], translateY: [12, 0], delay: stagger(70), duration: 620, ease: 'out(4)' })
    return () => intro.cancel()
  }, [])

  useEffect(() => {
    if (!playing) return undefined
    const timer = window.setInterval(() => setActiveLine((line) => line >= transcript.length - 1 ? 0 : line + 1), 3600)
    return () => window.clearInterval(timer)
  }, [playing])

  return (
    <div className="workbench" ref={root}>
      <header className="workbench-topbar workbench-reveal">
        <a className="workbench-brand" href="/"><span>HAZINE</span><small>LIVE INTELLIGENCE</small></a>
        <div className="meeting-status"><i /> Live meeting <span>{elapsed}</span></div>
        <div className="workbench-actions"><button onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Resume'}</button><a href="/">Return to story</a></div>
      </header>
      <aside className="workbench-nav workbench-reveal">
        <span className="nav-glyph">H</span>
        {['Live', 'Capture', 'Threads', 'People', 'Sources'].map((item, index) => <button key={item} className={index === 0 ? 'is-active' : ''}><i>{['◉','＋','⌁','◎','◫'][index]}</i><span>{item}</span></button>)}
        <span className="nav-spacer" /><a href="/">↙<span>Story</span></a>
      </aside>
      <main className="meeting-room workbench-reveal">
        <div className="meeting-head">
          <div><small>SANTIAGO METALS · COPPER CONCENTRATE</small><h1>Supply agreement review</h1></div>
          <div className="participant-stack"><span>EZ</span><span>MV</span><small>2 participants</small></div>
        </div>
        <div className="meeting-stage">
          <div className="audio-ribbon" aria-hidden="true">{Array.from({ length: 72 }, (_, i) => <i key={i} style={{ '--wave': `${12 + ((i * 17) % 34)}px`, '--delay': `${(i % 12) * -.08}s` }} />)}</div>
          <div className="transcript-label"><span>REAL-TIME TRANSCRIPT</span><small>Select any moment to inspect it</small></div>
          <Transcript activeLine={activeLine} setActiveLine={(line) => { setActiveLine(line); setPlaying(false) }} />
        </div>
      </main>
      <IntelligencePanel activeLine={activeLine} activePanel={activePanel} setActivePanel={setActivePanel} />
      <nav className="workbench-island" aria-label="Workbench instruments">
        <button className="is-active"><i />Live</button><button onClick={() => setActivePanel(0)}><i />Explain</button><button onClick={() => setActivePanel(1)}><i />Sources</button><button onClick={() => setActivePanel(2)}><i />Relationship</button>
      </nav>
    </div>
  )
}
