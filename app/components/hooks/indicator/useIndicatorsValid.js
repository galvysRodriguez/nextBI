import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";


export function useIndicatorsValid(id) {
  return useApiQuery({
      endpoint: API_ROUTES.INDICATORS.tags(id),
      queryKey: ["indicators-tags", id],
      method: "GET",
      staleTime: 0, 
       
       
    });
}
