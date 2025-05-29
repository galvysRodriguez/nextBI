import { API_ROUTES } from "app/app/components/api/routes";
import { useApiQuery } from "app/app/components/api/useApiQuery";
import { cleanParams } from "app/app/components/report/cleanParams";
import { useOrderParams } from "./useOrderParams";


export function useGetReportOrderAll() {
    const params = useOrderParams();
  
    // Clonar params y pisar limit y offset
    const overrideParams = {
      ...params,
      limit: 10000,
      offset: 0,
    };
    const cleanedParams = cleanParams(overrideParams);
  
    return useApiQuery({
      endpoint: API_ROUTES.REPORTS.order,
      queryKey: ["order_all", overrideParams],  // diferente queryKey
      method: "GET",
      params: cleanedParams,
      staleTime: 0,
      enabledValue: false,
      keepPreviousData: true,
    });
  }
  