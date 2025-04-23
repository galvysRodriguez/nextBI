import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function usePerspectiveOption() {
  return useApiQuery({
    endpoint: API_ROUTES.PERSPECTIVES.getAll,
    queryKey: ["perspectives"],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
