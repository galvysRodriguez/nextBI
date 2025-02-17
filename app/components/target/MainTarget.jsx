"use client";

import { useIsGrid } from "../context/IsGrid";
import { CardTarget } from "./CardTarget";
import { useTargets } from "../hooks/useTargets";
import { useSearch } from "../hooks/useSearch";
import { mocksTarget } from "../mocks/MocksTarget";

export function MainTarget({ content }) {
  //const { grid } = useIsGrid();
  const { data, isLoading, isError } = useTargets(content);
  const goSearch = useSearch(data?.data || [mocksTarget.data]); 

  // Si hay error, usar los datos mockeados

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los objetivos.</p>;

  
  
  //const goSearch = useSearch(mocksTarget.data); 

  return (
    <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
      {goSearch.length > 0 ? (
        goSearch.map((objective) => <CardTarget key={objective.id} {...objective} />)
      ) : (
        <p>No hay objetivos disponibles.</p>
      )}
    </div>
  );
}
