import { ArrowExport } from "./ArrowExport"
import { EllipsisView } from "./EllipsisView"
import { ViewToggle } from "./ViewToggle"

export function HeaderReport(){
    return(
        <>
            <div className="w-full max-w-[1200px] h-30 px-4 md:px-6 lg:px-8 flex justify-end gap-4 p-6">
                <EllipsisView></EllipsisView>
                <ArrowExport></ArrowExport>
            </div>
        </>
    )
}
