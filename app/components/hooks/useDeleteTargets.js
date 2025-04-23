import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "../api/useApiClient";
import { apiRequest } from "../api/apiRequest";

export const useDeleteTarget = () => {
  const { detectResourceType } = useApiClient();
  const { apiRoutes } = detectResourceType();

  const deleteTarget = async (target_id) => {
    return await apiRequest({
      method: "DELETE",
      endpoint: apiRoutes.delete(target_id)
    });
  };

  return useMutation(deleteTarget);
};
