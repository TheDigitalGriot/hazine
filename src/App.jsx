import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animate, stagger } from 'animejs'
import { CollectionWidget, ConnectionWidget, HybridWidget, ProvenanceWidget, RecallWidget, TaxonomyWidget } from './components/StoryWidgets.jsx'
import { chapters } from './data/chapters.js'
import { useExperience } from './state/experience.js'

gsap.registerPlugin(ScrollTrigger)

const HazineScene = lazy(() => import('./components/HazineScene.jsx'))

function ScrollDirector() {
  const setProgress = useExperience((state) => state.setProgress)
  const setChapter = useExperience((state) => state.setChapter)
  const setReducedMotion = useExperience((state) => state.setReducedMotion)

  useLayoutEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(media.matches)
    updatePreference()
    media.addEventListener('change', updatePreference)

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
          scrub: media.matches ? false : 0.32,
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
        if (!media.matches) {
          gsap.from(section.querySelectorAll('.reveal'), {
            y: 32,
            opacity: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 72%', toggleActions: 'play none none reverse' },
          })
        }
      })
    })

    return () => {
      context.revert()
      media.removeEventListener('change', updatePreference)
    }
  }, [setChapter, setProgress, setReducedMotion])
  return null
}

function Navigation() {
  const chapter = useExperience((state) => state.chapter)
  const progress = useExperience((state) => state.progress)
  return (
    <>
      <header className="topbar">
        <a href="#threshold" className="brand-link"><span>HAZINE</span><small>living intelligence</small></a>
        <div className="chapter-readout"><span>{chapters[chapter]?.index}</span>{chapters[chapter]?.eyebrow}</div>
        <a className="quiet-link" href="#hybrid">See the system</a>
      </header>
      <aside className="progress-rail" aria-hidden="true">
        <span className="progress-fill" style={{ transform: `scaleY(${progress})` }} />
        {chapters.map((item, index) => <i className={index === chapter ? 'active' : ''} key={item.id} />)}
      </aside>
    </>
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
  useEffect(() => {
    window.scrollTo(0, 0)
    const motion = animate(hero.current.querySelectorAll('.hero-beat'), {
      opacity: [0, 1],
      translateY: [22, 0],
      delay: stagger(115, { start: 180 }),
      duration: 900,
      ease: 'out(4)',
    })
    return () => motion.cancel()
  }, [])

  return (
    <div className="app-shell">
      <ScrollDirector />
      <Navigation />
      <Suspense fallback={<div className="scene-shell scene-loading" aria-hidden="true" />}>
        <HazineScene />
      </Suspense>
      <main className="experience">
        <Section chapter={chapters[0]} className="hero-section">
          <div className="hero-copy" ref={hero}>
            <p className="hero-beat eyebrow">For Ezgi · A guided encounter with Hazine</p>
            <div className="hero-beat hero-wordmark" aria-label="Hazine">HAZINE</div>
            <h1 className="hero-beat">A living treasury<br />of intelligence.</h1>
            <p className="hero-beat hero-intro">Not a dashboard with a chatbot attached. A persistent intelligence layer surrounding the craft of a trader.</p>
            <a className="hero-beat enter-link" href="#quarry"><span>Enter the story</span><i>↓</i></a>
          </div>
          <div className="hero-side-note hero-beat"><span>Collect</span><span>Connect</span><span>Surface</span></div>
        </Section>

        <Section chapter={chapters[1]}>
          <div className="story-card align-left">
            <p className="reveal chapter-index">01 / The quarry</p>
            <h2 className="reveal">Intelligence begins as terrain.</h2>
            <p className="reveal body-large">Markets arrive as layers: prices, calls, claims, memories, people, and pressure. Valuable, but not yet legible.</p>
            <div className="reveal tension-line"><span>Raw information</span><i /><span>Strategic context</span></div>
          </div>
        </Section>

        <Section chapter={chapters[2]}>
          <div className="light-workspace">
            <div className="story-card align-right">
              <p className="reveal chapter-index">02 / Collect</p>
              <h2 className="reveal">Gather deliberately.<br />Lose nothing.</h2>
              <p className="reveal">The desktop receives the full working world. The plugin captures intelligence in the moment—without pulling Ezgi away from the conversation.</p>
            </div>
            <div className="reveal widget-wrap"><CollectionWidget /></div>
          </div>
        </Section>

        <Section chapter={chapters[3]}>
          <div className="story-card align-left narrow">
            <p className="reveal chapter-index">03 / Discern</p>
            <h2 className="reveal">Find the signal inside the noise.</h2>
            <p className="reveal body-large">Hazine is explicit about what it knows, what it notices, and what it is still testing.</p>
          </div>
          <div className="reveal floating-widget"><TaxonomyWidget /></div>
        </Section>

        <Section chapter={chapters[4]}>
          <div className="light-workspace split-layout">
            <div className="story-card">
              <p className="reveal chapter-index">04 / Connect</p>
              <h2 className="reveal">Context is the real asset.</h2>
              <p className="reveal">A commodity touches a market. A signal echoes a call. A claim points back to a person. A past hypothesis changes the meaning of today.</p>
            </div>
            <div className="reveal"><ConnectionWidget /></div>
          </div>
        </Section>

        <Section chapter={chapters[5]}>
          <div className="light-workspace split-layout reverse">
            <div className="story-card">
              <p className="reveal chapter-index">05 / Preserve</p>
              <h2 className="reveal">Every conclusion keeps its receipts.</h2>
              <p className="reveal">Source, speaker, timestamp, confidence, and reasoning travel together. Provenance is not metadata around the intelligence. It is part of the intelligence.</p>
            </div>
            <div className="reveal"><ProvenanceWidget /></div>
          </div>
        </Section>

        <Section chapter={chapters[6]}>
          <div className="story-card align-left narrow">
            <p className="reveal chapter-index">06 / Surface</p>
            <h2 className="reveal">The right memory returns.</h2>
            <p className="reveal">Not because Ezgi searched for it. Because the present moment made it relevant.</p>
          </div>
          <div className="reveal floating-widget recall-float"><RecallWidget /></div>
        </Section>

        <Section chapter={chapters[7]}>
          <div className="light-workspace hybrid-workspace">
            <div className="story-card center-copy">
              <p className="reveal chapter-index">07 / Desktop + agent</p>
              <h2 className="reveal">One intelligence.<br />Two natural surfaces.</h2>
              <p className="reveal">The desktop is the treasury. The plugin is the doorway that follows Ezgi into the work.</p>
            </div>
            <div className="reveal"><HybridWidget /></div>
            <figure className="reveal approved-system">
              <img src="/brand/hazine-design-system-with-icon.png" alt="Approved Hazine design system, wordmark, glyph, lockup, and mineral-sparkle app icon" />
              <figcaption>Approved visual system · immutable source assets</figcaption>
            </figure>
          </div>
        </Section>

        <Section chapter={chapters[8]} className="final-section">
          <div className="final-copy">
            <p className="reveal eyebrow">The living treasury</p>
            <h2 className="reveal">What Ezgi knows<br />does not disappear.</h2>
            <p className="reveal body-large">It gathers context. It keeps its lineage. It returns with purpose.</p>
            <div className="reveal final-equation"><span>Collect</span><i>→</i><span>Connect</span><i>→</i><span>Surface</span></div>
            <div className="reveal final-lockup"><strong>HAZINE</strong><span>A living treasury of intelligence</span></div>
          </div>
        </Section>
      </main>
    </div>
  )
}
