import { useRouter } from "next/navigation";
import { useDeleteTarget } from "./useDeleteTargets";
import { useTargetStore } from "./useSearch";
import { usePermissionButton } from "./usePermissionButton";
import { useCardStore } from "../context/IsGrid";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useApiClient } from "../api/useApiClient";
import { useQueryClient } from "@tanstack/react-query";

export function usePermissionButtonDelete() {
  const { mutate, isLoading } = useDeleteTarget();
  const { deleteById } = useTargetStore();
  const router = useRouter();
  const { hasPermissions } = usePermissionButton();
  const { selectedCard, clearSelection } = useCardStore();
  const { detectResourceType } = useApiClient();
  const { resourceType } = detectResourceType();
  const queryClient = useQueryClient()

  const handleDelete = (fullPath) => {
    console.log(fullPath)
    if (hasPermissions(fullPath)) {
      return mutate(selectedCard, {
        onSuccess: (_, variables) => {
          deleteById(selectedCard);
          clearSelection();
          router.refresh();
          if (resourceType == "TAGS") {
            queryClient.invalidateQueries({ queryKey: ["tags"] });
            queryClient.invalidateQueries({
              queryKey: ["tag-perspective", variables.tag_id],
            });
            queryClient.invalidateQueries({
              queryKey: ["checkTitleTagUpdate"],
            });
          } else if (resourceType == "PERSPECTIVES") {
            queryClient.invalidateQueries({ queryKey: ["perspectives"] });
            queryClient.invalidateQueries({ queryKey: ["perspectives-icon"] });
            queryClient.invalidateQueries({
              queryKey: ["checkTitlePerspectiveUpdate"],
            });
          } else if (resourceType == "FORMULA") {
            queryClient.invalidateQueries({ queryKey: ["formula"] });
            queryClient.invalidateQueries({
              queryKey: ["formula-tag", variables.tag_id],
            });
            queryClient.invalidateQueries({
              queryKey: ["checkTitleFormulaUpdate"],
            });
          }

          showSuccessToast("Ha sido eliminado exitosamente");
        },
        onError: (error) => {
          console.error("Error al eliminar", error);
        },
      });
    }
    showErrorToast("No tienes el permiso para esta acción");
  };

  return { handleDelete, isLoading };
}
