import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useDetailTargetChartQuery = ({ date_from, date_to, id }) => {
  return useApiQuery({
    endpoint: API_ROUTES.TARGETS.detailChart(id),
    queryKey: ["dashboard-metrics", date_from, date_to, id],
    method: "GET",
    params: {
      date_from,
      date_to
    },
    staleTime: 0,
    enabledValue: false,
    retry: false,
  });
};