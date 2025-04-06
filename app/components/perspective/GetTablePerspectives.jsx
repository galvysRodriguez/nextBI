import BasicTable from "../container/table/BasicTable";
import { mocksPerspective } from "../mocks/mocksPerspective";
import { initialColumnsPerspective } from "../utils/columns";


export function GetTablePerspectives(){
    return(
          <BasicTable rows={mocksPerspective.data} initialColumns={initialColumnsPerspective}/>
    )
}