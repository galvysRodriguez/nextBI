export const filterSelectOptions= [
  { value: "fuzzy", label: "Busqueda" },
  { value: "contains", label: "Contiene" },
  { value: "startsWith", label: "Empieza con" },
  { value: "endsWith", label: "Termina con" },
  { value: "equals", label: "Iguales" },
  { value: "notEquals", label: "No iguales" },
]

export const initialColumnsShopping = [
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
];

export const initialColumnsPerspective = [
  { accessorKey: "title", 
    header: "Titulo",
  },
]

export const initialColumnsTag = [
  { accessorKey: "title", 
    header: "Titulo",
  },
]

