import { apiRequest } from "../api/apiRequest";
import { API_ROUTES } from "../api/routes";
import BasicTable from "../container/table/BasicTable";
import { mocksTags } from "../mocks/mocksCategories";
import { initialColumnsTag } from "../utils/columns";

export async function GetTableTags(){
    const initialData = await fetchDataFromServer();
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsTag}/>
    )
}

export async function fetchDataFromServer() {
    return await apiRequest({
      endpoint: API_ROUTES.TAGS.getAll, 
      method: "GET",
    });
}
