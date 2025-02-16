"use client";

import { Box, Select, MenuItem, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";
import { handleExport } from "./export";

export const ExportButtons = ({ table, initialColumns }) => {
  const [exportFormat, setExportFormat] = useState("");

  return (
    <Box sx={{ display: "flex", gap: "16px", padding: "8px", flexWrap: "wrap" }}>
      {/* Selector de formato de exportación */}
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

      {/* Botón para exportar todas las filas */}
      <Button
        disabled={!table || table.getPrePaginationRowModel().rows.length === 0 || !exportFormat}
        onClick={() => handleExport({
          rows: table.getPrePaginationRowModel().rows,
          format: exportFormat,
          initialColumns,
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Todas
      </Button>

      {/* Botón para exportar la página actual */}
      <Button
        disabled={!table || table.getRowModel().rows.length === 0 || !exportFormat}
        onClick={() => handleExport({
          rows: table.getRowModel().rows,
          format: exportFormat,
          initialColumns,
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Página
      </Button>

      {/* Botón para exportar las filas seleccionadas */}
      <Button
        disabled={!table || (!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) || !exportFormat}
        onClick={() => handleExport({
          rows: table.getSelectedRowModel().rows,
          format: exportFormat,
          initialColumns,
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Seleccionadas
      </Button>
    </Box>
  );
};