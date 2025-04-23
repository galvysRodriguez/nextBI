import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../api/apiRequest";
import { API_ROUTES } from "../api/routes";

export const useSaveFormula = () => {
  const saveFormulaData = async (formData) => {
    return await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.FORMULA.create,
      body: formData,
    });
  };

  return useMutation(saveFormulaData);
};
