import { apiRequest } from "../api/apiRequest";
import { API_ROUTES } from "../api/routes";
import BasicTable from "../container/table/BasicTable";
import { mocksPerspective } from "../mocks/mocksPerspective";
import { initialColumnsPerspective } from "../utils/columns";


export async function GetTablePerspectives(){
    const initialData = await fetchDataFromServer()
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsPerspective}/>
    )
}

export async function fetchDataFromServer() {
    return apiRequest({
      endpoint: API_ROUTES.PERSPECTIVES.getAll, 
      method: "GET",
    });
}
