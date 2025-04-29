import { create } from 'zustand';

export const usePaginationTable = create((set) => ({
  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
}));
