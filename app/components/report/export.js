import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getHeaderContent } from "./headerContent";


export const handleExport = async ({ rows, format, initialColumns, columnVisibility, title}) => {
  if (!rows || rows.length === 0) return;

  const columns = initialColumns.filter(col => columnVisibility[col.accessorKey] !== false);

  if (format === "csv") {
    handleExportCSV({ rows, columns, title });
  } else if (format === "excel") {
    handleExportExcel({ rows, columns, title });
  } else if (format === "pdf") {
    await handleExportPDF({ rows, columns, title });
  }
};

const formatExportData = ({ rows, columns }) => {
  const formattedData = [];

  rows.forEach(row => {
    if (!row) return;

    formattedData.push({
      type: "data",
      content: Object.fromEntries(
        columns.map(col => [col.header, row[col.accessorKey] ?? ""])
      )
    });
  });

  return formattedData;
};

const handleExportCSV = ({ rows, columns, title }) => {
  let csvContent = [];
  const now = new Date();

  const headerLines = getHeaderContent().csv(title);
  csvContent.push(...headerLines);

  csvContent.push(columns.map(col => col.header).join(","));

  rows.forEach(row => {
    const line = columns.map(col => row[col.accessorKey] ?? "").join(",");
    csvContent.push(line);
  });

  const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${title}-${now.toISOString().split('T')[0]}.csv`);
};

const handleExportExcel = ({ rows, columns, title }) => {
  const now = new Date();
  const flatData = rows.map(row =>
    Object.fromEntries(columns.map(col => [col.header, row[col.accessorKey] ?? ""]))
  );

  const worksheet = XLSX.utils.json_to_sheet(flatData, { origin: "A6" }); 
  getHeaderContent().excel(worksheet, title);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, `${title}-${now.toISOString().split('T')[0]}.xlsx`);
};


const handleExportPDF = async ({ rows, columns, title }) => {
  const doc = new jsPDF();
  const now = new Date();
  const formattedData = formatExportData({ rows, columns });

  let pdfData = [];
  const headers = columns.map(col => col.header);

  formattedData.forEach(item => {
    if (item.type === "group") {
      pdfData.push([
        { 
          content: item.content, 
          colSpan: item.colSpan, 
          styles: { halign: "left", fontStyle: "bold" }
        }
      ]);
    } else {
      pdfData.push(Object.values(item.content));
    }
  });

  await getHeaderContent().pdf(doc);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(title, doc.internal.pageSize.getWidth() / 2, 50, { align: "center" });

  // Dibujar la tabla
  autoTable(doc, {
    head: [headers],
    body: pdfData,
    theme: "grid",
    startY: 60,
    headStyles: {
      fillColor: [0, 112, 192],  
      textColor: 255,            
      halign: "center",
      valign: "middle",
      fontStyle: "bold"
    },
    bodyStyles: {
      fontSize: 10
    },
    
  });

  doc.save(`${title}-${now.toISOString().split('T')[0]}.pdf`);
};
