import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormPerspective = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataPerspective) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.PERSPECTIVES.create,
      body: formDataPerspective,
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["perspectives"] })
        queryClient.invalidateQueries({ queryKey: ["perspectives-icon"] })
        queryClient.invalidateQueries({ queryKey: ["checkTitlePerspectiveUpdate"] })
      },
    }
  );
};

export const useUpdateFormPerspective = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataPerspective) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.PERSPECTIVES.update(formDataPerspective.id),
      body: formDataPerspective,
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["perspectives"] })
        queryClient.invalidateQueries({ queryKey: ["perspectives-icon"] })
        queryClient.invalidateQueries({ queryKey: ["checkTitlePerspectiveUpdate"] })
      },
    }
  );
};
