import { create } from 'zustand';

export const useSelectedRows = create((set) => ({
  selectedRows: [],
  setSelectedRows: (selectedRows) => set({ selectedRows }),
}));