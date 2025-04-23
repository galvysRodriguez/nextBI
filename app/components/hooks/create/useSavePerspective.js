import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormTarget = () => {
  return useMutation((formDataPerspective) =>
    apiRequest({
      method: "POST",
      endpoint: API_ROUTES.PERSPECTIVES.create,
      body: formDataPerspective,
    })
  );
};

export const useUpdateFormTarget = () => {
  return useMutation((formDataPerspective) =>
    apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.PERSPECTIVES.update(formDataPerspective.id),
      body: formDataPerspective,
    })
  );
};
