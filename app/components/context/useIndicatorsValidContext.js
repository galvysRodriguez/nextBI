import { create } from 'zustand';

export const useIndicatorsValidContext = create((set) => ({
  indicatorsValid: [],
  setIndicatorsValid: (indicatorsValid) => set({ indicatorsValid }),
}));