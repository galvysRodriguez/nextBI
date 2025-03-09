

import { create } from "zustand";

export const useTableContext = create((set, get) => ({
 
  groupedColumns: [],
  table:[],
  sorting:[],
  filer:[],
  setTable: (table) => set({table}),
  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filter) => set({ filter }),



  groupRows: (rows) => {
    const { groupedColumns } = get();
    if (!groupedColumns.length) return rows;

    return rows.reduce((acc, row) => {
      const key = groupedColumns.map((col) => row[col]).join(" - ");
      if (!acc[key]) {
        acc[key] = { ...row, groupedBy: key, count: 1 };
      } else {
        acc[key].count += 1;
        acc[key].amount += row.amount; // Sumar montos si se agrupa
      }
      return acc;
    }, {});
  },

  // Método para transformar columnas según la agrupación
  groupColumns: (columns) => {
    const { groupedColumns } = get();
    return columns.map((col) => ({
      ...col,
      isGrouped: groupedColumns.includes(col.accessorKey),
    }));
  },

  getGroupedColumnValues: (rows) => {
    const { groupedColumns } = get();
    
    if (!groupedColumns.length) return rows.map((row) => row.invoice); 
    return rows.map((row) => groupedColumns.map((col) => row[col]).join(" - "))
  },

  groupRowsWithAmount: (rows) => {
    const { groupedColumns } = get();
  
    // Si no hay columnas agrupadas, devolver las filas con un formato consistente
    if (!groupedColumns.length) {
      return rows.map((row) => ({
        ...row,
        totalAmount: row.amount, 
      }));
    }
    return rows.reduce((acc, row) => {
      const groupKey = groupedColumns.map((col) => row[col]).join(" - ");
  
      if (!acc[groupKey]) {
        acc[groupKey] = {
          ...row,
          groupedBy: groupKey,
          count: row.quantity,
          totalAmount: row.amount,
        };
      } else {
        acc[groupKey].count += row.quantity;
        acc[groupKey].totalAmount += row.amount;
      }
  
      return acc;
    }, {});
  },

}));
