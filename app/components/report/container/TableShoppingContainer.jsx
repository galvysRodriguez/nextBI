// components/TableContainer.js
"use client";

import { useTableContext } from "app/app/components/context/TableContext";
import { MocksDataShopping } from "app/app/components/mocks/MocksDataShopping";
import { initialColumnsShopping } from "app/app/components/utils/columns";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";

export default function TableContainer() {
  // Obtén las filas y columnas desde donde sea necesario
  const rows = MocksDataShopping; // Puedes reemplazar esto con datos dinámicos
  const columns = initialColumnsShopping;

  return (
    <div className="max-h-[70vh]">
        <TableWithThemeProvider rows={rows} columns={columns} />
    </div>
    
  );
}