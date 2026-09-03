export const participants = {
  ezgi: { name: 'Ezgi', initials: 'EZ', role: 'Commodities trader' },
  marco: { name: 'Marco Vidal', initials: 'MV', role: 'Commercial Director · Santiago Metals' },
}

export const transcript = [
  { id: 0, time: '09:41:52', speaker: 'marco', text: 'The northern smelter is officially scheduled for six weeks, but eight is becoming more realistic.' },
  { id: 1, time: '09:42:06', speaker: 'ezgi', text: 'How much concentrate is already committed through the maintenance window?' },
  { id: 2, time: '09:42:16', speaker: 'marco', text: 'Almost seventy percent. Spot availability will be thin if the restart slips into Q3.', signal: true },
  { id: 3, time: '09:42:31', speaker: 'ezgi', text: 'That overlaps with the inventory decline we discussed in February.' },
  { id: 4, time: '09:42:43', speaker: 'marco', text: 'It does. I can protect your current treatment charge, but I need the volume agreed today.', deal: true },
  { id: 5, time: '09:42:58', speaker: 'ezgi', text: 'Send the revised tonnage and hold the charge until four. If the source documents align, we can close.' },
]

export const sources = [
  { label: 'Santiago Metals maintenance bulletin', meta: 'SM-24-08 · issued Aug 29', confidence: 'Primary' },
  { label: 'LME copper warehouse stocks', meta: 'Daily series · 08:00 UTC', confidence: 'Verified' },
  { label: 'Ezgi’s supply hypothesis', meta: 'Research note · Feb 12 · 14:08', confidence: 'Internal' },
  { label: 'Marco Vidal relationship history', meta: '4 calls · 2 completed trades', confidence: 'Observed' },
]
