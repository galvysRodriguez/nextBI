import { API_BASE_URL } from "../api/routes";
import { useApiQuery } from "../api/useApiQuery";

export function useTargets(content) {
  return useApiQuery({
    endpoint: `${API_BASE_URL}${content}`,
    queryKey: ["targets", content],
    method: "GET",
    staleTime: 0, 
  });
}
