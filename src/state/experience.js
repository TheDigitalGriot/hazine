import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultMomentId } from '../data/liveMeeting.js'

export const useExperience = create(persist((set) => ({
  progress: 0,
  chapter: 0,
  reducedMotion: false,
  sealHovered: false,
  treasuryOpen: false,
  selectedMomentId: defaultMomentId,
  surface: 'plugin',
  playing: true,
  activePanel: 'live',
  setProgress: (progress) => set({ progress }),
  setChapter: (chapter) => set({ chapter }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setSealHovered: (sealHovered) => set({ sealHovered }),
  openTreasury: () => set({ treasuryOpen: true }),
  setSelectedMoment: (selectedMomentId, manual = true) => set((state) => ({
    selectedMomentId,
    playing: manual ? false : state.playing,
  })),
  setSurface: (surface) => set({ surface }),
  setPlaying: (playing) => set({ playing }),
  setActivePanel: (activePanel) => set({ activePanel }),
}), {
  name: 'hazine-experience',
  version: 2,
  migrate: (persisted) => ({
    selectedMomentId: persisted?.selectedMomentId ?? defaultMomentId,
    activePanel: persisted?.activePanel ?? 'live',
  }),
  partialize: ({ selectedMomentId, activePanel }) => ({ selectedMomentId, activePanel }),
}))
