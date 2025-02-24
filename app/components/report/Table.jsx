"use client";
import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { ExportButtons } from "./ExportButtons";
import { Chart } from "./Chart";
import { useTableContext } from "../context/TableContext";

const Table = ({ rows, initialColumns }) => {
  const [data, setData] = useState([]);
  const { groupedColumns, setGroupedColumns } = useTableContext();

  const top10Rows = () => {
    return rows
      .sort((a, b) => b.amount - a.amount) // Ordenar por monto descendente
      .slice(0, 10) // Tomar las primeras 10 filas
      .map((row) => ({
        ...row,
        amount: parseFloat(row.amount.toFixed(2)), // Redondear valores del gráfico
      }));
  };
  
  // Llamar a la función para obtener los datos
  const top10Data = top10Rows();
  
  // Preparar los datos para el gráfico
  const chartData = top10Data.map((row) => row.amount);
  const chartCategories = top10Data.map((row) => row.invoice);
  const values = [{
    name: 'valor', 
    data: chartData
  }];
  

  useEffect(() => {
    setData(
      rows.map((item) => ({
        ...item,
        amount: item.quantity * item.price || 0, // Calcular el monto total
      }))
    );
  }, []);

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
        
        return <ExportButtons table={table} initialColumns={initialColumns} />;
      }}
    
       onGroupingChange={(updater) => {
        
        const newGroupedColumns =
          typeof updater === "function" ? updater(groupedColumns) : updater;
        
        setGroupedColumns(newGroupedColumns);
      }}
      
      state={{
        grouping: groupedColumns,
      }}
    />
     
    </>
    
  );
};

export default Table;

