"use client";
import { Trash } from "lucide-react";
import { useCardStore } from "../context/IsGrid";
import { useDeleteTarget } from "../hooks/useDeleteTargets";
import Progress from "../utils/Progress";

export function ButtonDelete() {
  const { selectedCard, isNullSelected} = useCardStore();
  const { mutate, isLoading } = useDeleteTarget(); 

  const handleDelete = () => {
      mutate(selectedCard)
  };

  if(isLoading){
    return(
      <Progress></Progress>
    )
  }

  return (
    <button
      onClick={handleDelete}
      className={`w-12 h-12 flex items-center justify-center 
        ${isNullSelected() ? "bg-gray-200 text-gray-600": "bg-gray-300 text-gray-600"}  
        font-bold rounded-full transition-all shadow-lg`}
      disabled={isLoading} 
    >
      <Trash className="w-6 h-6" />
    </button>
  );
}