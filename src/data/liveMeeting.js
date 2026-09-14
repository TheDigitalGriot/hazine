export const participants = {
  ezgi: { id: 'ezgi', name: 'Ezgi', initials: 'EZ', role: 'Commodities trader' },
  marco: { id: 'marco', name: 'Marco Vidal', initials: 'MV', role: 'Commercial Director · Santiago Metals' },
}

const commonGeography = {
  origin: { label: 'Toronto · Ezgi', lat: 43.6532, lng: -79.3832 },
  corridor: { label: 'Antofagasta · Mine corridor', lat: -23.65, lng: -70.4 },
  commodity: 'Copper concentrate',
}

export const meetingMoments = [
  {
    id: 'moment-1', speakerId: 'marco', time: '09:41:52', taxonomy: 'FACT',
    text: 'The northern smelter is officially scheduled for six weeks, but eight is becoming more realistic.',
    confidence: 78, insight: 'The official schedule and the counterparty expectation now diverge.', geography: commonGeography,
    evidence: [{ id: 'source-call-1', label: 'Live call transcript', type: 'primary', source: 'Marco Vidal', timestamp: '09:41:52', retrievedAt: 'Live', confidence: 100 }],
    relationship: { title: 'Marco distinguishes official language from his operating expectation.', basis: 'Observed in this call', confidence: 78 },
    strategy: { title: 'Clarify the operational trigger behind the eight-week case.', rationale: 'The variance is material but not yet independently confirmed.', supports: ['source-call-1'] },
  },
  {
    id: 'moment-2', speakerId: 'ezgi', time: '09:42:06', taxonomy: 'HYPOTHESIS',
    text: 'How much concentrate is already committed through the maintenance window?',
    confidence: 69, insight: 'Ezgi tests whether the maintenance extension will translate into spot scarcity.', geography: commonGeography,
    evidence: [{ id: 'source-note-1', label: 'Ezgi research note', type: 'memory', source: 'Supply hypothesis · Feb 12', timestamp: '14:08', retrievedAt: '09:42:06', confidence: 83 }],
    relationship: { title: 'Ezgi uses bounded questions to turn ambiguity into commercial terms.', basis: '3 sourced negotiations', confidence: 82 },
    strategy: { title: 'Test committed volume before discussing price.', rationale: 'Availability determines whether the extension changes bargaining leverage.', supports: ['source-note-1'] },
  },
  {
    id: 'moment-3', speakerId: 'marco', time: '09:42:16', taxonomy: 'SIGNAL',
    text: 'Almost seventy percent. Spot availability will be thin if the restart slips into Q3.',
    confidence: 87, insight: 'Supply risk is moving from hypothesis to evidence.', geography: commonGeography,
    evidence: [
      { id: 'source-call-2', label: 'Live call transcript', type: 'primary', source: 'Marco Vidal', timestamp: '09:42:16', retrievedAt: 'Live', confidence: 100 },
      { id: 'source-lme-1', label: 'LME daily warehouse report', type: 'market', source: 'LME warehouse stocks', timestamp: '08:00 UTC', retrievedAt: '09:30 UTC', confidence: 94 },
    ],
    relationship: { title: 'Concrete volume questions produce operational candour.', basis: '4 calls · 2 completed trades', confidence: 89 },
    strategy: { title: 'Preserve the 70% commitment figure and test Q3 protection.', rationale: 'The live claim aligns with declining regional inventory.', supports: ['source-call-2', 'source-lme-1'] },
  },
  {
    id: 'moment-4', speakerId: 'ezgi', time: '09:42:31', taxonomy: 'INTERPRETATION',
    text: 'That overlaps with the inventory decline we discussed in February.',
    confidence: 91, insight: 'Two independent signals now support the earlier supply hypothesis.', geography: commonGeography,
    evidence: [
      { id: 'source-note-1', label: 'February supply hypothesis', type: 'memory', source: 'Ezgi research note', timestamp: 'Feb 12 · 14:08', retrievedAt: '09:42:31', confidence: 83 },
      { id: 'source-lme-1', label: 'LME inventory decline', type: 'market', source: 'LME daily warehouse report', timestamp: '08:00 UTC', retrievedAt: '09:30 UTC', confidence: 94 },
    ],
    relationship: { title: 'Marco responds when market evidence is connected to his own operating detail.', basis: 'Call + email history', confidence: 78 },
    strategy: { title: 'Use the overlap as evidence, not as certainty.', rationale: 'The inference is strong and sourced, but restart timing remains fluid.', supports: ['source-note-1', 'source-lme-1'] },
  },
  {
    id: 'moment-5', speakerId: 'marco', time: '09:42:43', taxonomy: 'STRATEGY',
    text: 'I can protect your current treatment charge, but I need the volume agreed today.',
    confidence: 93, insight: 'A time-bound concession is on the table.', geography: commonGeography,
    evidence: [
      { id: 'source-call-3', label: 'Live commercial term', type: 'primary', source: 'Marco Vidal', timestamp: '09:42:43', retrievedAt: 'Live', confidence: 100 },
      { id: 'source-pattern-1', label: 'Relationship pattern', type: 'relationship', source: '4 calls · 2 trades', timestamp: '14-month history', retrievedAt: '09:42:43', confidence: 89 },
    ],
    relationship: { title: 'Concessions arrive when volume certainty is paired with a deadline.', basis: '4 calls · 2 completed trades', confidence: 89 },
    strategy: { title: 'Confirm authority, request revised tonnage, and hold the charge until four.', rationale: 'The offer matches Marco’s sourced closing pattern and remains explicitly time-bound.', supports: ['source-call-3', 'source-pattern-1'] },
  },
  {
    id: 'moment-6', speakerId: 'ezgi', time: '09:42:58', taxonomy: 'STRATEGY',
    text: 'Send the revised tonnage and hold the charge until four. If the source documents align, we can close.',
    confidence: 96, insight: 'Ezgi converts live intelligence into a conditional, accountable close.', geography: commonGeography,
    evidence: [{ id: 'source-call-4', label: 'Ezgi closing response', type: 'primary', source: 'Ezgi', timestamp: '09:42:58', retrievedAt: 'Live', confidence: 100 }],
    relationship: { title: 'Ezgi protects optionality while naming the evidence needed to close.', basis: 'Live decision', confidence: 96 },
    strategy: { title: 'Await revised tonnage and validate the supporting documents.', rationale: 'The commercial window is preserved without severing the source requirement.', supports: ['source-call-4'] },
  },
]

export const defaultMomentId = 'moment-3'
export const momentById = (id) => meetingMoments.find((moment) => moment.id === id) ?? meetingMoments[0]
