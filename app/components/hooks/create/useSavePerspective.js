import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormPerspective = () => {
  return useMutation(async (formDataPerspective) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.PERSPECTIVES.create,
      body: formDataPerspective,
    })
  );
};

export const useUpdateFormPerspective = () => {
  return useMutation(async (formDataPerspective) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.PERSPECTIVES.update(formDataPerspective.id),
      body: formDataPerspective,
    })
  );
};
