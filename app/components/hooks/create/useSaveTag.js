import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormTag = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataTag) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.TAGS.create,
      body: formDataTag,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tags"] })
        queryClient.invalidateQueries({ queryKey: ["tag-perspective", variables.tag_id] })
        queryClient.invalidateQueries({ queryKey: ["checkTitleTagUpdate"] })
      },
    }
  );
};

export const useUpdateFormTag = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataTag) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.TAGS.update(formDataTag.id),
      body: formDataTag,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["tags"] })
        queryClient.invalidateQueries({ queryKey: ["tag-perspective", variables.tag_id] })
        queryClient.invalidateQueries({ queryKey: ["checkTitleTagUpdate"] })
      },
    }
  );
};
