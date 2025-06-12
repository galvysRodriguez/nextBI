import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useDashboardMetricQuery = ({ date_from, date_to }) => {
  return useApiQuery({
    endpoint: API_ROUTES.DASHBOARD.metrics,
    queryKey: ["dashboard-metrics", date_from, date_to],
    method: "GET",
    params: {
      date_from,
      date_to,
    },
    staleTime: 0,
    enabledValue: false,
    retry: false,
  });
};