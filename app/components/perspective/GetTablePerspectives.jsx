import BasicTable from "../container/table/BasicTable";
import { mocksPerspective } from "../mocks/mocksPerspective";
import { initialColumnsPerspective } from "../utils/columns";


export async function GetTablePerspectives(){
    const initialData = await fetchDataFromServer()
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsPerspective}/>
    )
}

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives`

export async function fetchDataFromServer() {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }
  return response.json();
}