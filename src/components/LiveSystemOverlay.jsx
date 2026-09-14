import { useEffect, useMemo, useRef } from 'react'
import { animate } from 'animejs'
import { meetingMoments, momentById } from '../data/liveMeeting.js'
import { useExperience } from '../state/experience.js'
import IntelligenceView from './live/IntelligenceView.jsx'
import MomentList from './live/MomentList.jsx'
import SurfaceToggle from './live/SurfaceToggle.jsx'
import './live/live-components.css'
import './live-system.css'

const chapterMoment = { 2: 'moment-1', 3: 'moment-3', 4: 'moment-4', 5: 'moment-5', 6: 'moment-6' }
const navigation = [['◎', 'Live'], ['+', 'Capture'], ['≋', 'Threads'], ['◉', 'People'], ['▣', 'Sources']]

export default function LiveSystemOverlay() {
  const root = useRef(null)
  const chapter = useExperience((state) => state.chapter)
  const reducedMotion = useExperience((state) => state.reducedMotion)
  const selectedMomentId = useExperience((state) => state.selectedMomentId)
  const surface = useExperience((state) => state.surface)
  const playing = useExperience((state) => state.playing)
  const activePanel = useExperience((state) => state.activePanel)
  const setSelectedMoment = useExperience((state) => state.setSelectedMoment)
  const setSurface = useExperience((state) => state.setSurface)
  const setPlaying = useExperience((state) => state.setPlaying)
  const setActivePanel = useExperience((state) => state.setActivePanel)
  const visible = chapter >= 2 && chapter <= 6
  const moment = useMemo(() => momentById(selectedMomentId), [selectedMomentId])

  useEffect(() => {
    const nextMoment = chapterMoment[chapter]
    if (playing && nextMoment) setSelectedMoment(nextMoment, false)
  }, [chapter, playing, setSelectedMoment])

  useEffect(() => {
    if (!visible || reducedMotion || !root.current) return undefined
    const animations = [...root.current.querySelectorAll('.hls-connection')].map((path, index) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      return animate(path, { strokeDashoffset: 0, opacity: [0, 0.72], duration: 760, delay: index * 100, ease: 'inOut(3)' })
    })
    return () => animations.forEach((animation) => animation.cancel())
  }, [visible, surface, selectedMomentId, reducedMotion])

  const chooseMoment = (id) => {
    setSelectedMoment(id)
    setActivePanel('live')
  }

  return (
    <section ref={root} className={`hazine-live-system ${visible ? 'is-visible' : ''}`} data-surface={surface} data-chapter={chapter} aria-hidden={!visible} aria-label="Hazine live intelligence walkthrough">
      <div className="hls-switch"><SurfaceToggle surface={surface} onChange={setSurface} /></div>
      {surface === 'desktop' && <nav className="hls-left-rail" aria-label="Desktop app sections"><div className="hls-glyph">H</div>{navigation.map(([icon, label], index) => <button type="button" key={label} className={index === 0 ? 'is-active' : ''} tabIndex={visible ? 0 : -1}><i>{icon}</i><span>{label}</span></button>)}</nav>}

      <main className="hls-center">
        {surface === 'plugin' ? <header className="hls-plugin-header"><div><strong>Claude</strong><span>Conversation workspace</span></div><p><i /> Hazine plugin · connected</p></header> : <header className="hls-desktop-header"><div><strong>HAZINE</strong><span>LIVE INTELLIGENCE</span></div><p><i /> LIVE MEETING <b>{moment.time}</b></p><button type="button" onClick={() => setPlaying(!playing)} tabIndex={visible ? 0 : -1}>{playing ? 'PAUSE' : 'RESUME'}</button></header>}
        <div className="hls-scene-aperture" aria-hidden="true" />
        <div className="hls-meeting-title"><small>SANTIAGO METALS · COPPER CONCENTRATE</small><h2>Supply agreement review</h2><span>Ezgi + Marco · 2 participants</span></div>
        {surface === 'plugin' && <article className="hls-plugin-prompt"><small>EZGI · LIVE</small><p>Track this call. Surface only what can change the deal—and keep every source attached.</p><span>Hazine is listening across the conversation ↓</span></article>}
        <svg className="hls-connections" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true"><path className="hls-connection" d="M255 560 C390 500 455 375 590 330" /><path className="hls-connection" d="M590 330 C720 265 790 205 932 176" /><path className="hls-connection" d="M590 330 C720 390 810 434 935 438" /></svg>
        <section className="hls-transcript" aria-label="Live meeting transcript"><div className="hls-waveform" aria-hidden="true">{Array.from({ length: 38 }, (_, index) => <i key={index} style={{ '--wave': `${28 + ((index * 17) % 65)}%` }} />)}</div><div className="hls-transcript-label"><span>REAL-TIME TRANSCRIPT · {meetingMoments.length} MOMENTS</span><small>{playing ? 'Following the live call' : 'Paused on selected moment'}</small></div><MomentList selectedMomentId={selectedMomentId} onSelect={chooseMoment} enabled={visible} compact /></section>
        <div className="hls-geo hls-geo-origin"><i />{moment.geography.origin.label}</div><div className="hls-geo hls-geo-corridor"><i />{moment.geography.corridor.label}</div><div className="hls-geo hls-geo-commodity"><i />{moment.geography.commodity}</div>
      </main>
      <aside className="hls-intelligence" aria-live="polite">{surface === 'plugin' && <div className="hls-plugin-result"><small>HAZINE</small><span>Evidence-aware answer inserted beside Claude</span></div>}<IntelligenceView moment={moment} activePanel={activePanel} onPanelChange={setActivePanel} compact /></aside>
    </section>
  )
}
