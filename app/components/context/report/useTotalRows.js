import { create } from 'zustand';

export const useTotalRows = create((set) => ({
  totalRows: 0,
  setTotalRows: (totalRows) => set({ totalRows }),
}));
