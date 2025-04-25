import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./apiRequest";

export function useApiQuery({ endpoint, queryKey, params = {}, staleTime = 5 * 60 * 1000, method, enabledValue }) {
  return useQuery({
    queryKey,
    queryFn: () => apiRequest({ method, endpoint, params }),
    staleTime,
    enabled: !!endpoint && (enabledValue === undefined || enabledValue),
  });
}