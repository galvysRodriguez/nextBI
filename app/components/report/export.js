import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleExport = ({ rows, format, initialColumns }) => {
  if (!rows || rows.length === 0) return;

  const selectedData = rows.map((row) => row.original);
  const headers = initialColumns.map((col) => col.header);

  if (format === "csv") {
    handleExportCSV({ selectedData, headers, initialColumns });
  } else if (format === "excel") {
    handleExportExcel({ selectedData });
  } else if (format === "pdf") {
    handleExportPDF({ selectedData, headers, initialColumns });
  }
};

const handleExportCSV = ({ selectedData, headers, initialColumns }) => {
  const csvContent = [
    headers.join(","),
    ...selectedData.map((row) => initialColumns.map((col) => row[col.accessorKey]).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "data.csv");
};

const handleExportExcel = ({ selectedData }) => {
  const worksheet = XLSX.utils.json_to_sheet(selectedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, "data.xlsx");
};

const handleExportPDF = ({ selectedData, headers, initialColumns }) => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [headers],
    body: selectedData.map((row) => initialColumns.map((col) => row[col.accessorKey])),
  });
  doc.save("data.pdf");
};