import { chapters } from '../data/chapters.js'
import { useExperience } from '../state/experience.js'

const instruments = [
  ['Threshold', 'Enter the treasury'],
  ['Terrain', '6 sources detected'],
  ['Capture', '5 streams listening'],
  ['Discern', 'Taxonomy explicit'],
  ['Connect', '18 relationships'],
  ['Preserve', 'Lineage verified'],
  ['Surface', 'Memory ready'],
  ['System', 'Two living surfaces'],
  ['Treasury', 'Context compounds'],
]

export default function InstrumentRail() {
  const chapter = useExperience((state) => state.chapter)
  const progress = useExperience((state) => state.progress)
  const current = instruments[chapter] || instruments[0]

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
      <a className="instrument-workbench" href="/workbench">Open live system <span>↗</span></a>
    </nav>
  )
}
