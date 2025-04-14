import BasicTable from "app/app/components/container/table/BasicTable"
import { mocksFormula } from "../mocks/mocksFormula"
import { initialColumnsFormula } from "../utils/columns"

export async function GetTableFormula(){
    const initialData = await fetchDataFromServer();
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsFormula}/>
    )
}
const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula/tag`

export async function fetchDataFromServer() {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }
  return response.json();
}