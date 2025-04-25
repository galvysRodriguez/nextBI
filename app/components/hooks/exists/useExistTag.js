import { API_ROUTES } from "../../api/routes";
import { useApiQuery } from "../../api/useApiQuery";

export const useExistTagQuery = ({ title, id }) => {
  return useApiQuery({
    endpoint: API_ROUTES.TAGS.exist,
    queryKey: ["checkTitleTagUpdate", title, id],
    method: "GET",
    params: {
      title,
      ...(id && { tag_id: id }),
    },
    staleTime: 0,
    enabledValue: false,
    retry: false,
  });
};