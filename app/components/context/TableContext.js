

import { create } from "zustand";

export const useTableContext = create((set, get) => ({
 
  groupedColumns: [],
  table:[],
  sorting:[],
  filters:[],
  filterFns: {
    id: "contains", 
    client: "contains",
    product: "contains",
    category: "contains",
    subCategory: "contains",
    deposit: "contains",
    quantity: "betweenInclusive",
    price: "betweenInclusive",
    amount: "betweenInclusive",
    date: "betweenInclusive",
  },
  setTable: (table) => set({table}),
  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filters) => set({ filters }),
  setFilterFns: (filterFns) => set({ filterFns }),

  

}));
