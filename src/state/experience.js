import { create } from 'zustand'

export const useExperience = create((set) => ({
  progress: 0,
  chapter: 0,
  reducedMotion: false,
  sealHovered: false,
  treasuryOpen: false,
  setProgress: (progress) => set({ progress }),
  setChapter: (chapter) => set({ chapter }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setSealHovered: (sealHovered) => set({ sealHovered }),
  openTreasury: () => set({ treasuryOpen: true }),
}))
