import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../api/apiRequest";
import { API_ROUTES } from "../../api/routes";

export const useSaveFormFormula = () => {
  const queryClient = useQueryClient();

  return useMutation(async (formDataFormula) =>
    await apiRequest({
      method: "POST",
      endpoint: API_ROUTES.FORMULA.create,
      body: formDataFormula,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["formula"] })
        queryClient.invalidateQueries({ queryKey: ["formula-tag", variables.tag_id] })
        queryClient.invalidateQueries({ queryKey: ["checkTitleFormulaUpdate"] })
      },
    }
  );
};

export const useUpdateFormFormula = () => {
  const queryClient = useQueryClient();

  return useMutation(async(formDataFormula) =>
    await apiRequest({
      method: "PUT",
      endpoint: API_ROUTES.FORMULA.update(formDataFormula.id),
      body: formDataFormula,
    }),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["formula"] })
        queryClient.invalidateQueries({ queryKey: ["formula-tag", variables.tag_id] })
        queryClient.invalidateQueries({ queryKey: ["checkTitleFormulaUpdate"] })
      },
    }
  );
};
