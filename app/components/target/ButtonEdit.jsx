"use client";
import { useRouter } from "next/navigation"; 
import { Trash } from "lucide-react";
import { useCardStore } from "../context/IsGrid";
import { useDeleteTarget } from "../hooks/useDeleteTargets";
import { Pencil } from "lucide-react";

export function ButtonEdit() {
  const { getSelected, isNullSelected} = useCardStore();

  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/finance/update/${getSelected()}`)
  };
  
  return (
    <button
      onClick={handleClick}
      className={`w-12 h-12 flex items-center justify-center 
        ${isNullSelected() ? "bg-gray-200 text-gray-600": "bg-gray-300 text-gray-600"}  
        font-bold rounded-full transition-all shadow-lg`}
      disabled={isNullSelected()} 
    >
      <Pencil className="w-6 h-6" />
    </button>
  );
}