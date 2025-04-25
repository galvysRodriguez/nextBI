import { useRouter } from "next/navigation";
import { useDeleteTarget } from "./useDeleteTargets";
import { useTargetStore } from "./useSearch";
import { usePermissionButton } from "./usePermissionButton";
import { useCardStore } from "../context/IsGrid";
import { showErrorToast } from "../utils/toast";


export function usePermissionButtonDelete(){
    const { mutate, isLoading } = useDeleteTarget(); 
    const { deleteById } = useTargetStore();
    const router = useRouter(); 
    const {hasPermissions} = usePermissionButton()
    const { selectedCard} = useCardStore();
    

    const handleDelete = (fullPath) => {
        if(hasPermissions(fullPath)){
            return mutate(selectedCard, {
                onSuccess: () => {
                    deleteById(selectedCard); 
                    router.refresh(); 
                },
                onError: (error) => {
                    console.error("Error al eliminar el target:", error);
                },
                });
        }
        showErrorToast("No tienes el permiso para esta acción")
    };

    return {handleDelete, isLoading}
}