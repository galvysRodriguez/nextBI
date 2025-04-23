import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useFormulaOption() {
  return useApiQuery({
    endpoint: API_ROUTES.FORMULA.getAll,
    queryKey: ["formula"],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
