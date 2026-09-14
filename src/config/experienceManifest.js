export const taxonomy = [
  { label: 'FACT', detail: 'Observed and directly supported', color: '#2f7a65' },
  { label: 'SIGNAL', detail: 'A meaningful change or pattern', color: '#2f6690' },
  { label: 'INTERPRETATION', detail: 'A reasoned reading of the evidence', color: '#825817' },
  { label: 'HYPOTHESIS', detail: 'A testable possibility', color: '#7b4d8f' },
  { label: 'STRATEGY', detail: 'A decision with accountable reasoning', color: '#99462f' },
]

export const chapters = [
  { id: 'threshold', index: '00', eyebrow: 'The threshold', title: 'Every treasury begins with a passage.', tone: 'dark', instrument: ['Threshold', 'Enter the treasury'], overlay: null },
  { id: 'vault', index: '01', eyebrow: 'The inner room', title: 'Enter the living treasury.', tone: 'dark', instrument: ['Passage', 'Two rooms · one memory'], overlay: null },
  { id: 'call', index: '02', eyebrow: 'The live call', title: 'Ezgi never has to leave the conversation.', tone: 'dark', instrument: ['Capture', 'Live meeting listening'], overlay: { eyebrow: 'Live meeting', title: 'Hazine is listening for what changes the decision.' } },
  { id: 'geography', index: '03', eyebrow: 'The wider world', title: 'A phrase becomes geography.', tone: 'dark', instrument: ['Terrain', 'Geography connected'], overlay: { eyebrow: 'Geographic context', title: 'The conversation expands from room to market.' } },
  { id: 'evidence', index: '04', eyebrow: 'Evidence', title: 'A claim becomes inspectable.', tone: 'dark', instrument: ['Discern', 'Lineage intact'], overlay: { eyebrow: 'Evidence lineage', title: 'A spoken claim becomes inspectable intelligence.' } },
  { id: 'relationship', index: '05', eyebrow: 'Relationship', title: 'Every person carries a living history.', tone: 'dark', instrument: ['Connect', 'Persona evolving'], overlay: { eyebrow: 'Relationship memory', title: 'The person speaking has a history, not just a name.' } },
  { id: 'decision', index: '06', eyebrow: 'Decision window', title: 'The right moment becomes visible.', tone: 'dark', instrument: ['Surface', 'Decision window open'], overlay: { eyebrow: 'Decision window', title: 'The closing moment appears while it can still matter.' } },
  { id: 'walkthrough', index: '07', eyebrow: 'Knowledge system', title: 'Collect. Discern. Connect. Surface.', tone: 'light', instrument: ['Knowledge', 'Meaning transforms'], overlay: null },
  { id: 'hybrid', index: '08', eyebrow: 'Desktop + plugin', title: 'One intelligence, wherever the work happens.', tone: 'light', instrument: ['System', 'Two living surfaces'], overlay: null },
  { id: 'treasury', index: '09', eyebrow: 'The living treasury', title: 'The system gets richer every time Ezgi thinks.', tone: 'dark', instrument: ['Treasury', 'Context compounds'], overlay: null },
]

export const actors = [
  { key: 'threshold', focus: 0.035, spread: 0.085, scale: 0.13, position: [-1.25, -4.2, 0], rotation: [0, 0.7, 0], mobile: { scale: 0.1, position: [-0.5, -3.8, 0] } },
  { key: 'vault', focus: 0.14, spread: 0.11, scale: 0.34, position: [0, -0.78, 0], rotation: [0, 0, 0], passage: true, mobile: { scale: 0.28 } },
  { key: 'office', focus: 0.265, spread: 0.064, scale: 0.42, position: [-1.25, -0.16, 0.05], rotation: [0, -0.06, 0], hide: ['Background'], mobile: { scale: 0.34, position: [-0.55, -0.2, 0.1] } },
  { key: 'caller', focus: 0.265, spread: 0.06, scale: 1.48, position: [0.72, -1.08, 0.7], rotation: [0, 2.72, 0], mobile: { scale: 1.08, position: [0.45, -1.05, 0.5] } },
  { key: 'building', focus: 0.338, spread: 0.048, scale: 0.021, position: [-0.72, -2.3, 0.62], rotation: [0, -0.22, 0], mobile: { scale: 0.016, position: [-0.3, -2.1, 0.5] } },
  { key: 'quarry', focus: 0.505, spread: 0.085, scale: 0.42, position: [1.48, -0.82, 0], rotation: [-0.2, -0.7, 0], mobile: { scale: 0.31, position: [0.6, -0.7, 0] } },
  { key: 'truck', focus: 0.565, spread: 0.07, scale: 0.11, position: [1.45, -2.35, 0], rotation: [0, 0.54, 0], drift: true, mobile: { scale: 0.08, position: [0.7, -2.05, 0] } },
  { key: 'crystal', focus: 0.625, spread: 0.085, scale: 0.55, position: [1.7, -0.62, 0], rotation: [0.05, -0.4, 0], crystal: true, mobile: { scale: 0.4, position: [0.72, -0.5, 0] } },
]

export const safeZones = {
  desktop: { copy: 'left 38%', scene: 'center 42%', intelligence: 'right 330px', sceneOffsetX: 0.18 },
  mobile: { copy: 'top 34%', scene: 'middle 38%', intelligence: 'bottom 28%', sceneOffsetX: 0, maxWidth: 760 },
}

export const experienceManifest = { chapters, actors, taxonomy, safeZones }

if (new Set(chapters.map((chapter) => chapter.id)).size !== 10) {
  throw new Error('Hazine experience manifest requires ten unique chapter IDs.')
}
