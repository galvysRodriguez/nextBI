import { HeaderTarget } from "./HeaderTarget"
import { MainTarget } from "./MainTarget"
import { Title } from "../container/Title"
import { PrincipalContainer } from "../container/PrincipalContainer"


export function SectionTarget({content, title}) {
    return (
        <>
            <PrincipalContainer>
                <Title   title={title}  />
                <HeaderTarget></HeaderTarget>
                <MainTarget content={content}></MainTarget>
            </PrincipalContainer>
        </>
    )
}

    
  