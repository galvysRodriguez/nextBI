"use client";
import { Trash } from "lucide-react";
import { useCardStore } from "../context/IsGrid";
import Progress from "../utils/Progress";
import { usePathname } from "next/navigation";
import { usePermissionButtonDelete } from "../hooks/usePermissionButtonDelete";
import { useMemo } from "react";

export function ButtonDelete() {
  const { isNullSelected} = useCardStore();
  const pathname = usePathname();
  const basePath = useMemo(() => pathname.replace(/\/delete$/, ''), [pathname]);
  const fullPath = `${basePath}/delete`;
  const {handleDelete, isLoading} = usePermissionButtonDelete()
  
  

  return (
    <button
      onClick={() => handleDelete(fullPath)}
      className={`w-12 h-12 flex items-center justify-center 
        ${isNullSelected() ? "bg-gray-200 text-gray-600": "bg-gray-300 text-gray-600"}  
        font-bold rounded-full transition-all shadow-lg`}
      disabled={isLoading || isNullSelected()} 
    >
      <Trash className="w-6 h-6" />
    </button>
  );
}