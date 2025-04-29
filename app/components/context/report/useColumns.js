import { create } from 'zustand';

export const useColumns = create((set) => ({
  columns: [],
  setColumns: (columns) => set({ columns }),
}));
