import { HeaderTarget } from "./HeaderTarget"
import { MainTarget } from "./MainTarget"
import { Title } from "../container/Title"
import { PrincipalContainer } from "../container/PrincipalContainer"
import { SectionPagination } from "./pagination/SectionPagination"


export function SectionTarget({content, id}) {
    return (
        <>
            <PrincipalContainer>
                <Title   id={id}  />
                <HeaderTarget></HeaderTarget>
                <MainTarget content={content}></MainTarget>
                <SectionPagination></SectionPagination>
            </PrincipalContainer>
        </>
    )
}

    
  