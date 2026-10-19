import { API_ROUTES } from "app/app/components/api/routes";
import { useApiQuery } from "app/app/components/api/useApiQuery";
import { useRows } from "app/app/components/context/report/useRows";
import { usePageCount } from "app/app/components/context/report/usePageCount";
import { useTotalRows } from "app/app/components/context/report/useTotalRows";
import { cleanParams } from "app/app/components/report/cleanParams";
import { useQuoteParams } from "./useQuoteParams";
import { useHandleRowsNormalize } from "../useHandleRowsNormalize";

export function useGetReportQuote() {
  const params = useQuoteParams();
  const {setRows} = useRows()
  const {setPageCount} = usePageCount()
  const {setTotalRows} = useTotalRows()
  const cleanedParams = cleanParams(params);
  const {normalizeDecimal} = useHandleRowsNormalize()
  

    return useApiQuery({
      endpoint: API_ROUTES.REPORTS.quote,
      queryKey: ["quote", params],
      method: "GET",
      params: cleanedParams,
      staleTime: 0,
      keepPreviousData: true,
      onSuccess: (response) => {
        if (response) {
          setRows(normalizeDecimal(response.data.data) || []);
          setTotalRows(response.data.total || 0);
          setPageCount(Math.ceil(response.data.total / (params.limit || 10)) || 0);
        }
      },
    });
  }