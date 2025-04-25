"use client";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { usePermissionButton } from "../hooks/usePermissionButton";

export function ButtonCreate() {
  const pathname = usePathname();
  // Elimina cualquier /create existente para evitar duplicados
  const basePath = useMemo(() => pathname.replace(/\/create$/, ''), [pathname]);
  const fullPath = `${basePath}/create`;
  const {handleClick} = usePermissionButton()
  
  return (
      <button
          onClick={() => handleClick(fullPath)}
          className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg">
        <Plus className="w-6 h-6" />
      </button>
  );
}