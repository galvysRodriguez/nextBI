import BasicTable from "../container/table/BasicTable";
import { mocksTags } from "../mocks/mocksCategories";
import { initialColumnsTag } from "../utils/columns";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/tags`


export async function GetTableTags(){
    const initialData = await fetchDataFromServer();
    return(
          <BasicTable rows={initialData.data} initialColumns={initialColumnsTag}/>
    )
}

export async function fetchDataFromServer() {
  const response = await fetch(`${url}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }
  return response.json();
}