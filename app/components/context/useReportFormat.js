import { create } from 'zustand';

export const useReportFormat = create((set) => ({
  format: 'pdf',
  setFormat: (format) => set({ format }),
}));
