"use client";
import { useRouter } from "next/navigation"; 
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCardStore } from "../context/IsGrid";
import { useDeleteTarget } from "../hooks/useDeleteTargets";
import { Pencil } from "lucide-react";

export function ButtonEdit() {
  const { getSelected, isNullSelected} = useCardStore();

  const router = useRouter()
  const pathname = usePathname();
  const basePath = pathname.replace(/\/update$/, '');

  const handleClick = () => {
    router.push(`${basePath}/update/${getSelected()}`)
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