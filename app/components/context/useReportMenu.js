import { create } from 'zustand';

export const useReportMenu = create((set) => ({
  isMenuOpen: false,
  isMenuChartOpen: false,
  
  setIsMenuOpen: () => set((state) => ({
    isMenuOpen: !state.isMenuOpen,
    isMenuChartOpen: false,
  })),
  
  setIsMenuChartOpen: () => set((state) => ({
    isMenuChartOpen: !state.isMenuChartOpen,
    isMenuOpen: false,
  })),
}));
