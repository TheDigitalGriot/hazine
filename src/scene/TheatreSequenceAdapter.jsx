import { useFrame } from '@react-three/fiber'
import { useExperience } from '../state/experience.js'

/**
 * Theatre is an optional modifier/authoring surface. Scroll remains canonical;
 * keeping this bridge isolated prevents a second camera or timeline owner.
 */
export function TheatreSequenceAdapter({ sheet, duration = 8 }) {
  useFrame(() => {
    if (!sheet?.sequence) return
    sheet.sequence.position = useExperience.getState().progress * duration
  })
  return null
}
