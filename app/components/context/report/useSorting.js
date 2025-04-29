import { create } from 'zustand';

export const useSorting = create((set) => ({
  sorting: [],
  setSorting: (sorting) => set({ sorting }),
}));
