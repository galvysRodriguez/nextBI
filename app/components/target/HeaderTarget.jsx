import { GridAndRow } from "./GridAndRow"
import { SearchTarget } from "./SearchTarget"
import { ButtonCreate } from "./ButtonCreate"

export function HeaderTarget(){
    return(
        <>
            <div className="h-30 flex justify-center items-center gap-4 p-6">
                <SearchTarget></SearchTarget>
                <ButtonCreate></ButtonCreate>
                <GridAndRow></GridAndRow>
            </div>
        </>
    )
}
