import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export function useTagByPerspective(id) {
  return useApiQuery({
    endpoint: API_ROUTES.TAGS.perspective(id),
    queryKey: ["tag-perspective", id],
    method: "GET",
    staleTime: 5 * 60 * 1000,
  });
}
