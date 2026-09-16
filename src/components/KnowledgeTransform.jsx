import { useEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { useMotionPolicy } from '../hooks/useMotionPolicy.js'
import { useExperience } from '../state/experience.js'
import { knowledgeStageAtProgress } from '../config/knowledgeNarrative.js'

const stages = [
  { name: 'Capture', note: 'Fragments retain their origin' },
  { name: 'Discern', note: 'Meaning is named, never disguised' },
  { name: 'Connect', note: 'Context forms around the claim' },
  { name: 'Surface', note: 'The moment becomes strategically useful' },
]

const fragments = [
  ['Meeting', '“Six weeks, possibly eight.”', '09:42:16'],
  ['Market', 'LME stock −12.4%', '08:00 UTC'],
  ['Research', 'Maintenance overlap risk', 'Feb 12'],
  ['Relationship', 'Marco avoids open-ended terms', '4 calls'],
]

export default function KnowledgeTransform() {
  const root = useRef(null)
  const narrativeStage = useExperience((state) => knowledgeStageAtProgress(state.progress))
  const [manualStage, setManualStage] = useState(null)
  const stage = manualStage?.narrativeStage === narrativeStage ? manualStage.index : narrativeStage
  const motionPolicy = useMotionPolicy()

  useEffect(() => { setManualStage(null) }, [narrativeStage])

  useEffect(() => {
    if (!root.current) return
    if (motionPolicy.reduced) return undefined
    const targets = root.current.querySelectorAll('.knowledge-fragment > *, .knowledge-core > *, .knowledge-receipt > *, .knowledge-relationship > *')
    const motion = animate(targets, {
      opacity: [0.32, 1],
      scale: [0.94, 1],
      translateY: [8, 0],
      delay: stagger(45, { start: 20 }),
      duration: 520,
      ease: 'out(4)',
    })
    // v4 revert cancels and restores the previous inline styles, including
    // when reduced motion is enabled while an entrance is still in flight.
    return () => motion.revert()
  }, [motionPolicy.reduced, stage])

  const chooseStage = (index) => {
    // Manual inspection persists within this semantic beat; the next shared
    // narrative beat resumes following without another scroll/timer owner.
    setManualStage({ index, narrativeStage })
  }

  return (
    <div className="knowledge-transform widget" data-stage={stage} ref={root}>
      <div className="knowledge-head">
        <div><small>LIVE KNOWLEDGE ASSEMBLY</small><strong>{stages[stage].note}</strong></div>
        <span>0{stage + 1} / 04</span>
      </div>
      <div className="knowledge-stage" id="knowledge-stage" role="tabpanel" aria-labelledby={`knowledge-tab-${stage}`} aria-live="polite">
        <svg className="knowledge-links" viewBox="0 0 680 360" aria-hidden="true">
          <path d="M115 78 C210 90 248 145 338 178" />
          <path d="M565 78 C475 92 430 140 338 178" />
          <path d="M108 288 C210 267 247 220 338 178" />
          <path d="M572 288 C472 267 430 220 338 178" />
        </svg>
        {fragments.map(([kind, text, meta], index) => (
          <button className={`knowledge-fragment fragment-${index + 1}`} key={kind} onClick={() => chooseStage(Math.max(1, stage))} aria-label={`Inspect ${kind} knowledge fragment`}>
            <small>{kind}</small><strong>{text}</strong><span>{meta}</span>
          </button>
        ))}
        <div className="knowledge-core">
          <span className="core-orbit" />
          <small>{stage === 0 ? 'RAW MOMENT' : stage === 1 ? 'SIGNAL' : stage === 2 ? 'CONNECTED CLAIM' : 'DEAL INTELLIGENCE'}</small>
          <strong>Northern smelter disruption may extend into Q3</strong>
          <i>{stage < 2 ? 'assembling…' : '87% confidence'}</i>
        </div>
        <div className="knowledge-receipt"><span>✓</span><p><small>SOURCE RECEIPT</small>Marco Vidal · Santiago Metals<br />Call recording · 09:42:16</p></div>
        <div className="knowledge-relationship"><span>MV</span><p><small>RELATIONSHIP MEMORY</small>Prefers concrete terms before concessions</p></div>
      </div>
      <div className="knowledge-controls" role="tablist" aria-label="Knowledge transformation stages">
        {stages.map((item, index) => (
          <button key={item.name} id={`knowledge-tab-${index}`} aria-controls="knowledge-stage" onClick={() => chooseStage(index)} className={stage === index ? 'is-active' : ''} role="tab" aria-selected={stage === index} tabIndex={stage === index ? 0 : -1}>
            <i />{item.name}
          </button>
        ))}
      </div>
    </div>
  )
}
