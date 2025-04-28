import { create } from 'zustand';

export const useReportScope = create((set) => ({
  scope: 'current',
  setScope: (scope) => set({ scope }),
}));
