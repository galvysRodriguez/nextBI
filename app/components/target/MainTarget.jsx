"use client";

import { useIsGrid } from "../context/IsGrid";
import { CardTarget } from "./CardTarget";
import { useTargets } from "../hooks/useTargets";

export function MainTarget({content}) {
  const { grid } = useIsGrid();
  const { data, isLoading, isError } = useTargets(content);
  console.log(content) // Ahora pasamos el parámetro dinámico

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los objetivos.</p>;

  const filteredData = data?.data || [];

  if (grid) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 w-full max-w-[1200px] px-4 md:px-6 lg:px-8 animate-fadeInGrid">
        {filteredData.map((objective) => (
          <CardTarget key={objective.id} {...objective} />
        ))}
      </div>
    );
  }

  return <h1>Row</h1>;
}
