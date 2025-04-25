import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormFormula = () => {
  return useMutation(async (formDataFormula) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.FORMULA.create,
      body: formDataFormula,
    })
  );
};

export const useUpdateFormFormula = () => {
  return useMutation(async(formDataFormula) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.FORMULA.update(formDataFormula.id),
      body: formDataFormula,
    })
  );
};
