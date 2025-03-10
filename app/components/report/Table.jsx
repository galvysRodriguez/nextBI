"use client";
import React, { useState, useEffect } from "react";
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
  const { groupedColumns, setGroupedColumns, setSorting, sorting, setFilter, filter, filterFns, setFilterFns } = useTableContext();

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
      enablePagination
      enableSorting
      enableGlobalFilter
      enableStickyHeader
      enableColumnOrdering
      
      enableColumnPinning
      
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
        console.log("New Filter (before):", newFilter);
      
        // Verificar si newFilter[0] existe y tiene la estructura esperada
        if (newFilter[0]?.id === "date") {
          // Verificar y convertir newFilter[0].value[0] (fecha inicial)
          console.log(newFilter)
          if (
            newFilter[0]?.value[0] &&
            newFilter[0].value[0] !== undefined &&
            newFilter[0].value[0] !== "" &&
            typeof newFilter[0].value[0] !== "string" &&
            newFilter[0].value[0] instanceof dayjs
            
             
            
          ) {
            
            const dateValue = dayjs.isDayjs(newFilter[0].value[0]) ? 
            newFilter[0].value[0] : dayjs(newFilter[0].value[0]);

            if(dateValue.isValid() && typeof newFilter[0]?.value[0]?.toDate === "function") {
              newFilter[0].value[0] = newFilter[0].value[0].toDate().toISOString().split("T")[0]
            }
            
            /*
            if (isDayjsObject(newFilter[0].value[0])) {
           
              newFilter[0].value[0] = newFilter[0].value[0].toDate().toISOString().split("T")[0];
            } else if (typeof newFilter[0].value[0] === "string") {
             
              newFilter[0].value[0] = new Date(newFilter[0].value[0]).toISOString().split("T")[0];
            } else if (newFilter[0].value[0] instanceof Date) {
              
              newFilter[0].value[0] = newFilter[0].value[0].toISOString().split("T")[0];
            }*/
              
            
          }
      
          // Verificar y convertir newFilter[0].value[1] (fecha final)
          if (
            newFilter[0]?.value[1] &&
            newFilter[0].value[1] !== undefined &&
            newFilter[0].value[1] !== "" &&
            typeof newFilter[0].value[1] !== "string" &&
            newFilter[0].value[1] instanceof dayjs
            
          ) {
            const dateValue = dayjs.isDayjs(newFilter[0].value[1]) ? 
            newFilter[0].value[1] : dayjs(newFilter[0].value[1]);

            if(dateValue.isValid() && typeof newFilter[0]?.value[1]?.toDate === "function") {
              newFilter[0].value[1] = newFilter[0].value[1].toDate().toISOString().split("T")[0]
            }

            
            
            /*
            if (isDayjsObject(newFilter[0].value[1])) {
              
              newFilter[0].value[1] = newFilter[0].value[1].toDate().toISOString().split("T")[0];
            } else if (typeof newFilter[0].value[1] === "string") {
              
              newFilter[0].value[1] = new Date(newFilter[0].value[1]).toISOString().split("T")[0];
            } else if (newFilter[0].value[1] instanceof Date) {
           
              newFilter[0].value[1] = newFilter[0].value[1].toISOString().split("T")[0];
            }
          */
            
        }}
      
        console.log("New Filter (after):", newFilter);
        setFilter(newFilter);
      }}

      onColumnFilterFnsChange={(updater) => {
        const newFilter = typeof updater === "function" ? updater(filterFns) : updater;
        console.log("fns",newFilter); 
        setFilterFns(newFilter)
      }} 
      
      state={{
        grouping: groupedColumns,
        sorting: sorting,
        columnFilters: filter,
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