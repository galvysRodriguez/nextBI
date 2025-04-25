import { useRouter } from "next/navigation";
import { showErrorToast } from "../utils/toast";
import { usePermissionButton } from "../hooks/usePermissionButton";

  export function ButtonSecondary({ text, id }) {
    const router = useRouter();
    const {hasPermissions} = usePermissionButton()
    const fullPath = `/dashboard/target/${id}`

    const handleClick = (event) => {
      event.stopPropagation()
      if(hasPermissions(fullPath))
        return router.push(fullPath)
      showErrorToast("No tienes el permiso para esta acción")
    }
  
    return (
      <button
        onClick={handleClick}
        className="bg-[#ffffff] border-2 border-[#085494] text-[#085494] w-full h-full rounded-lg text-lg px-4 py-2 
                   hover:bg-[#e4e6e8] transition-all duration-300"
      >
        {text}
      </button>
    );
  }
