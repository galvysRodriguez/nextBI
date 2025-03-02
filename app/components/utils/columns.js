export const initialColumnsShopping = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "client", header: "Client" },
  { accessorKey: "product", header: "Product" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "subCategory", header: "Subcategory" },
  { accessorKey: "deposit", header: "Deposit" },
  { 
    accessorKey: "quantity", 
    header: "Quantity", 
    type: "number", 
    filterVariant: "range", 
    filterFn: "between", 
    defaultValue: 0 // Asegura que siempre haya un valor numérico
  },
  { 
    accessorKey: "price", 
    header: "Price", 
    type: "number", 
    filterVariant: "range", 
    filterFn: "between", 
    defaultValue: 0
  },
  { 
    accessorKey: "amount", 
    header: "Amount", 
    type: "number", 
    filterVariant: "range", 
    filterFn: "between", 
    defaultValue: 0
  },
  { accessorKey: "invoice", header: "Invoice" },
  { 
    accessorKey: "date", 
    header: "Date", 
    filterVariant: "range", 
    filterFn: "between", 
    filterType: "date",
    defaultValue: "2025" // Asegura que no sea undefined
  },
];
