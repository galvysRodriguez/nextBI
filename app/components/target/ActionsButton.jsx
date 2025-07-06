import { usePathname } from "next/navigation";
import { useCardStore } from "../context/IsGrid";
import { usePermissionButton } from "../hooks/usePermissionButton";
import { useMemo } from "react";
import { usePermissionButtonDelete } from "../hooks/usePermissionButtonDelete";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";

export function ActionsButton({ id }) {
  console.log(id);
  const pathname = usePathname();
  const { hasPermissions, handleClick } = usePermissionButton();
  const fullPathDelete = useMemo(() => {
    const cleanPath = pathname.replace(/\/delete$/, "");
    if (cleanPath.startsWith("/dashboard/target/perspective/")) {
      return `/dashboard/target/${id}`;
    }
    return `${cleanPath}/${id}`;
  }, [pathname, id]);

  const basePathUpdate = useMemo(
    () => pathname.replace(/\/update$/, ""),
    [pathname]
  );
  const fullPathUpdate = `${basePathUpdate}/update/${id}`;
  const isEdit = hasPermissions(fullPathUpdate);
  const isDelete = hasPermissions(fullPathDelete);
  const { handleDelete, isLoading } = usePermissionButtonDelete();

  return (
    <>
      {isEdit && (
        <button
          className="p-2 border-gray-800 border-2 rounded-md hover:bg-gray-500 transition text-gray-700"
          onClick={() => handleEdit(id)}
          title="Editar"
        >
          <Pencil size={24} />
        </button>
      )}
      {isDelete && (
        <button
          className="p-2 border-gray-800 border-2 rounded-md hover:bg-gray-500 transition text-gray-700"
          onClick={() => handleDelete(id)}
          title="Eliminar"
        >
          <Trash2 size={24} />
        </button>
      )}
    </>
  );
}
