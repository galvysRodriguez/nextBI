import { create } from 'zustand';

export const useFilters = create((set) => ({
  filters: [],
  setFilter: (filters) => set({ filters }),
}));