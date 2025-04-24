"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { usePermissions } from "../hooks/auth/usePermissions";
import { routePermissionsMap } from "../api/routePermissions";
import { showErrorToast } from "../utils/toast";
import { matchRoutePattern } from "../api/mathRoutePattern";

export function ButtonCreate() {
  const pathname = usePathname();
  const router = useRouter()
  const {isValid } = usePermissions()
  
  // Elimina cualquier /create existente para evitar duplicados
  const basePath = useMemo(() => pathname.replace(/\/create$/, ''), [pathname]);
  const fullPath = `${basePath}/create`;
  console.log(fullPath)
  const permission = matchRoutePattern(fullPath, routePermissionsMap)
  console.log(permission)
  const hasPermission = permission && isValid(permission.resource, permission.method);
  console.log(hasPermission)


  const handleClick = () => {
    if(hasPermission)
      return router.push(fullPath)
    showErrorToast("No tienes el permiso para esta acción")
  }
  
  return (
      <button
          onClick={handleClick}
          className="w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg">
        <Plus className="w-6 h-6" />
      </button>
  );
}