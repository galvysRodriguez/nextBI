

import { create } from "zustand";

export const useTableContext = create((set, get) => ({
 
  groupedColumns: [],
  table:[],
  sorting:[],
  filter:[],
  filterFns: {
    id: "contains", 
    client: "contains",
    product: "contains",
    category: "contains",
    subCategory: "contains",
    deposit: "contains",
    quantity: "between",
    price: "between",
    amount: "between",
    date: "between",
  },
  setTable: (table) => set({table}),
  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
  setSorting: (sorting) => set({ sorting }),
  setFilter: (filter) => set({ filter }),
  setFilterFns: (filterFns) => set({ filterFns }),

  getFilteredRows: (rows) => {
    const { filter } = get(); 
  
    return rows.filter((row) => {
      return filter.every((f) => {
        const { id, value } = f; 
        switch (id) {
          
          case 'id':
          case 'client':
          case 'product':
          case 'category':
          case 'subCategory':
          case 'deposit':
            return (
              !value || 
              value === '' || 
              (row[id] && row[id].toString().toLowerCase().includes(value.toLowerCase())) 
            );
  
          
          case 'quantity':
          case 'price':
          case 'amount':
            return (
              (!f.min || row[id] >= f.min) && 
              (!f.max || row[id] <= f.max) 
            );
  
          
          case 'date':
            return (
              (!f.value?.[0] || new Date(row.date) >= new Date(f.value[0])) && 
              (!f.value?.[1] || new Date(row.date) <= new Date(f.value[1])) 
            );
  
          
          default:
            return true;
        }
      });
    });
  },


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
