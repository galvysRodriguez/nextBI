import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const handleExport = ({ rows, format, initialColumns, groupByColumn }) => {
  if (!rows || rows.length === 0) return;

  // Obtener todas las filas, incluidas las subfilas
  console.log("r", rows)
  const flattenRows = (rows) => {
    let allRows = [];
    rows.forEach(row => {
      allRows.push(row.original);
      if (row.subRows && row.subRows.length > 0) {
        allRows = allRows.concat(flattenRows(row.subRows));
      }
    });
    return allRows;
  };

  const selectedData = flattenRows(rows);
  console.log(selectedData, "2")
  const headers = initialColumns
    .filter(col => !groupByColumn || col.accessorKey !== groupByColumn) // Excluir columna agrupada si existe
    .map(col => col.header);

  if (format === "csv") {
    handleExportCSV({ selectedData, headers, initialColumns, groupByColumn });
  } else if (format === "excel") {
    handleExportExcel({ selectedData, initialColumns, groupByColumn, headers });
  } else if (format === "pdf") {
    handleExportPDF({ selectedData, headers, initialColumns, groupByColumn });
  }
};

// 🔹 Exportar CSV con subfilas y detección de grupos
const formatExportData = ({ selectedData, initialColumns, groupByColumn, headers }) => {
  let formattedData = [];
  let lastGroup = null;

  
  selectedData.forEach(row => {
    const groupValue = row[groupByColumn];
    let isFirstRow = false;

    // Si hay agrupación y el grupo cambia, agregarlo como una fila separada
    if (groupByColumn && groupValue !== lastGroup && groupValue) {
      formattedData.push({
        type: "group",
        content: `${groupByColumn}: ${groupValue}`,
        colSpan: headers ? headers.length : initialColumns.length
      });
      lastGroup = groupValue;
      isFirstRow = true; 
    }

    // Omitir la primera fila de cada grupo
    if (!isFirstRow) {
      formattedData.push({
        type: "data",
        content: Object.fromEntries(
          initialColumns
            .filter(col => col.accessorKey !== groupByColumn)
            .map(col => [col.header, row[col.accessorKey] || ""])
        )
      });
    }
  });

  return formattedData;
};

// 🔹 Exportar CSV
const handleExportCSV = ({ selectedData, headers, initialColumns, groupByColumn }) => {
  let csvContent = [];
  const formattedData = formatExportData({ selectedData, headers, initialColumns, groupByColumn });

  formattedData.forEach(item => {
    if (item.type === "group") {
      csvContent.push(item.content); // Insertar grupo como una fila separada
    } else {
      csvContent.push(Object.values(item.content).join(","));
    }
  });

  const blob = new Blob([csvContent.join("\n")], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "data.csv");
};

// 🔹 Exportar Excel
const handleExportExcel = ({ selectedData, headers, initialColumns, groupByColumn }) => {
  const formattedData = formatExportData({ selectedData, headers, initialColumns, groupByColumn });
  let excelData = formattedData.map(item => 
    item.type === "group" ? { Grupo: item.content } : item.content
  );

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, "data.xlsx");
};

// 🔹 Exportar PDF
const handleExportPDF = ({ selectedData, headers, initialColumns, groupByColumn }) => {
 
  const doc = new jsPDF();
  console.log(selectedData)
  const formattedData = formatExportData({ selectedData, headers, initialColumns, groupByColumn });
  let pdfData = [];

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
