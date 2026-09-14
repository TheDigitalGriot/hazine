import { meetingMoments, participants } from '../../data/liveMeeting.js'

export default function MomentList({ selectedMomentId, onSelect, compact = false, enabled = true }) {
  return (
    <div className={`hz-moment-list ${compact ? 'is-compact' : ''}`} aria-label="Real-time meeting transcript">
      {meetingMoments.map((moment) => {
        const person = participants[moment.speakerId]
        const selected = selectedMomentId === moment.id
        return (
          <button
            key={moment.id}
            type="button"
            className={`hz-moment ${selected ? 'is-selected' : ''}`}
            aria-current={selected ? 'true' : undefined}
            aria-label={`${person.name} at ${moment.time}: ${moment.text}`}
            tabIndex={enabled ? 0 : -1}
            onClick={() => onSelect(moment.id)}
          >
            <span className="hz-avatar" aria-hidden="true">{person.initials}</span>
            <span className="hz-moment-copy">
              <small>{person.name} · {moment.time}</small>
              <strong>{moment.text}</strong>
              <em data-taxonomy={moment.taxonomy}>{moment.taxonomy}</em>
            </span>
          </button>
        )
      })}
    </div>
  )
}
