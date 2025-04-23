import { API_ROUTES } from "../api/routes";
import { useApiQuery } from "../api/useApiQuery";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function useTargets(content) {
  return useApiQuery({
    endpoint: `${API_BASE_URL}${content}`,
    queryKey: ["targets", content],
    method: "GET",
    staleTime: 0, 
  });
}
