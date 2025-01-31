"use client"
import React, { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_AggregationFns,
} from 'material-react-table';
import { Box, Stack } from '@mui/material';

// Column definitions
export const initialColumns = [
  { field: "id", headerName: "ID", width: 150, visible: true },
  { field: "client", headerName: "Client", width: 150, visible: true },
  { field: "product", headerName: "Product", width: 150, visible: true },
  { field: "presentation", headerName: "Presentation", width: 150, visible: false },
  { field: "category", headerName: "Category", width: 150, visible: true },
  { field: "subCategory", headerName: "Subcategory", width: 150, visible: true },
  { field: "employee", headerName: "Employee", width: 150, visible: false },
  { field: "deposit", headerName: "Deposit", width: 150, visible: true },
  { field: "unit", headerName: "Unit", width: 100, visible: false },
  { field: "quantity", headerName: "Quantity", width: 100, visible: true, type: "number" },
  { field: "price", headerName: "Price", width: 100, visible: true, type: "number" },
  { field: "amount", headerName: "Amount", width: 150, visible: true, type: "number" },
  { field: "invoice", headerName: "Invoice", width: 150, visible: true },
  { field: "date", headerName: "Date", width: 150, visible: true },
];

// Sample data generation
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  client: `Client ${i + 1}`,
  product: `Product ${i % 5 + 1}`,
  presentation: `Presentation ${i % 3 + 1}`,
  category: `Category ${i % 4 + 1}`,
  subCategory: `Subcategory ${i % 3 + 1}`,
  employee: `Employee ${i % 10 + 1}`,
  deposit: `Deposit ${i % 2 + 1}`,
  unit: `Unit ${i % 3 + 1}`,
  quantity: Math.floor(Math.random() * 100),
  price: parseFloat((Math.random() * 100).toFixed(2)),
  amount: parseFloat((Math.random() * 500).toFixed(2)),
  invoice: `INV-${i + 1000}`,
  date: new Date().toISOString().split("T")[0],
}));

const Example = () => {
  // Filter only visible columns
  const columns = useMemo(() => {
    return initialColumns
      .filter((col) => col.visible)
      .map((col) => ({
        header: col.headerName,
        accessorKey: col.field,
        size: col.width,
        aggregationFn: col.type === 'number' ? MRT_AggregationFns.sum : undefined, // Aggregation for numeric columns
        AggregatedCell: ({ cell }) => col.type === 'number' ? `Σ ${cell.getValue()?.toFixed(2)}` : cell.getValue(),
      }));
  }, []);

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableColumnResizing: true,
    enablePagination: true,
    enableSorting: true,
    enableGlobalFilter: true,
    enableStickyHeader: true,
    enableRowSelection: true, // Allow row selection
    initialState: {
      grouping: ['category', 'subCategory'], // Default grouping
      expanded: true, // Expand groups by default
      sorting: [{ id: 'category', desc: false }], // Default sorting
      pagination: { pageSize: 10 },
    },
    muiTableContainerProps: {
      className: 'bg-white shadow rounded-lg', // Tailwind styling
    },
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Enhanced Material React Table</h1>
      <MaterialReactTable
        table={table}
        muiTableHeadCellProps={{
          className: 'bg-blue-500 text-white font-semibold text-sm',
        }}
        muiTableBodyCellProps={{
          className: 'text-gray-700 text-sm',
        }}
        muiToolbarAlertBannerProps={{
          className: 'bg-blue-100 text-blue-700',
        }}
        renderTopToolbarCustomActions={() => (
          <Box className="p-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
              Custom Action
            </button>
          </Box>
        )}
      />
    </div>
  );
};

export default Example;
