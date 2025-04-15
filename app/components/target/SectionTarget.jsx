import { HeaderTarget } from "./HeaderTarget"
import { MainTarget } from "./MainTarget"
import { Title } from "../container/Title"
import { PrincipalContainer } from "../container/PrincipalContainer"


export function SectionTarget({content, id}) {
    return (
        <>
            <PrincipalContainer>
                <Title   id={id}  />
                <HeaderTarget></HeaderTarget>
                <MainTarget content={content}></MainTarget>
            </PrincipalContainer>
        </>
    )
}

    
  