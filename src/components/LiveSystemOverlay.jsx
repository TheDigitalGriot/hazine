import { useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { useExperience } from '../state/experience.js'
import './live-system.css'

const phases = {
  2: { key: 'call', eyebrow: 'Live meeting', title: 'Hazine is listening for what changes the decision.', confidence: '64%' },
  3: { key: 'geography', eyebrow: 'Geographic context', title: 'The conversation expands from room to market.', confidence: '72%' },
  4: { key: 'evidence', eyebrow: 'Evidence lineage', title: 'A spoken claim becomes inspectable intelligence.', confidence: '83%' },
  5: { key: 'relationship', eyebrow: 'Relationship memory', title: 'The person speaking has a history, not just a name.', confidence: '87%' },
  6: { key: 'decision', eyebrow: 'Decision window', title: 'The closing moment appears while it can still matter.', confidence: '91%' },
}

const transcript = [
  { speaker: 'MARCO VIDAL · 09:42:16', line: 'Spot availability will be thin if the restart slips into Q3.', tag: 'SIGNAL' },
  { speaker: 'EZGI · 09:42:31', line: 'That overlaps with the inventory decline we discussed in February.', tag: 'MEMORY' },
  { speaker: 'MARCO VIDAL · 09:42:43', line: 'I can protect your current treatment charge, but I need the volume agreed today.', tag: 'DECISION WINDOW' },
]

export default function LiveSystemOverlay() {
  const chapter = useExperience((state) => state.chapter)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const [surface, setSurface] = useState('plugin')
  const phase = phases[chapter]
  const root = useRef(null)

  useEffect(() => {
    if (!phase || reducedMotion || !root.current) return undefined
    const animations = [...root.current.querySelectorAll('.intel-line')].map((path, index) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      return animate(path, {
        strokeDashoffset: 0,
        opacity: [0, 0.68],
        duration: 780,
        delay: index * 115,
        ease: 'inOut(3)',
      })
    })
    return () => animations.forEach((animation) => animation.cancel())
  }, [phase?.key, reducedMotion])

  return (
    <div ref={root} className={`live-system ${phase ? 'is-visible' : ''}`} data-phase={phase?.key || 'hidden'} data-surface={surface} aria-hidden={!phase}>
      <div className="surface-switch" role="group" aria-label="Choose Hazine product surface">
        <span>VIEW AS</span>
        <button type="button" className={surface === 'plugin' ? 'is-active' : ''} aria-pressed={surface === 'plugin'} onClick={() => setSurface('plugin')} tabIndex={phase ? 0 : -1}>Claude plugin</button>
        <button type="button" className={surface === 'desktop' ? 'is-active' : ''} aria-pressed={surface === 'desktop'} onClick={() => setSurface('desktop')} tabIndex={phase ? 0 : -1}>Desktop app</button>
      </div>
      <nav className="live-left-rail" aria-label="Hazine live system">
        <div className="live-glyph">H</div>
        {['Live', 'Capture', 'Threads', 'People', 'Sources'].map((item, index) => (
          <button className={index === 0 ? 'is-active' : ''} key={item} type="button" tabIndex={phase ? 0 : -1}>
            <i>{['◎', '+', '≋', '◉', '▣'][index]}</i><span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="live-workspace">
        <div className="plugin-chrome"><span>CLAUDE</span><i /> HAZINE PLUGIN <b>CONNECTED</b></div>
        <header className="live-header">
          <div><strong>HAZINE</strong><span>LIVE INTELLIGENCE</span></div>
          <p><i /> LIVE MEETING <b>09:42:43</b></p>
          <button type="button" tabIndex={phase ? 0 : -1}>PAUSE</button>
        </header>

        <div className="scene-aperture" aria-hidden="true" />

        <div className="call-title">
          <small>SANTIAGO METALS · COPPER CONCENTRATE</small>
          <strong>Supply agreement review</strong>
          <span>EZGI + MARCO · 2 participants</span>
        </div>

        <svg className="intelligence-connections" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
          <path className="intel-line" d="M245 560 C390 500 455 375 590 330" />
          <path className="intel-line" d="M590 330 C720 265 790 205 932 176" />
          <path className="intel-line" d="M590 330 C720 390 810 434 935 438" />
          <path className="intel-line" d="M590 330 C690 470 785 565 932 610" />
        </svg>

        <section className="transcript-island" aria-label="Live call transcript">
          <div className="waveform" aria-hidden="true">{Array.from({ length: 36 }, (_, index) => <i key={index} style={{ '--wave': `${34 + ((index * 17) % 62)}%` }} />)}</div>
          <div className="transcript-label"><span>REAL-TIME TRANSCRIPT</span><small>Select any moment to inspect it</small></div>
          {transcript.map((moment, index) => (
            <button className={`transcript-moment moment-${index}`} type="button" key={moment.line} tabIndex={phase ? 0 : -1}>
              <i>{moment.speaker.startsWith('EZGI') ? 'EZ' : 'MV'}</i>
              <span><small>{moment.speaker}</small><strong>{moment.line}</strong><em>{moment.tag}</em></span>
            </button>
          ))}
        </section>

        <div className="geo-node node-office"><i /> TORONTO · EZGI</div>
        <div className="geo-node node-mine"><i /> ANTOFAGASTA · MINE CORRIDOR</div>
        <div className="geo-node node-ore"><i /> COPPER CONCENTRATE</div>
      </div>

      <aside className="live-right-rail">
        <div className="rail-tabs"><b>Live intelligence</b><span>Evidence</span><span>Relationship</span></div>
        <article className="context-card">
          <small><i /> {phase?.eyebrow || 'Live context'}</small>
          <h2>{phase?.title || 'Hazine is listening.'}</h2>
          <p>Select any spoken moment to inspect its meaning, supporting evidence, and lineage.</p>
          <div className="confidence"><i /><b>{phase?.confidence || '—'}</b><span>CONFIDENCE</span></div>
        </article>
        <article className="source-card market-card">
          <small>MARKET SIGNAL · LME COPPER STOCKS</small><strong>Regional inventory declining</strong>
          <svg viewBox="0 0 260 64" aria-hidden="true"><path d="M2 10 C48 15 67 28 106 25 S169 36 258 58" /></svg>
          <span>Source: LME daily warehouse report · retrieved 09:30 UTC</span>
        </article>
        <article className="source-card memory-source">
          <small>RELEVANT MEMORY · FEB 12</small><strong>Maintenance may overlap declining regional inventory.</strong>
          <p>Ezgi’s hypothesis is now supported by two independent signals.</p><span>Inspect the evidence →</span>
        </article>
        <article className="source-card persona-card">
          <small>RELATIONSHIP · MARCO VIDAL</small><strong>Concessions follow volume certainty.</strong>
          <p>Observed across 4 calls and 2 completed trades.</p><span>87% pattern confidence · sourced moments</span>
        </article>
        <article className="source-card decision-card">
          <small>DECISION WINDOW · NOW</small><strong>Lock treatment charge before confirming revised tonnage.</strong>
          <p>The offer is time-bound and consistent with Marco’s prior closing pattern.</p><button type="button" tabIndex={phase ? 0 : -1}>Open strategy with evidence</button>
        </article>
      </aside>
    </div>
  )
}
