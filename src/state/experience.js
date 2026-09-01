import { create } from 'zustand'

export const useExperience = create((set) => ({
  progress: 0,
  chapter: 0,
  reducedMotion: false,
  setProgress: (progress) => set({ progress }),
  setChapter: (chapter) => set({ chapter }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}))
