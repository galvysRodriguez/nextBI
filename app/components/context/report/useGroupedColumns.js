import { create } from 'zustand';

export const useGroupedColumns = create((set) => ({
  groupedColumns: [],
  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
}));