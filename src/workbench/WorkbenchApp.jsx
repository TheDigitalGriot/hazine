import { useEffect, useMemo, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { meetingMoments, momentById } from '../data/liveMeeting.js'
import { assetUrl } from '../lib/assetUrl.js'
import { useExperience } from '../state/experience.js'
import IntelligenceView from '../components/live/IntelligenceView.jsx'
import MomentList from '../components/live/MomentList.jsx'
import SurfaceToggle from '../components/live/SurfaceToggle.jsx'
import '../components/live/live-components.css'
import './workbench.css'

const navigation = [['◉', 'Live'], ['＋', 'Capture'], ['⌁', 'Threads'], ['◎', 'People'], ['◫', 'Sources']]

export default function WorkbenchApp() {
  const root = useRef(null)
  const selectedMomentId = useExperience((state) => state.selectedMomentId)
  const surface = useExperience((state) => state.surface)
  const playing = useExperience((state) => state.playing)
  const activePanel = useExperience((state) => state.activePanel)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const setSelectedMoment = useExperience((state) => state.setSelectedMoment)
  const setSurface = useExperience((state) => state.setSurface)
  const setPlaying = useExperience((state) => state.setPlaying)
  const setActivePanel = useExperience((state) => state.setActivePanel)
  const setReducedMotion = useExperience((state) => state.setReducedMotion)
  const selectedMoment = useMemo(() => momentById(selectedMomentId), [selectedMomentId])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [setReducedMotion])

  useEffect(() => {
    if (reducedMotion || !root.current) return undefined
    const intro = animate(root.current.querySelectorAll('.hwb-reveal'), { opacity: [0, 1], translateY: [10, 0], delay: stagger(60), duration: 560, ease: 'out(4)' })
    return () => intro.cancel()
  }, [reducedMotion, surface])

  useEffect(() => {
    if (!playing || reducedMotion) return undefined
    const timer = window.setInterval(() => {
      const index = meetingMoments.findIndex((moment) => moment.id === useExperience.getState().selectedMomentId)
      setSelectedMoment(meetingMoments[(index + 1) % meetingMoments.length].id, false)
    }, 3600)
    return () => window.clearInterval(timer)
  }, [playing, reducedMotion, setSelectedMoment])

  const selectMoment = (id) => {
    setSelectedMoment(id)
    setActivePanel('live')
  }

  return (
    <div className="hazine-workbench" data-surface={surface} ref={root}>
      <header className="hwb-topbar hwb-reveal">
        <a className="hwb-brand" href={assetUrl('/')}><span>{surface === 'plugin' ? 'CLAUDE' : 'HAZINE'}</span><small>{surface === 'plugin' ? 'HAZINE PLUGIN · CONNECTED' : 'LIVE INTELLIGENCE'}</small></a>
        <div className="hwb-status"><i /> Live meeting <span>{selectedMoment.time}</span></div>
        <div className="hwb-actions"><SurfaceToggle surface={surface} onChange={setSurface} compact /><button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Pause' : 'Resume'}</button><a href={assetUrl('/')}>Return to story</a></div>
      </header>

      <nav className="hwb-nav hwb-reveal" aria-label="Hazine desktop sections">
        <span className="hwb-glyph">H</span>
        {navigation.map(([icon, label], index) => <button type="button" key={label} className={index === 0 ? 'is-active' : ''}><i>{icon}</i><span>{label}</span></button>)}
        <span className="hwb-spacer" /><a href={assetUrl('/')}>↙<span>Story</span></a>
      </nav>

      <main className="hwb-meeting hwb-reveal">
        {surface === 'plugin' && <section className="hwb-claude-context"><div><small>EZGI · CLAUDE</small><p>Track this call and explain what changes the commercial decision. Keep every insight attached to its source.</p></div><span>Hazine tool active</span></section>}
        <div className="hwb-meeting-head"><div><small>SANTIAGO METALS · COPPER CONCENTRATE</small><h1>Supply agreement review</h1></div><div className="hwb-participants"><span>EZ</span><span>MV</span><small>2 participants</small></div></div>
        <section className="hwb-stage" aria-label="Live call and transcript">
          <div className="hwb-audio" aria-hidden="true">{Array.from({ length: 72 }, (_, index) => <i key={index} style={{ '--wave': `${12 + ((index * 17) % 34)}px`, '--delay': `${(index % 12) * -0.08}s` }} />)}</div>
          <div className="hwb-transcript-label"><span>REAL-TIME TRANSCRIPT · {meetingMoments.length} MOMENTS</span><small>{playing ? 'Following live conversation' : 'Paused by Ezgi'}</small></div>
          <MomentList selectedMomentId={selectedMomentId} onSelect={selectMoment} />
        </section>
      </main>

      <aside className="hwb-intelligence hwb-reveal" aria-live="polite">
        {surface === 'plugin' && <header className="hwb-plugin-answer"><small>HAZINE</small><div><strong>Living intelligence</strong><span>One evidence-aware answer beside the conversation</span></div></header>}
        <IntelligenceView moment={selectedMoment} activePanel={activePanel} onPanelChange={setActivePanel} />
      </aside>

      <nav className="hwb-island" aria-label="Meeting intelligence instruments">
        <button type="button" className={activePanel === 'live' ? 'is-active' : ''} onClick={() => setActivePanel('live')}><i />Explain</button>
        <button type="button" className={activePanel === 'evidence' ? 'is-active' : ''} onClick={() => setActivePanel('evidence')}><i />Sources</button>
        <button type="button" className={activePanel === 'relationship' ? 'is-active' : ''} onClick={() => setActivePanel('relationship')}><i />People</button>
        <button type="button" onClick={() => setPlaying(!playing)}><i />{playing ? 'Pause' : 'Resume'}</button>
      </nav>
    </div>
  )
}
