import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useExistFormulaQuery = ({ title, id }) => {
  return useApiQuery({
    endpoint: API_ROUTES.FORMULA.exist,
    queryKey: ["checkTitleFormulaUpdate", title, id],
    method: "GET",
    params: {
      title,
      ...(id && { formula_id: id }),
    },
    staleTime: 0,
    enabledValue: !!title,
  });
};