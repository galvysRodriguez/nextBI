import { API_ROUTES } from "app/app/components/api/routes";
import { useApiQuery } from "app/app/components/api/useApiQuery";
import { useWarehouseParams } from "./useWarehouseParams";
import { useTableDataContext } from "app/app/components/context/TableContext";

function cleanParams(obj) {
  const cleaned = {};
  for (const key in obj) {
    if (obj[key] !== null && 
      obj[key] !== undefined && 
      obj[key] !== "" &&  
      !(typeof value === "number" && isNaN(value))) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

export function useGetReportWarehouse() {
  const params = useWarehouseParams();
  const {setRows, setPageCount, setTotalRows} = useTableDataContext(); 
  const cleanedParams = cleanParams(params);
  

    return useApiQuery({
      endpoint: API_ROUTES.REPORTS.warehouse,
      queryKey: ["warehouse", params],
      method: "GET",
      params: cleanedParams,
      staleTime: 0,
      keepPreviousData: true,
      onSuccess: (response) => {
        if (response) {
          setRows(response.data.data || []);
          setTotalRows(response.data.total || 0);
          setPageCount(Math.ceil(response.data.total / (params.limit || 10)) || 0);
        }
      },
    });
  }
  