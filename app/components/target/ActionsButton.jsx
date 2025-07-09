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
      console.log(id)
      console.log(`/dashboard/target/${id}`)
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
          className="p-2 bg-[#ffffff] border-[#085494] text-[#085494] border-2 rounded-md hover:bg-[#e4e6e8] transition"
          onClick={() => handleClick(fullPathUpdate)}
          title="Editar"
        >
          <Pencil size={24} />
        </button>
      )}
      {isDelete && (
        <button
          className="p-2 bg-[#ffffff] border-[#085494] text-[#085494] border-2 rounded-md hover:bg-[#e4e6e8] transition"
          onClick={() => handleDelete(fullPathDelete, id)}
          title="Eliminar"
        >
          <Trash2 size={24} />
        </button>
      )}
    </>
  );
}
