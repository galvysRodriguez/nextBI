"use client";
import React, { useState, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

import { ExportButtons } from "./ExportButtons";

const Table = ({ rows, initialColumns }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      rows.map((item) => ({
        ...item,
        amount: item.quantity * item.price || 0, // Calcular el monto total
        date: item.date ? new Date(item.date) : new Date(),
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
      renderTopToolbarCustomActions={({ table }) => (
        <ExportButtons table={table} initialColumns={initialColumns} />
      )}
    />
  );
};

export default Table;

/*
"use client"
import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
import { Box, Select, MenuItem, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; // Para exportar a PDF
import autoTable from "jspdf-autotable"; // Para tablas en PDF
import * as XLSX from "xlsx"; // Para exportar a Excel
import { saveAs } from "file-saver"; // Para exportar a CSV

// Mock de datos
export const initialColumns = [
  { accessorKey: "id", header: "ID", visible: true },
  { accessorKey: "client", header: "Client", visible: true },
  { accessorKey: "product", header: "Product", visible: true },
  { accessorKey: "presentation", header: "Presentation", visible: false },
  { accessorKey: "category", header: "Category", visible: true },
  { accessorKey: "subCategory", header: "Subcategory", visible: true },
  { accessorKey: "employee", header: "Employee", visible: false },
  { accessorKey: "deposit", header: "Deposit", visible: true },
  { accessorKey: "unit", header: "Unit", visible: false },
  { accessorKey: "quantity", header: "Quantity", visible: true, type: "number" },
  { accessorKey: "price", header: "Price", visible: true, type: "number" },
  { accessorKey: "amount", header: "Amount", visible: true, type: "number" }, // Calculado
  { accessorKey: "invoice", header: "Invoice", visible: true },
  { accessorKey: "date", header: "Date", visible: true },
];

// Mock de datos con la columna calculada "amount"
const data = [
  {
    id: 1,
    client: "Juan Pérez",
    product: "Laptop",
    presentation: "Caja",
    category: "Electronics",
    subCategory: "Computers",
    employee: "Ana Gómez",
    deposit: "Warehouse 1",
    unit: "pcs",
    quantity: 2,
    price: 750,
    invoice: "INV-001",
    date: "2024-02-12",
  },
  {
    id: 2,
    client: "María López",
    product: "Phone",
    presentation: "Caja",
    category: "Electronics",
    subCategory: "Mobile",
    employee: "Luis Fernández",
    deposit: "Warehouse 2",
    unit: "pcs",
    quantity: 1,
    price: 500,
    invoice: "INV-002",
    date: "2024-02-13",
  },
].map((item) => ({ ...item, amount: item.quantity * item.price })); 

// Componente principal
export const Table = () => {
  const [exportFormat, setExportFormat] = useState("");

  

  // Función de exportación (simulada)
  const handleExport = (rows, format) => {
    const selectedData = rows.map((row) => row.original);
    const headers = columns.map((col) => col.header);

    if (format === "csv") {
      const csvContent = [headers.join(","), ...selectedData.map((row) => columns.map((col) => row[col.accessorKey]).join(","))].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    } else if (format === "excel") {
      const worksheet = XLSX.utils.json_to_sheet(selectedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
      XLSX.writeFile(workbook, "data.xlsx");
    } else if (format === "pdf") {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [headers],
        body: selectedData.map((row) => columns.map((col) => row[col.accessorKey])),
      });
      doc.save("data.pdf");
    }
  };

  return (
    <MaterialReactTable
      columns={initialColumns}
      data={data}
      enableRowSelection
      enableGrouping
      enableColumnResizing
      enableRowOrdering
      enablePagination
      enableSorting
      enableGlobalFilter
      enableStickyHeader
      localization={MRT_Localization_ES}
      initialState={{
        grouping: ["category", "subCategory"], // Agrupación por defecto
        expanded: true,
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}>
   
          <Select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            displayEmpty
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="" disabled>Exportar como...</MenuItem>
            <MenuItem value="csv">CSV</MenuItem>
            <MenuItem value="excel">Excel</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
          </Select>

         
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0 || !exportFormat}
            onClick={() => handleExport(table.getPrePaginationRowModel().rows, exportFormat)}
            startIcon={<FileDownloadIcon />}
          >
            Exportar Todas
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0 || !exportFormat}
            onClick={() => handleExport(table.getRowModel().rows, exportFormat)}
            startIcon={<FileDownloadIcon />}
          >
            Exportar Página
          </Button>
          <Button
            disabled={(!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) || !exportFormat}
            onClick={() => handleExport(table.getSelectedRowModel().rows, exportFormat)}
            startIcon={<FileDownloadIcon />}
          >
            Exportar Seleccionadas
          </Button>
        </Box>
      )}
    />
  );
};


const TableWithThemeProvider = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
      <Table />
    </ThemeProvider>
  );
};

export default TableWithThemeProvider;
*/
