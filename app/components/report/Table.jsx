"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { ExportButtons } from "./ExportButtons";
import { Chart } from "./Chart";
import { useTableContext } from "../context/TableContext";
import dayjs from 'dayjs';


function isDayjsObject(obj) {
  return obj instanceof dayjs().constructor && obj.constructor.name === 'Dayjs';
}

const Table = ({ rows, initialColumns }) => {
  const [data, setData] = useState([]);
  const { groupedColumns, setGroupedColumns, setSorting, sorting, setFilter, filters, filterFns, setFilterFns } = useTableContext();
  

  useEffect(() => {
    const rowsWithFormattedDates = rows.map((item) => {
      const date = new Date(item.date ?? new Date().toISOString().split("T")[0]);
      const dayOfWeek = date.toLocaleString('es', { weekday: 'long' });
      const weekOfMonth = Math.ceil(date.getDate() / 7);
      const middleOfMonth = Math.ceil(date.getDate() / 14);
      const month = date.toLocaleString('es', { month: 'long' });
      const year = date.getFullYear();
    
      return {
        ...item,
        date: item.date ?? new Date().toISOString().split("T")[0], 
        day: dayOfWeek, 
        week: weekOfMonth,
        fortnight: middleOfMonth,
        month: month, 
        year: year, 
        quantity: item.quantity ?? 0,
        price: item.price ?? 0,
        amount: (item.quantity ?? 0) * (item.price ?? 0),
      };
    });
    setData(rowsWithFormattedDates);
    
  }, [rows]); 
  
  // Agregar funciones de agregación a las columnas relevantes
  const columnsWithAggregation = initialColumns.map((col) => {
    if (col.accessorKey === "amount") {
      return {
        ...col,
        aggregationFn: "sum", // Sumar montos por categoría y subcategoría
        AggregatedCell: ({ cell }) => (
          <strong>Total: {cell.getValue()?.toLocaleString()}</strong>
        ),
      };
    }
    if (col.accessorKey === "quantity") {
      return {
        ...col,
        aggregationFn: "sum", // Sumar cantidades por categoría y subcategoría
        AggregatedCell: ({ cell }) => (
          <strong>Cantidad Total: {cell.getValue()?.toLocaleString()}</strong>
        ),
      };
    }
    if (col.accessorKey === "price") {
      return {
        ...col,
        aggregationFn: "mean", // Promedio de precios por categoría y subcategoría
        AggregatedCell: ({ cell }) => (
          <strong>Precio Promedio: {cell.getValue()?.toFixed(2)}</strong>
        ),
      };
    }
    return col;
  });

  const handleGroupingChange = useCallback((updater) => {
    const newGroupedColumns =
      typeof updater === "function" ? updater(groupedColumns) : updater;
    setGroupedColumns(newGroupedColumns);
  }, [groupedColumns]);

  const handleSortingChange = useCallback((updater) => {
    const newSortingColumns =
      typeof updater === "function" ? updater(sorting) : updater;
    setSorting(newSortingColumns);
  }, [sorting]);

  const handleFilterChange = useCallback((updater) => {
    const newFilter =
      typeof updater === "function" ? updater(filters) : updater;
    console.log("newfilter", newFilter)
    setFilter(newFilter);
  }, [filters]);

  const handleFilterFnsChange = useCallback((updater) => {
    const newFilterFns =
      typeof updater === "function" ? updater(filterFns) : updater;
    setFilterFns(newFilterFns);
  }, [filterFns]);

  const renderTopToolbarCustomActions = useCallback(({ table }) => {
    // Obtén los valores necesarios de la tabla
    const groupedRows = table.getGroupedRowModel().rows;
    const groupedColumns = table.getState().grouping;
    const columnVisibility = table.getState().columnVisibility;

    // Filtra las columnas visibles
    const visibleHeaders = initialColumns.filter(
      (col) => columnVisibility[col.accessorKey] !== false
    );

    // Retorna el componente ExportButtons con los valores necesarios
    return <ExportButtons table={table} initialColumns={visibleHeaders} />;
  }, [initialColumns]);



  //enableFacetedValues
  //enableColumnFilterModes
  return (
    <>
      <MaterialReactTable
      columns={columnsWithAggregation}
      data={data.length ? data : []}
      enableRowSelection
      enableGrouping
      enableColumnResizing
      enableSorting
      enableGlobalFilter
      enableStickyHeader
      enableColumnOrdering
      enablePagination={false}
      enableColumnPinning
      enableColumnVirtualization
      enableRowVirtualization
      localization={MRT_Localization_ES}
      initialState={{
        grouping: ["category", "subCategory"], // Agrupar por categoría y subcategoría
        expanded: true,
      }}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}
      onGroupingChange={handleGroupingChange}
      onSortingChange={handleSortingChange}
      onColumnFiltersChange={handleFilterChange}
      onColumnFilterFnsChange={handleFilterFnsChange} 
      state={{
        grouping: groupedColumns,
        sorting: sorting,
        columnFilters: filters,
        columnFilterFns: filterFns
      }}
    />
     
    </>
    
  );
};

export default Table;

/*{
          quantity: (rows, filterValue) => {
            const [min, max] = filterValue;
            return rows.filter((row) => row.quantity >= min && row.quantity <= max);
          },
          price: (rows, filterValue) => {
            const [min, max] = filterValue;
            return rows.filter((row) => row.price >= min && row.price <= max);
          },
          amount: (rows, filterValue) => {
            const [min, max] = filterValue;
            return rows.filter((row) => row.amount >= min && row.amount <= max);
          },
          date: (rows, filterValue) => {
            const [min, max] = filterValue;
            return rows.filter((row) => row.date >= min && row.date <= max);
          },
        },*/