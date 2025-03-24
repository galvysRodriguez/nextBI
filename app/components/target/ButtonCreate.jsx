"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

export function ButtonCreate() {
  const pathname = usePathname();
  
  // Elimina cualquier /create existente para evitar duplicados
  const basePath = pathname.replace(/\/create$/, '');
  
  return (
    <Link href={`${basePath}/create`}>
      <button className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg">
        <Plus className="w-6 h-6" />
      </button>
    </Link>
  );
}