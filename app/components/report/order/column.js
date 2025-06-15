/*import { filterSelectOptions } from "../../utils/columns";

export const initialColumnsPurchase = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "client", 
    header: "Client",
    filterVariant: 'text',
    filterSelectOptions: filterSelectOptions,
  },
  { accessorKey: "product", 
    header: "Product",
    filterSelectOptions: filterSelectOptions,
  },
  { accessorKey: "category", 
    header: "Category",
    filterSelectOptions: filterSelectOptions,
  },
  { accessorKey: "subCategory", 
    header: "Subcategory",
    filterSelectOptions: filterSelectOptions,
  },
  { accessorKey: "deposit", 
    header: "Deposit",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "quantity", 
    header: "Quantity", 
    type: "number", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "price", 
    header: "Price", 
    type: "number", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "amount", 
    header: "Amount", 
    type: "number",
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "invoice", 
    header: "Invoice",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "date", 
    header: "Date", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: new Date().toISOString().split("T")[0]
  },
  { 
    accessorKey: "day", 
    header: "Day",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "week", 
    header: "Week",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "fortnight", 
    header: "Fornight",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "month", 
    header: "Month",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "year", 
    header: "Year",
    filterSelectOptions: filterSelectOptions,
  },
];*/

import { filterSelectOptions } from "../../utils/columns";

export const initialColumnsOrder = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "warehouse", header: "Depósito", filterSelectOptions },
  {
    accessorKey: "cost",
    header: "Costo",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Costo: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "cost_bs",
    header: "Costo Bs",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Costo Bs: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Subtotal: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "subtotal_bs",
    header: "Subtotal Bs",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Subtotal Bs: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Total: {cell.getValue()?.toLocaleString()}</strong>
    ),
    total: true,
  },
  {
    accessorKey: "total_bs",
    header: "Total Bs",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Total Bs: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "discount_percentage",
    header: "Descuento %",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
  },
  {
    accessorKey: "discount",
    header: "Descuento",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Descuento: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "discount_bs",
    header: "Descuento Bs",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Descuento Bs: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  { accessorKey: "tax_rate", header: "Tasa", filterSelectOptions },

  { accessorKey: "supplier", header: "Proveedor", filterSelectOptions },
  {
    accessorKey: "supplier_type",
    header: "Tipo de Proveedor",
    filterSelectOptions,
  },

  { accessorKey: "product_id", header: "ID Producto", isVisible: false },
  { accessorKey: "product_name", header: "Producto", filterSelectOptions },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    type: "number",
    filterVariant: "range",
    filterFn: "betweenInclusive",
    defaultValue: [0, 1000],
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Cantidad: {cell.getValue()?.toLocaleString()}</strong>
    ),
  },
  {
    accessorKey: "product_code",
    header: "Código del Producto",
    filterSelectOptions,
  },
  {
    accessorKey: "category",
    header: "Categoría",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "subcategory",
    header: "Subcategoría",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "product_type",
    header: "Tipo de Producto",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "unit",
    header: "Unidad",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "brand",
    header: "Marca",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "product_details",
    header: "Detalles del Producto",
    isVisible: false,
  },
  {
    accessorKey: "product_presentations",
    header: "Presentaciones del Producto",
    isVisible: false,
  },

  {
    accessorKey: "date",
    header: "Fecha",
    filterVariant: "rango",
    filterFn: "betweenInclusive",
  },
  { accessorKey: "day", header: "Día", filterSelectOptions, isVisible: false },
  {
    accessorKey: "weekday_number",
    header: "Día de la semana",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "weekday_name",
    header: "Nombre del día",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "week_of_year",
    header: "Semana del año",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "week_of_month",
    header: "Semana del mes",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "fortnight",
    header: "Quincena",
    filterSelectOptions,
    isVisible: false,
  },
  { accessorKey: "month", header: "Mes", filterSelectOptions },
  {
    accessorKey: "month_name",
    header: "Nombre del mes",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "quarter",
    header: "Trimestre",
    filterSelectOptions,
    isVisible: false,
  },
  {
    accessorKey: "semester",
    header: "Semestre",
    filterSelectOptions,
    isVisible: false,
  },
  { accessorKey: "year", header: "Año", filterSelectOptions },
  {
    accessorKey: "is_weekend",
    header: "Es fin de semana",
    filterSelectOptions,
    isVisible: false,
  },
];
