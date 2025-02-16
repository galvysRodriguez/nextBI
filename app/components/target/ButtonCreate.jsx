"use client";
import Link from "next/link";
import { Plus } from "lucide-react"; // Icono de Lucide React

export function ButtonCreate() {
  return (
    <Link href="/dashboard/finance/create">
      <button className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg">
        <Plus className="w-6 h-6" />
      </button>
    </Link>
  );
}
