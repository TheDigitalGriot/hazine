const options = [
  { id: 'plugin', label: 'Claude plugin' },
  { id: 'desktop', label: 'Desktop app' },
]

export default function SurfaceToggle({ surface, onChange, compact = false }) {
  return (
    <div className={`hz-surface-toggle ${compact ? 'is-compact' : ''}`} role="group" aria-label="Choose Hazine product surface">
      {!compact && <span>VIEW AS</span>}
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={surface === option.id ? 'is-active' : ''}
          aria-pressed={surface === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
