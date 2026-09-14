import { chapters } from '../config/experienceManifest.js'
import { useExperience } from '../state/experience.js'
import { assetUrl } from '../lib/assetUrl.js'

export default function InstrumentRail() {
  const chapter = useExperience((state) => state.chapter)
  const progress = useExperience((state) => state.progress)
  const current = chapters[chapter]?.instrument || chapters[0].instrument

  return (
    <nav className="instrument-rail" aria-label="Hazine story instruments">
      <div className="instrument-island" aria-live="polite">
        <span className="instrument-signal" />
        <span className="instrument-copy"><small>{current[0]}</small><strong>{current[1]}</strong></span>
        <span className="instrument-index">{chapters[chapter]?.index}</span>
      </div>
      <div className="instrument-track">
        <span className="instrument-progress" style={{ '--story-progress': progress }} />
        {chapters.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={index === chapter ? 'is-active' : ''}
            aria-label={`Go to ${item.eyebrow}`}
            aria-current={index === chapter ? 'step' : undefined}
          >
            <i />
            <span>{item.eyebrow}</span>
          </a>
        ))}
      </div>
      <a className="instrument-workbench" href={assetUrl('/workbench/')}>Open live system <span>↗</span></a>
    </nav>
  )
}
