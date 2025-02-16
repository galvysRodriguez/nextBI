import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const useExportData = (columns) => {

  const formatGroupedData = (rows) => {
    return rows.map((row) => {
      return {
        ...row.original,
        ...row.groupingValues, 
      };
    });
  };

  // Exportar a CSV
  const exportToCSV = (rows) => {
    if (!rows || rows.length === 0) return;
    
    const formattedData = formatGroupedData(rows);
    const headers = columns.map((col) => col.header);
    const csvContent = [
      headers.join(","),
      ...formattedData.map((row) => columns.map((col) => row[col.accessorKey] || "").join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "data.csv");
  };

  // Exportar a Excel
  const exportToExcel = (rows) => {
    if (!rows || rows.length === 0) return;

    const formattedData = formatGroupedData(rows);
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  // Exportar a PDF
  const exportToPDF = (rows) => {
    if (!rows || rows.length === 0) return;

    const formattedData = formatGroupedData(rows);
    const doc = new jsPDF();
    const headers = columns.map((col) => col.header);
    const body = formattedData.map((row) => columns.map((col) => row[col.accessorKey] || ""));

    autoTable(doc, {
      head: [headers],
      body,
    });

    doc.save("data.pdf");
  };

  return { exportToCSV, exportToExcel, exportToPDF };
};

export default useExportData;
