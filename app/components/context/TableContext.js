

import { setConfig } from "next/config";
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


export const useTableDataContext = create((set, get) => ({
  groupedColumns: [],
  isLoading:false,
  refetch: () => {},
  rows: [],
  selectedRows: [],
  orderBy: 'id',
  order: 'asc',
  columns: [],
  sorting:[],
  filters:[],
  search: "",
  pagination: { pageIndex: 0, pageSize: 10 },
  pageCount: 0,
  totalRows: 0,

  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
  setRows: (rows) => set({ rows }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filters) => set({ filters }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  setPagination: (pagination) => set({ pagination }),
  setColumns: (columns) => set({ columns }),
  setorderBy: (orderBy) => set({ orderBy }),
  setOrder: (order) => set({ order }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setRefetch: (refetch) => set({ refetch}),
  setSearch: (search) => set({ search }),
  setPageCount: (pageCount) => set({ pageCount}),
  setTotalRows: (totalRows) => set({ totalRows}),
}));
