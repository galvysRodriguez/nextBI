import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useIconOption() {
  return useApiQuery({
    endpoint: API_ROUTES.ICONS.getAll,
    queryKey: ["icons"],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
