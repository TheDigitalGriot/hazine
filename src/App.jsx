import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'
import { HybridWidget, TaxonomyWidget } from './components/StoryWidgets.jsx'
import InstrumentRail from './components/InstrumentRail.jsx'
import KnowledgeTransform from './components/KnowledgeTransform.jsx'
import LiveSystemOverlay from './components/LiveSystemOverlay.jsx'
import SceneErrorBoundary from './components/SceneErrorBoundary.jsx'
import StaticSceneFallback from './components/StaticSceneFallback.jsx'
import { chapters } from './data/chapters.js'
import { useExperience } from './state/experience.js'
import { assetUrl } from './lib/assetUrl.js'
import { useMotionPolicy } from './hooks/useMotionPolicy.js'
import PageNavigation from './pages/PageNavigation.jsx'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const HazineScene = lazy(() => import('./components/HazineScene.jsx'))

function ScrollDirector() {
  const setProgress = useExperience((state) => state.setProgress)
  const setChapter = useExperience((state) => state.setChapter)
  const motionPolicy = useMotionPolicy()

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const clock = { progress: 0 }
      const sections = gsap.utils.toArray('.story-section')
      gsap.to(clock, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.experience',
          start: 'top top',
          end: 'bottom bottom',
          scrub: motionPolicy.reduced ? false : 0.32,
          onUpdate: (self) => {
            setProgress(self.progress)
            const readingLine = window.scrollY + window.innerHeight * 0.52
            let current = 0
            sections.forEach((section, index) => {
              if (section.offsetTop <= readingLine) current = index
            })
            setChapter(current)
          },
        },
      })

      sections.forEach((section) => {
        if (!motionPolicy.reduced) {
          gsap.from(section.querySelectorAll('.reveal'), {
            y: 28,
            opacity: 0,
            duration: 0.72,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none reverse' },
          })
        }
      })

      const vaultPassage = document.querySelector('.vault-passage')
      if (vaultPassage && !motionPolicy.reduced) {
        gsap.to(vaultPassage.querySelector('.vault-whisper'), {
          opacity: 0,
          scale: 0.94,
          ease: 'none',
          scrollTrigger: { trigger: vaultPassage, start: '45% center', end: '72% center', scrub: 0.35 },
        })
      }
    })

    return () => {
      context.revert()
    }
  }, [motionPolicy.reduced, setChapter, setProgress])
  return null
}

function Navigation() {
  const chapter = useExperience((state) => state.chapter)
  return (
    <header className="topbar">
      <a href="#threshold" className="brand-link"><span>HAZINE</span><small>living intelligence</small></a>
      <div className="chapter-readout"><span>{chapters[chapter]?.index}</span>{chapters[chapter]?.eyebrow}</div>
      <PageNavigation current="landing" />
      <a className="quiet-link hz-enter-live" href={assetUrl('/workbench/')}>Enter live system →</a>
    </header>
  )
}

function Section({ chapter, children, className = '' }) {
  return (
    <section id={chapter.id} className={`story-section ${chapter.tone} ${className}`} data-chapter={chapter.index}>
      <div className="section-inner">{children}</div>
    </section>
  )
}

export default function App() {
  const hero = useRef()
  const openTreasury = useExperience((state) => state.openTreasury)
  const treasuryOpen = useExperience((state) => state.treasuryOpen)
  const setSealHovered = useExperience((state) => state.setSealHovered)
  const setChapter = useExperience((state) => state.setChapter)
  const setProgress = useExperience((state) => state.setProgress)
  const motionPolicy = useMotionPolicy()

  useLayoutEffect(() => {
    const chapterIndex = chapters.findIndex(({ id }) => `#${id}` === window.location.hash)
    if (chapterIndex < 0) return undefined

    const frame = window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView()
      setChapter(chapterIndex)
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(window.scrollY / scrollRange)
      ScrollTrigger.refresh()
      ScrollTrigger.update()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [setChapter, setProgress])

  useEffect(() => {
    if (motionPolicy.reduced) {
      hero.current?.querySelectorAll('.hero-beat').forEach((element) => { element.style.opacity = 1 })
      return undefined
    }
    const motion = animate(hero.current.querySelectorAll('.hero-beat'), {
      opacity: [0, 1], translateY: [22, 0], delay: stagger(115, { start: 180 }), duration: 900, ease: 'out(4)',
    })
    return () => motion.cancel()
  }, [motionPolicy.reduced])

  const enterLivingTreasury = () => {
    openTreasury()
    window.setTimeout(() => document.querySelector('#call')?.scrollIntoView({ behavior: motionPolicy.scrollBehavior }), motionPolicy.reduced ? 0 : 420)
  }

  return (
    <div className="app-shell hazine-story">
      <ScrollDirector />
      <Navigation />
      <InstrumentRail />
      <LiveSystemOverlay />
      <SceneErrorBoundary fallback={({ retry }) => <StaticSceneFallback onRetry={retry} />}>
        <Suspense fallback={<StaticSceneFallback loading />}><HazineScene /></Suspense>
      </SceneErrorBoundary>
      <div className={`treasury-transition ${treasuryOpen ? 'is-active' : ''}`} aria-hidden="true" />

      <main className="experience">
        <Section chapter={chapters[0]} className="hero-section threshold-section">
          <div className="hero-copy spatial-hero" ref={hero}>
            <p className="hero-beat eyebrow">For Ezgi · A guided encounter with Hazine</p>
            <div className="hero-beat hero-wordmark" aria-label="Hazine">HAZINE</div>
            <h1 className="hero-beat">The treasury<br />remembers.</h1>
            <p className="hero-beat hero-intro">Pass through the threshold. What begins as a conversation becomes living, sourced intelligence.</p>
            <a className="hero-beat enter-link" href="#vault"><span>Follow the passage</span><i>↓</i></a>
          </div>
          <div className="hero-side-note hero-beat"><span>Collect</span><span>Connect</span><span>Surface</span></div>
        </Section>

        <Section chapter={chapters[1]} className="vault-passage vault-entry-section">
          <div className="vault-whisper">
            <p className="reveal chapter-index">01 / The inner room</p>
            <h2 className="reveal">The archive becomes alive when the present calls for it.</h2>
          </div>
          <button className="treasury-seal-control reveal" type="button"
            onPointerEnter={() => setSealHovered(true)} onPointerLeave={() => setSealHovered(false)}
            onFocus={() => setSealHovered(true)} onBlur={() => setSealHovered(false)} onClick={enterLivingTreasury}>
            <i aria-hidden="true" /><span>ENTER THE</span><strong>LIVING TREASURY</strong><em>Begin Ezgi’s story →</em>
          </button>
        </Section>

        <Section chapter={chapters[2]} className="use-case-section call-section">
          <div className="case-caption align-left"><p className="reveal chapter-index">02 / The call</p><h2 className="reveal">Ezgi stays present.</h2><p className="reveal">Hazine listens beside her—transcribing, distinguishing claims, and watching for the detail that changes the deal.</p></div>
        </Section>

        <Section chapter={chapters[3]} className="use-case-section geography-section">
          <div className="case-caption align-right"><p className="reveal chapter-index">03 / Geographic context</p><h2 className="reveal">The room opens into the world.</h2><p className="reveal">“Copper concentrate” connects the speaker, the destination, the mine corridor, and the market shaping the offer.</p></div>
        </Section>

        <Section chapter={chapters[4]} className="use-case-section evidence-section">
          <div className="case-caption align-left"><p className="reveal chapter-index">04 / Evidence</p><h2 className="reveal">Nothing important arrives alone.</h2><p className="reveal">The claim keeps its speaker and timestamp. Market data keeps its source. Memory keeps the reasoning that made it relevant.</p></div>
        </Section>

        <Section chapter={chapters[5]} className="use-case-section relationship-section">
          <div className="case-caption align-right"><p className="reveal chapter-index">05 / Relationship intelligence</p><h2 className="reveal">Marco is not a blank record.</h2><p className="reveal">His evolving persona is built from sourced moments: how he negotiates, when he concedes, and what creates certainty.</p></div>
        </Section>

        <Section chapter={chapters[6]} className="use-case-section decision-section">
          <div className="case-caption align-left decision-caption">
            <p className="reveal chapter-index">06 / The closing moment</p><h2 className="reveal">The window appears while it is still open.</h2><p className="reveal">Hazine connects the time-bound offer to Marco’s pattern and Ezgi’s earlier hypothesis—with every source one gesture away.</p>
            <a className="reveal decision-link" href={assetUrl('/workbench/')}>Inspect the live deal walkthrough →</a>
          </div>
        </Section>

        <Section chapter={chapters[7]} className="feature-section">
          <div className="feature-workspace">
            <div className="story-card"><p className="reveal chapter-index">07 / The knowledge system</p><h2 className="reveal">Information changes form without losing lineage.</h2><p className="reveal">Explore how raw moments become evidence, relationships, hypotheses, and accountable strategy.</p></div>
            <div className="reveal knowledge-demo"><KnowledgeTransform /></div>
            <div className="reveal taxonomy-demo"><TaxonomyWidget /></div>
          </div>
        </Section>

        <Section chapter={chapters[8]}>
          <div className="light-workspace hybrid-workspace">
            <div className="story-card center-copy"><p className="reveal chapter-index">08 / Desktop + agent</p><h2 className="reveal">One intelligence.<br />Two natural surfaces.</h2><p className="reveal">The desktop is the treasury. The plugin is the doorway that follows Ezgi into the work.</p></div>
            <div className="reveal"><HybridWidget /></div>
            <a className="reveal workbench-bridge" href={assetUrl('/workbench/')}><span>Enter the working system</span><strong>Experience Hazine during a live deal conversation →</strong></a>
            <div className="reveal story-page-bridges"><a className="workbench-bridge" href={assetUrl('/design-system/')}><span>Inspect the approved visual language</span><strong>Explore the component-based design system →</strong></a><a className="workbench-bridge" href={assetUrl('/specification/')}><span>Read the product contract</span><strong>Product Requirements & Technical Experience Specification →</strong></a></div>
          </div>
        </Section>

        <Section chapter={chapters[9]} className="final-section">
          <div className="final-copy"><p className="reveal eyebrow">The living treasury</p><h2 className="reveal">What Ezgi knows<br />does not disappear.</h2><p className="reveal body-large">It gathers context. It keeps its lineage. It returns with purpose.</p><div className="reveal final-equation"><span>Collect</span><i>→</i><span>Connect</span><i>→</i><span>Surface</span></div><div className="reveal final-lockup"><strong>HAZINE</strong><span>A living treasury of intelligence</span></div></div>
        </Section>
      </main>
    </div>
  )
}
