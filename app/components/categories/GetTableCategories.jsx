import BasicTable from "../container/table/BasicTable";
import { mocksTags } from "../mocks/mocksCategories";
import { initialColumnsTag } from "../utils/columns";


export function GetTableTags(){
    return(
          <BasicTable rows={mocksTags.data} initialColumns={initialColumnsTag}/>
    )
}