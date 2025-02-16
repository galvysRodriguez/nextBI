

import { create } from "zustand";

export const useTableContext = create((set, get) => ({
  columns: [],
  rows: [],
  groupedColumns: [],

  setColumns: (columns) => set({ columns }),
  setRows: (rows) => set({ rows }),

  // Función para obtener filas filtradas o todas las filas
  getFilteredRows: (filterFn) => {
    const rows = get().rows;
    return filterFn ? rows.filter(filterFn) : rows;
  },

  // Función para obtener solo las filas seleccionadas
  getSelectedRows: (selectedRowIds) => {
    return get().rows.filter((row) => selectedRowIds.includes(row.id));
  },

  // Función para actualizar un dato específico en la tabla
  updateRow: (id, newrows) => {
    set((state) => ({
      rows: state.rows.map((row) =>
        row.id === id ? { ...row, ...newrows } : row
      ),
    }));
  },

  // Función para actualizar múltiples filas
  updateMultipleRows: (updates) => {
    set((state) => ({
      rows: state.rows.map((row) =>
        updates[row.id] ? { ...row, ...updates[row.id] } : row
      ),
    }));
  },

  // Manejo de agrupaciones dinámicas
  setGroupedColumns: (columns) => set({ groupedColumns: columns }),
}));
