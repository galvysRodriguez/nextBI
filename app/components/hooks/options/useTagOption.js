import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useTagOption() {
  return useApiQuery({
    endpoint: API_ROUTES.TAGS.getAll,
    queryKey: ["tags"],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
