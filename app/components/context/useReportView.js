import { create } from 'zustand';

export const useReportView = create((set) => ({
  isChart: false,
  setIsChart: () => set((state) => ({ isChart: !state.isChart })),
}));