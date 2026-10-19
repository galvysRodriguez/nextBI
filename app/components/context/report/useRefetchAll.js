import { create } from 'zustand';

export const useRefetchAll = create((set) => ({
  refetchAll: [],
  setRefetchAll: (refetchAll) => set({ refetchAll }),
}));