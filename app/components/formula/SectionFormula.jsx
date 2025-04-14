import { HeaderTarget } from "app/app/components/target/HeaderTarget"
import { Title } from "app/app/components/container/Title"
import { PrincipalContainer } from "app/app/components/container/PrincipalContainer"
import TableWithThemeProvider from "app/app/components/report/LocaleTable"


export function SectionFormula({content, title, children}) {
    return (
        <>
            <PrincipalContainer>
                <Title   title={title}  />
                <HeaderTarget></HeaderTarget>
                {children}
            </PrincipalContainer>
        </>
    )
}