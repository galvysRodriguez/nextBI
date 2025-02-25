"use client";

import { Box, Select, MenuItem, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";
import { handleExport } from "./export";

export const ExportButtons = ({ table, initialColumns }) => {
  const [exportFormat, setExportFormat] = useState("");

  const groupedRows = table.getGroupedRowModel().rows; 
  const selectedRows = table.getSelectedRowModel().rows;
  const prePaginatedRows = table.getPrePaginationRowModel().rows;
  const sortingState = table.getState().sorting;

  const selectedGroupedRows = groupedRows.filter(row =>
    selectedRows.some(selected => selected.id === row.id)
  );
  
  const prePaginatedGroupedRows = prePaginatedRows.filter(row =>
    groupedRows.some(group => group.id === row.id)
  );
  
  const sortedGroupedRows = table.getSortedRowModel().rows.filter(row =>
    groupedRows.some(group => group.id === row.id)
  );
  
  const sortedSelectedGroupedRows = table.getSortedRowModel().rows.filter(row =>
    selectedRows.some(selected => selected.id === row.id)
  );
  
  const sortedPrePaginatedGroupedRows = table.getSortedRowModel().rows.filter(row =>
    prePaginatedRows.some(prePaginated => prePaginated.id === row.id)
  );



  return (
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
        disabled={!table || table.getPrePaginationRowModel().rows.length === 0 || !exportFormat}
        onClick={() => handleExport({
          rows: sortedPrePaginatedGroupedRows,
          format: exportFormat,
          initialColumns,
          groupByColumn: table.getState().grouping
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Todas
      </Button>
      <Button
        disabled={!table || table.getRowModel().rows.length === 0 || !exportFormat}
        onClick={() => handleExport({
          rows: sortedGroupedRows,
          format: exportFormat,
          initialColumns,
          groupByColumn: table.getState().grouping
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Página
      </Button>
      <Button
        disabled={!table || (!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()) || !exportFormat}
        onClick={() => handleExport({
          rows: sortedSelectedGroupedRows,
          format: exportFormat,
          initialColumns,
          groupByColumn: table.getState().grouping
        })}
        startIcon={<FileDownloadIcon />}
      >
        Exportar Seleccionadas
      </Button>
    </Box>
  );
};