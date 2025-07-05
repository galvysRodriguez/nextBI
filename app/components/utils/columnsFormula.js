"use client"
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export const initialColumnsFormula = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "tag",
    header: "Etiqueta",
  },
  {
    accessorKey: "formula",
    header: "Fórmula",
    Cell: ({ cell }) => {
      const value = cell.getValue();
      return (
        <div className="flex flex-col gap-1">
          <InlineMath math={value} className="text-sm"/>
        </div>
      );
    },
  },
];