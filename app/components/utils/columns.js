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
    filterVariant: 'range',
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "price", 
    header: "Price", 
    type: "number", 
    filterVariant: 'range',
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "amount", 
    header: "Amount", 
    type: "number",
    filterVariant: 'range',
    defaultValue: [0, 1000]
  },
  { accessorKey: "invoice", header: "Invoice" },
  { 
    accessorKey: "date", 
    header: "Date", 
    filterVariant: 'date-range',
    defaultValue: new Date().toISOString().split("T")[0]
  },
];
