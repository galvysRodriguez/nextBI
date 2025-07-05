import { GridAndRow } from "./GridAndRow"
import { SearchTarget } from "./SearchTarget"
import { ButtonCreate } from "./ButtonCreate"
import { ButtonDelete } from "./ButtonDelete"
import { ButtonEdit } from "./ButtonEdit"

export function HeaderTarget({search=false}){
    return(
        <>
            <div className="w-[70%] m-auto h-30 flex justify-end items-end gap-4 py-6">
                {search && <SearchTarget ></SearchTarget>}
                <ButtonCreate></ButtonCreate>
                <ButtonEdit></ButtonEdit>
                <ButtonDelete></ButtonDelete>
            </div>
        </>
    )
}
