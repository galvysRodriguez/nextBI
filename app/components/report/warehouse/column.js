import { filterSelectOptions } from "../../utils/columns";

export const initialColumnsWarehouse = [
  { accessorKey: "id", header: "ID" },
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
    defaultValue: [0, 1000]
  },
  { 
    accessorKey: "date", 
    header: "Fecha", 
    filterVariant: 'range',
    filterFn: 'betweenInclusive',
    defaultValue: new Date().toISOString().split("T")[0]
  },
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