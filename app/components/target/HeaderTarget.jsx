import { GridAndRow } from "./GridAndRow"
import { SearchTarget } from "./SearchTarget"
import { ButtonCreate } from "./ButtonCreate"

export function HeaderTarget(){
    return(
        <>
            <div className="w-full max-w-[1200px] h-30 px-4 md:px-6 lg:px-8 flex justify-end gap-4 p-6">
                <SearchTarget ></SearchTarget>
                <ButtonCreate></ButtonCreate>
            </div>
        </>
    )
}
