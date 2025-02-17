// components/TableContainer.js
"use client";

import { useTableContext } from "app/app/components/context/TableContext";
import { MocksDataShopping } from "app/app/components/mocks/MocksDataShopping";
import { initialColumnsShopping } from "app/app/components/utils/columns";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";
import { Chart } from "../Chart";

export default function TableContainer() {
  // Obtén las filas y columnas desde donde sea necesario
  const rows = MocksDataShopping; // Puedes reemplazar esto con datos dinámicos
const columns = initialColumnsShopping;

// Función para obtener las 10 filas con mayor monto
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