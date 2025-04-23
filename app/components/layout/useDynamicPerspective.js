
import { API_ROUTES } from "../api/routes";
import { useApiQuery } from "../api/useApiQuery";

export function usePerspectiveIconOption() {
  return useApiQuery({
    endpoint: API_ROUTES.PERSPECTIVES.icons,
    queryKey: ["perspectives-icon"],
    method: 'GET',
    staleTime: 1200 * 60 * 1000,
  });
}