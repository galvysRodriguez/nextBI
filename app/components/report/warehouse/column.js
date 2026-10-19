import { filterSelectOptions } from "../../utils/columns";

export const initialColumnsWarehouse = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "warehouse", header: "Depósito", filterSelectOptions },
  {
    accessorKey: "movement_type",
    header: "Tipo de Movimiento",
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
      <strong>Total: {cell.getValue()?.toLocaleString()}</strong>
    ),
    total: true,
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
  /*{ accessorKey: "id", header: "ID" },
  { accessorKey: "type", 
    header: "Tipo",
    filterVariant: 'text',
    filterSelectOptions: filterSelectOptions,
    groupedCell: (info) => <b>{info.getValue() || '(Todos)'}</b>,
  },
  { accessorKey: "product", 
    header: "Producto",
    filterSelectOptions: filterSelectOptions,
  },
  { accessorKey: "warehouse", 
    header: "Depósito",
    filterSelectOptions: filterSelectOptions,
    groupedCell: (info) => <b>{info.getValue() || '(Todos)'}</b>,
  },
  { 
    accessorKey: "quantity", 
    header: "Cantidad", 
    type: "number", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: [0, 1000],
    aggregationFn: "sum",
    AggregatedCell: ({ cell }) => (
      <strong>Total: {cell.getValue()?.toLocaleString()}</strong>
    ),
    total: true,
  },
  { 
    accessorKey: "date", 
    header: "Fecha", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: new Date().toISOString().split("T")[0]
  },*/
  /*
  { 
    accessorKey: "day", 
    header: "Día",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "week", 
    header: "Semana",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "fortnight", 
    header: "Quincena",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "month", 
    header: "Mes",
    filterSelectOptions: filterSelectOptions,
  },
  { 
    accessorKey: "year", 
    header: "Anual",
    filterSelectOptions: filterSelectOptions,
  },*/
];
