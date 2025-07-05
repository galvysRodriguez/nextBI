import { ArrowExport } from "./ArrowExport"
import { EllipsisView } from "./EllipsisView"
import { ViewToggle } from "./ViewToggle"

export function HeaderReport({initialColumns}){
    return(
        <>
            <div className="w-[80%] m-auto h-30 flex justify-end gap-4 py-6">
                <EllipsisView></EllipsisView>
                <ArrowExport initialColumns={initialColumns}></ArrowExport>
            </div>
        </>
    )
}
