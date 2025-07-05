import BasicTable from "app/app/components/container/table/BasicTable"
import { mocksFormula } from "../mocks/mocksFormula"
import { API_ROUTES } from "../api/routes";
import { apiRequest } from "../api/apiRequest";
import { initialColumnsFormula } from "../utils/columnsFormula";

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
