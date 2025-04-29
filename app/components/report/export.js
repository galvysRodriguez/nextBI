import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleExport = ({ rows, format, initialColumns}) => {
  if (!rows || rows.length === 0) return;

  if (format === "csv") {
    handleExportCSV({ rows, initialColumns });
  } else if (format === "excel") {
    handleExportExcel({ rows, initialColumns });
  } else if (format === "pdf") {
    handleExportPDF({ rows, initialColumns });
  }
};

const formatExportData = ({ rows, initialColumns }) => {
  const formattedData = [];

  rows.forEach(row => {
    if (!row) return;

    formattedData.push({
      type: "data",
      content: Object.fromEntries(
        initialColumns.map(col => [col.header, row[col.accessorKey] ?? ""])
      )
    });
  });

  return formattedData;
};

const handleExportCSV = ({ rows, initialColumns }) => {
  let csvContent = [];
  const formattedData = formatExportData({ rows, initialColumns});

  formattedData.forEach(item => {
      csvContent.push(Object.values(item.content).join(","));
  });

  const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "data.csv");
};

const handleExportExcel = ({ rows, initialColumns }) => {
  const formattedData = formatExportData({ rows, initialColumns });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, "data.xlsx");
};

const handleExportPDF = ({ rows,  initialColumns }) => {
  const doc = new jsPDF();
  const formattedData = formatExportData({ rows, initialColumns });
  let pdfData = [];
  
  const headers = initialColumns
    .map(col => col.header);

  formattedData.forEach(item => {
    if (item.type === "group") {
      pdfData.push([{ 
        content: item.content, 
        colSpan: item.colSpan, 
        styles: { halign: "left", fontStyle: "bold" }
      }]);
    } else {
      pdfData.push(Object.values(item.content));
    }
  });

  autoTable(doc, {
    head: [headers],
    body: pdfData,
    theme: "grid"
  });

  doc.save("data.pdf");
};
