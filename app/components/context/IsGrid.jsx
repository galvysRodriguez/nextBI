import { create } from 'zustand'


export const useIsGrid = create((set) => ({
  grid: true,
  changeGrid: () => set((state) => ({ grid: !state.grid })),
}))

export const useIsExpanded = create((set) => ({
  expanded: false,
  changeExpanded: () => set((state) => ({ expanded: !state.expanded })),
}))

export const useIsMobile = create((set) => ({
  mobile: false,
  changeMobile: () => set((state) => ({ mobile: !state.mobile })),
}))

export const useSearchTarget = create((set) => ({
  search: "",
  changeSearch: (search) => set({ search }),
}))
