import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useExistTargetQuery = ({ title, id }) => {
  return useApiQuery({
    endpoint: API_ROUTES.TARGETS.exist,
    queryKey: ["checkTitleTargetUpdate", title, id],
    method: "GET",
    params: {
      title,
      ...(id && { target_id: id }),
    },
    staleTime: 0,
    enabledValue: !!title,
  });
};