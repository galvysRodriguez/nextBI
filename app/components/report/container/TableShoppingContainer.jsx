"use client";

import React, { useMemo, useCallback } from "react";
import { useTableContext } from "app/app/components/context/TableContext";
import { MocksDataShopping } from "app/app/components/mocks/MocksDataShopping";
import { initialColumnsShopping } from "app/app/components/utils/columns";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";
import { Chart } from "../Chart";
import useTableUtils from "../../hooks/useTableDetail";

export default function TableContainer() {
  // Obtén las filas y columnas desde donde sea necesario
  const rows = useMemo(()=> MocksDataShopping, [MocksDataShopping])
  const columns = useMemo(()=> initialColumnsShopping, [initialColumnsShopping])
  
  const {  sorting, filters, groupedColumns } = useTableContext();
  const { getGroupedColumnValues, groupRowsWithAmount, getFilteredRows } = useTableUtils({filters, groupedColumns});

  // Memoiza las filas filtradas
  console.log("filtros", filters)
  const rowsFiltered = useMemo(() => getFilteredRows(rows), [rows, getFilteredRows]);
  console.log("rowsfiltered", rowsFiltered)

  // Memoiza las filas agrupadas
  const finalRow = useMemo(() => Object.values(groupRowsWithAmount(rowsFiltered)), [rowsFiltered, groupRowsWithAmount]);

  // Memoiza la función para obtener las 10 filas con mayor monto
  const top10Rows = useCallback(() => {
    if (!sorting || sorting.length === 0) {
      return finalRow.slice(0, 10);
    }

    const sortedRows = [...finalRow].sort((a, b) => {
      for (const { id, desc } of sorting) {
        const aValue = a[id] ?? "";
        const bValue = b[id] ?? "";

        if (aValue < bValue) return desc ? 1 : -1;
        if (aValue > bValue) return desc ? -1 : 1;
      }
      return 0;
    });

    return sortedRows.slice(0, 10).map((row) => ({
      ...row,
      amount: parseFloat(row.amount.toFixed(2)),
    }));
  }, [finalRow, sorting]);

  // Memoiza los datos para el top 10
  const top10Data = useMemo(() => top10Rows(), [top10Rows]);

  // Memoiza los datos para el gráfico
  const chartData = useMemo(() => top10Data.map((row) => row.totalAmount), [top10Data]);
  const chartCategories = useMemo(() => getGroupedColumnValues(top10Data), [top10Data, getGroupedColumnValues]);

  // Memoiza los valores para el gráfico
  const values = useMemo(() => [{
    name: "valor",
    data: chartData,
  }], [chartData]);

  console.log("top10Data:", top10Data);
console.log("chartData:", chartData);
console.log("chartCategories:", chartCategories);


  return (
    <>
      <div className="max-h-[70vh]">
        <TableWithThemeProvider rows={rows} columns={columns} />
      </div>
      <div className="pt-64">
        <Chart series={values} categories={chartCategories} />
      </div>
    </>
  );
}