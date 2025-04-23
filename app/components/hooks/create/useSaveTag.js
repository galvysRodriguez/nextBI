import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormTag = () => {
  return useMutation((formDataTag) =>
    apiRequest({
      method: "POST",
      endpoint: API_ROUTES.TAGS.create,
      body: formDataTag,
    })
  );
};

export const useUpdateFormTag = () => {
  return useMutation((formDataTag) =>
    apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.TAGS.update(formDataTag.id),
      body: formDataTag,
    })
  );
};
