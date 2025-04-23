import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useIndicatorOption() {
  return useApiQuery({
    endpoint: API_ROUTES.INDICATORS.getAll,
    queryKey: ["indicators"],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
