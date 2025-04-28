import { create } from 'zustand';

export const useReportChart = create((set) => ({
  selectedChart: 'line',
  setSelectedChart: (chartKey) => set({ selectedChart: chartKey }),
}));