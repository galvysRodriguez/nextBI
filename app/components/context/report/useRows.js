import { create } from 'zustand';

export const useRows = create((set) => ({
  rows: [],
  setRows: (rows) => set({ rows }),
}));