"use client";

import { useCardStore, useIsGrid } from "../context/IsGrid";
import { CardTarget } from "./CardTarget";
import { useTargets } from "../hooks/useTargets";
import { useSearch } from "../hooks/useSearch";
import { mocksTarget } from "../mocks/MocksTarget";
import { useRef, useEffect } from "react";
import Progress from "../utils/Progress";
import { LoadingSkeletonTarget } from "./LoadingSkeletonTarget";

export function MainTarget({ content }) {
  //const { grid } = useIsGrid();
  const { data, isLoading, isError } = useTargets(content);
  const goSearch = useSearch(data?.data || [mocksTarget.data]);
  const containerRef = useRef(null); 
  const { clearSelection } = useCardStore();

  // Si hay error, usar los datos mockeados
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (containerRef.current && !containerRef.current.contains(event.target) && !event.target.closest('button')) {
        clearSelection()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (isLoading) return <LoadingSkeletonTarget></LoadingSkeletonTarget>
  if (isError) return <p>Error al cargar los objetivos.</p>;

  
  
  //const goSearch = useSearch(mocksTarget.data); 
  

  return (
    <div ref={containerRef} className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6">
      {goSearch.length > 0 ? (
        goSearch.map((objective) => <CardTarget key={objective.id} {...objective} />)
      ) : (
        <p>No hay objetivos disponibles.</p>
      )}
    </div>
  );
}
