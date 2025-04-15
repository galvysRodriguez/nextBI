import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../api/useApiClient";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets`;

export const useDeleteTarget = () => {
  const { detectResourceType } = useApiClient();
  const { apiRoutes } = detectResourceType();

  const deleteTarget = async (target_id) => {
    const response = await fetch(apiRoutes.delete(target_id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el target");
    }

    return response.json();
  };

  return useMutation(deleteTarget);
};