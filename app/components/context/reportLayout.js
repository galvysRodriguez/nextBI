import { create } from "zustand";

export const useReportLayout = create((set, get) => ({
  format: 'pdf',
  scope: 'current',
  isMenuOpen: false,
  isChart: false,
  isMenuChartOpen:false,

  setFormat: (format) => set({ format }),
  setScope: (scope) => set({ scope}),
  setIsChart: () => set((state) => ({ isChart: !state.isChart })),

  setIsMenuChartOpen: () => set((state) => ({
    isMenuChartOpen: !state.isMenuChartOpen,
    isMenuOpen: false, 
  })),
  
  setIsMenuOpen: () => set((state) => ({
    isMenuOpen: !state.isMenuOpen,
    isMenuChartOpen: false, 
  })),
}));
