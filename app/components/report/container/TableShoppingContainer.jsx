// components/TableContainer.js
"use client";

import { useTableContext } from "app/app/components/context/TableContext";
import { MocksDataShopping } from "app/app/components/mocks/MocksDataShopping";
import { initialColumnsShopping } from "app/app/components/utils/columns";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";
import { Chart } from "../Chart";

export default function TableContainer() {
  // Obtén las filas y columnas desde donde sea necesario
  const rows = MocksDataShopping;
  const columns = initialColumnsShopping;
  const{getGroupedColumnValues, groupRowsWithAmount, sorting, getFilteredRows, filter} = useTableContext()

  console.log("filtrado", filter)
  const rowsFiltered = getFilteredRows(rows)
  console.log("filter", rowsFiltered, filter)
  const finalRow = Object.values(groupRowsWithAmount(getFilteredRows(rows)));
  console.log("a", finalRow)

// Función para obtener las 10 filas con mayor monto
  const top10Rows = () => {
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
};


// Llamar a la función para obtener los datos
const top10Data = top10Rows();

// Preparar los datos para el gráfico
const chartData = top10Data.map((row) => row.totalAmount);
console.log(getGroupedColumnValues(top10Data))
const chartCategories = getGroupedColumnValues(top10Data)
const values = [{
  name: 'valor', 
  data: chartData
}];

  return (
    <>
       <div className="max-h-[70vh]">
          <TableWithThemeProvider rows={rows} columns={columns} />
      </div>
      <div className="pt-64">
        <Chart series={values} categories={chartCategories}></Chart>
      </div>
      
    </>
   
    
  );
}