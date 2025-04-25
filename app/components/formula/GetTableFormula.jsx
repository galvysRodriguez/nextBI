import BasicTable from "app/app/components/container/table/BasicTable"
import { mocksFormula } from "../mocks/mocksFormula"
import { initialColumnsFormula } from "../utils/columns"
import { API_ROUTES } from "../api/routes";
import { apiRequest } from "../api/apiRequest";

export async function GetTableFormula(){
    const initialData = await fetchDataFromServer();
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsFormula}/>
    )
}

export async function fetchDataFromServer() {
    return await apiRequest({
      endpoint: API_ROUTES.FORMULA.getTag, 
      method: "GET",
    });
}
