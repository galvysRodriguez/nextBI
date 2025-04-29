import { create } from 'zustand';

export const usePageCount = create((set) => ({
  pageCount: 0,
  setPageCount: (pageCount) => set({ pageCount }),
}));
