import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useExistPerspectiveQuery = ({ title, id }) => {
  return useApiQuery({
    endpoint: API_ROUTES.PERSPECTIVES.exist,
    queryKey: ["checkTitlePerspectiveUpdate", title, id],
    method: "GET",
    params: {
      title,
      ...(id && { perspective_id: id }),
    },
    staleTime: 0,
    enabledValue: false,
    retry: false,
  });
};