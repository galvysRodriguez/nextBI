"use client";
import { usePathname } from "next/navigation";
import { useCardStore } from "../context/IsGrid";
import { Pencil } from "lucide-react";
import { usePermissionButton } from "../hooks/usePermissionButton";
import { useMemo } from "react";

export function ButtonEdit() {
  const { getSelected, isNullSelected} = useCardStore();

  const pathname = usePathname();
  const basePath = useMemo(() =>pathname.replace(/\/update$/, ''))
  const fullPath = `${basePath}/update/${getSelected()}`
  const {handleClick} = usePermissionButton()
  
  return (
    <button
      onClick={() => handleClick(fullPath)}
      className={`w-12 h-12 flex items-center justify-center 
        ${isNullSelected() ? "bg-gray-200 text-gray-600": "bg-gray-300 text-gray-600"}  
        font-bold rounded-full transition-all shadow-lg`}
      disabled={isNullSelected()} 
    >
      <Pencil className="w-6 h-6" />
    </button>
  );
}