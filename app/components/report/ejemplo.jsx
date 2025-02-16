"use client"
import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { createTheme, TextField, ThemeProvider, useTheme } from "@mui/material";
import { esES } from "@mui/material/locale";
import { Box, Select, MenuItem, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf"; // Para exportar a PDF
import autoTable from "jspdf-autotable"; // Para tablas en PDF
import * as XLSX from "xlsx"; // Para exportar a Excel
import { saveAs } from "file-saver"; // Para exportar a CSV
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO, getMonth, getYear, startOfWeek, startOfMonth, startOfQuarter, startOfYear } from "date-fns";

const GROUP_OPTIONS = ["Día", "Semana", "Mes", "Trimestre", "Año"];
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
].map((item) => ({ ...item, amount: item.quantity * item.price, date: parseISO(item.date), })); 

// Componente principal
const Example = () => {
  const [exportFormat, setExportFormat] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [grouping, setGrouping] = useState("Mes");

  // Filtrar datos según rango de fechas
  const filteredData = data.filter((row) => {
    if (startDate && endDate) {
      return row.date >= startDate && row.date <= endDate;
    }
    return true;
  });

  // Función para formatear las fechas según el tipo de agrupación
  const formatDateForGrouping = (date) => {
    switch (grouping) {
      case "Día":
        return format(date, "yyyy-MM-dd");
      case "Semana":
        return format(startOfWeek(date), "yyyy-MM-dd");
      case "Mes":
        return format(startOfMonth(date), "yyyy-MM");
      case "Trimestre":
        return format(startOfQuarter(date), "yyyy-'Q'Q");
      case "Año":
        return format(startOfYear(date), "yyyy");
      default:
        return format(date, "yyyy-MM-dd");
    }
  };

  // Agrupar datos según la selección del usuario
  const groupedData = filteredData.reduce((acc, row) => {
    const key = formatDateForGrouping(row.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  // Convertir datos agrupados en un formato de tabla
  const tableData = Object.entries(groupedData).map(([group, rows], index) => ({
    id: `G-${index}`,
    category: `📅 ${group}`, // Mostrar agrupación como categoría
    quantity: rows.reduce((sum, row) => sum + row.quantity, 0),
    amount: rows.reduce((sum, row) => sum + row.amount, 0),
  }));

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
      data={tableData}
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
          {/* Menú de selección de formato */}
          <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Fecha inicio"
          dateFormat="yyyy-MM-dd"
          customInput={<TextField label="Fecha Inicio" size="small" />}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="Fecha fin"
          dateFormat="yyyy-MM-dd"
          customInput={<TextField label="Fecha Fin" size="small" />}
        />
        <Select
          value={grouping}
          onChange={(e) => setGrouping(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          {GROUP_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
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

          {/* Botones de exportación */}
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

// Configuración del tema
const ExampleWithThemeProvider = () => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
      <Example />
    </ThemeProvider>
  );
};

export default ExampleWithThemeProvider;
