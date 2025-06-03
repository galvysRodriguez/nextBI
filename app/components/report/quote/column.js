import { filterSelectOptions } from "../../utils/columns";

export const initialColumnsQuote = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "warehouse", header: "Depósito", filterSelectOptions },

  { accessorKey: "price", header: "Precio", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
    aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Precio: {cell.getValue()?.toLocaleString()}</strong>
      ),
   },
  { accessorKey: "price_bs", header: "Precio Bs", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
    aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Precio Bs: {cell.getValue()?.toLocaleString()}</strong>
      ),
   },
  {accessorKey: "subtotal", header: "Subtotal", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Subtotal: {cell.getValue()?.toLocaleString()}</strong>
      ),
     },
    { accessorKey: "subtotal_bs", header: "Subtotal Bs", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Subtotal Bs: {cell.getValue()?.toLocaleString()}</strong>
      ),
     },
    { accessorKey: "total", header: "Total", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Total: {cell.getValue()?.toLocaleString()}</strong>
      ),
      total: true,
     },
    { accessorKey: "total_bs", header: "Total Bs", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Total Bs: {cell.getValue()?.toLocaleString()}</strong>
      ),
     },
    { accessorKey: "discount_percentage", header: "Descuento %", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      
     },
    { accessorKey: "discount", header: "Descuento", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Descuento: {cell.getValue()?.toLocaleString()}</strong>
      ),
     },
    { accessorKey: "discount_bs", header: "Descuento Bs", type: "number", filterVariant: "range", filterFn: "betweenInclusive",
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Descuento Bs: {cell.getValue()?.toLocaleString()}</strong>
      ),
     },
    { accessorKey: "tax_rate", header: "Tasa", filterSelectOptions,
      
     },
  { accessorKey: "seller_name", header: "Nombre", filterSelectOptions },
  { accessorKey: "seller_percentage", header: "Porcentaje", filterSelectOptions },
  { accessorKey: "city", header: "Ciudad", filterSelectOptions },
  { accessorKey: "state", header: "Estado", filterSelectOptions },

  { accessorKey: "customer_name", header: "Cliente", filterSelectOptions },
  { accessorKey: "customer_type", header: "Tipo Cliente", filterSelectOptions },
  { accessorKey: "customer_commercial", header: "Cliente Comercial", filterSelectOptions },
  { accessorKey: "customer_address", header: "Dirección Cliente", isVisible: false },

  { accessorKey: "product_id", header: "ID Productos", isVisible: false },
  { accessorKey: "product_name", header: "Producto", filterSelectOptions },
  { 
      accessorKey: "quantity", 
      header: "Cantidad", 
      type: "number", 
      filterVariant: 'range',
      filterFn: 'betweenInclusive',
      defaultValue: [0, 1000],
      aggregationFn: "sum",
      AggregatedCell: ({ cell }) => (
        <strong>Cantidad: {cell.getValue()?.toLocaleString()}</strong>
      ),
    },
  { accessorKey: "product_code", header: "Código", filterSelectOptions },
  { accessorKey: "category", header: "Categoría", filterSelectOptions, isVisible: false },
  { accessorKey: "subcategory", header: "Subcategoría", filterSelectOptions, isVisible: false },
  { accessorKey: "product_type", header: "Tipo Producto", filterSelectOptions, isVisible: false },
  { accessorKey: "unit", header: "Unidad", filterSelectOptions, isVisible: false },
  { accessorKey: "brand", header: "Marca", filterSelectOptions, isVisible: false },
  { accessorKey: "product_details", header: "Detalles", isVisible: false },
  { accessorKey: "product_presentations", header: "Presentaciones", isVisible: false },
  { accessorKey: "date", header: "Fecha", filterVariant: "rango", filterFn: "betweenInclusive" },
  { accessorKey: "day", header: "Día", filterSelectOptions, isVisible: false },
  { accessorKey: "weekday_number", header: "Día Semana", filterSelectOptions, isVisible: false },
  { accessorKey: "weekday_name", header: "Nombre del Día", filterSelectOptions, isVisible: false },
  { accessorKey: "week_of_year", header: "Semana Año", filterSelectOptions, isVisible: false },
  { accessorKey: "week_of_month", header: "Semana Mes", filterSelectOptions, isVisible: false },
  { accessorKey: "fortnight", header: "Quincena", filterSelectOptions, isVisible: false },
  { accessorKey: "month", header: "Número de Mes", filterSelectOptions },
  { accessorKey: "month_name", header: "Mes", filterSelectOptions, isVisible: false },
  { accessorKey: "quarter", header: "Trimestre", filterSelectOptions, isVisible: false },
  { accessorKey: "semester", header: "Semestre", filterSelectOptions, isVisible: false },
  { accessorKey: "year", header: "Año", filterSelectOptions },
  { accessorKey: "is_weekend", header: "Es Fin de Semana", filterSelectOptions, isVisible: false },
];
