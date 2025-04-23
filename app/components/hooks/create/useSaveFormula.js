import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormTag = () => {
  return useMutation((formDataFormula) =>
    apiRequest({
      method: "POST",
      endpoint: API_ROUTES.TAGS.create,
      body: formDataFormula,
    })
  );
};

export const useUpdateFormTag = () => {
  return useMutation((formDataFormula) =>
    apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.TAGS.update(formDataFormula.id),
      body: formDataFormula,
    })
  );
};
