import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../api/apiRequest";
import { API_ROUTES } from "../api/routes";

export const useSaveForm = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataTarget) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.TARGETS.create,
      body: formDataTarget,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["targets"] })
      },
    }
  );
};

export const useUpdateForm = () => {
  const queryClient = useQueryClient();

  return useMutation(async(formDataTarget) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.TARGETS.update(formDataTarget.id),
      body: formDataTarget,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["targets"] })
      },
    }
  );
};
