import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useFormulaByTagOption(id) {
  return useApiQuery({
    endpoint: API_ROUTES.FORMULA.tag(id),
    queryKey: ["formula-tag", id],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
