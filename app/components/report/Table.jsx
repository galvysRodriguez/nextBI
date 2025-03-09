"use client";
import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { ExportButtons } from "./ExportButtons";
import { Chart } from "./Chart";
import { useTableContext } from "../context/TableContext";

const Table = ({ rows, initialColumns }) => {
  const [data, setData] = useState([]);
  const { groupedColumns, setGroupedColumns, setSorting, sorting, setFilter, filter } = useTableContext();

  useEffect(() => {
    setData(
      rows.map((item) => ({
        ...item,
        date: item.date ?? new Date().toISOString().split("T")[0],
        quantity: item.quantity ?? 0, 
        price: item.price ?? 0,       
        amount: (item.quantity ?? 0) * (item.price ?? 0), 
      }))
    );
  }, [rows]); // Asegurar que se ejecuta cuando `rows` cambia
  
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

  return (
    <>
      <MaterialReactTable
      columns={columnsWithAggregation}
      data={data.length ? data : []}
      enableRowSelection
      enableGrouping
      enableColumnResizing
      enablePagination
      enableSorting
      enableGlobalFilter
      enableStickyHeader
      enableColumnOrdering
      enableColumnFilterModes
      enableColumnPinning
      enableFacetedValues
      localization={MRT_Localization_ES}
      initialState={{
        grouping: ["category", "subCategory"], // Agrupar por categoría y subcategoría
        expanded: true,
      }}
      renderTopToolbarCustomActions={({ table }) => {
        const groupedRows = table.getGroupedRowModel().rows;
        const groupedColumns = table.getState().grouping;
        const columnVisibility = table.getState().columnVisibility;

        const visibleHeaders = initialColumns
          .filter((col) => columnVisibility[col.accessorKey] !== false) 
        
        
        return <ExportButtons table={table} initialColumns={visibleHeaders} />;
      }}
    
       onGroupingChange={(updater) => {
        const newGroupedColumns =
          typeof updater === "function" ? updater(groupedColumns) : updater;
        
        setGroupedColumns(newGroupedColumns);
      }}

      onSortingChange={(updater) => {
        const newSorting = typeof updater === "function" ? updater(sorting) : updater;
        setSorting(newSorting);
      }}

      onColumnFiltersChange={(updater) => {
        const newFilter = typeof updater === "function" ? updater(filter) : updater;
        console.log(newFilter); 
        setFilter(newFilter)
      }} 

      onColumnFilterFnsChange={(updater) => {
        const newFilter = typeof updater === "function" ? updater(filter) : updater;
        console.log("fns",newFilter); 
      }} 
      
      state={{
        grouping: groupedColumns,
        sorting: sorting,
      }}
    />
     
    </>
    
  );
};

export default Table;

