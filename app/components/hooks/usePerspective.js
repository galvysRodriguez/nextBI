import { API_ROUTES } from "../api/routes";
import { useApiQuery } from "../api/useApiQuery";

export function usePerspective() {
  return useApiQuery({
      endpoint: API_ROUTES.INDICATORS.perspectives,
      queryKey: ["perspectives"],
      method: "GET",
      staleTime: 0, 
    });
}
