

import { create } from "zustand";

export const useTableContext = create((set, get) => ({
 
  groupedColumns: [],
  table:[],
  sorting:[],
  filter:[],
  filterFns: {
    id: "contains", 
    client: "fuzzy",
    product: "fuzzy",
    category: "fuzzy",
    subCategory: "fuzzy",
    deposit: "fuzzy",
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
      // Validar filtros de texto (id, client, product)
      const textFiltersPassed =
        (!filter.id || filter.id === '' || (row.id && row.id.includes(filter.id))) &&
        (!filter.client || filter.client === '' || (row.client && row.client.includes(filter.client))) &&
        (!filter.product || filter.product === '' || (row.product && row.product.includes(filter.product))) &&
        (!filter.category || filter.category === '' || (row.category && row.category.includes(filter.category))) &&
        (!filter.subCategory || filter.subCategory === '' || (row.subCategory && row.subCategory.includes(filter.subCategory))) &&
        (!filter.deposit || filter.deposit === '' || (row.deposit && row.deposit.includes(filter.deposit)));
  
      // Validar filtros de rango (quantity, price, amount)
      const rangeFiltersPassed =
        (!filter.quantity?.min || row.quantity >= filter.quantity.min) &&
        (!filter.quantity?.max || row.quantity <= filter.quantity.max) &&
        (!filter.price?.min || row.price >= filter.price.min) &&
        (!filter.price?.max || row.price <= filter.price.max) &&
        (!filter.amount?.min || row.amount >= filter.amount.min) &&
        (!filter.amount?.max || row.amount <= filter.amount.max);
  
      // Validar filtros de fecha (date.start y date.end)
      console.log(row.date, "a", filter.date);
      const dateFiltersPassed =
        (!filter.date?.value[0].toDate() || new Date(row.date) >= filter.date.value[0].toDate()) &&
        (!filter.date?.value[1].toDate() || new Date(row.date) <= filter.date.value[1].toDate());
  
      // Si todos los filtros pasan, incluir la fila
      return textFiltersPassed && rangeFiltersPassed && dateFiltersPassed;
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
