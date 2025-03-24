import { HeaderTarget } from "app/app/components/target/HeaderTarget"
import { Title } from "app/app/components/container/Title"
import { PrincipalContainer } from "app/app/components/container/PrincipalContainer"
import TableWithThemeProvider from "app/app/components/report/LocaleTable"
import BasicTable from "app/app/components/container/table/BasicTable"
import { mocksFormula } from "../mocks/mocksFormula"
import { initialColumnsFormula } from "../utils/columns"


export function SectionFormula({content, title}) {
    return (
        <>
            <PrincipalContainer>
                <Title   title={title}  />
                <HeaderTarget></HeaderTarget>
                <GetTable></GetTable>
            </PrincipalContainer>
        </>
    )
}

export function GetTable(){
    return(
          <BasicTable rows={mocksFormula.data} initialColumns={initialColumnsFormula}/>
    )
}