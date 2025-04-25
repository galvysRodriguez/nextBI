import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormTag = () => {
  return useMutation(async (formDataTag) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.TAGS.create,
      body: formDataTag,
    })
  );
};

export const useUpdateFormTag = () => {
  return useMutation(async (formDataTag) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.TAGS.update(formDataTag.id),
      body: formDataTag,
    })
  );
};
