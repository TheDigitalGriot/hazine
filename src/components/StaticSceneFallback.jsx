import { chapters } from '../data/chapters.js'
import { useExperience } from '../state/experience.js'

export default function StaticSceneFallback({ loading = false, onRetry }) {
  const chapter = useExperience((state) => state.chapter)
  const current = chapters[chapter] ?? chapters[0]

  return (
    <div className={`scene-shell static-scene ${loading ? 'is-loading' : 'is-fallback'}`} data-chapter={current.id}>
      <div className="static-vault" />
      <div className="static-mineral" />
      <div className="scene-loader" role="status" aria-live="polite">
        <span />
        {loading ? 'opening the treasury' : `${current.eyebrow} · static story mode`}
        {!loading && onRetry && <button type="button" onClick={onRetry}>Retry 3D</button>}
      </div>
    </div>
  )
}
