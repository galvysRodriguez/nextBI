import { EllipsisVertical, ArrowUpToLine } from "lucide-react"
import { ButtonBase } from "./ButtonBase"
import { useReportLayout } from "../../context/reportLayout"
import { ViewToggle } from "./ViewToggle"
import { useReportMenu } from "../../context/useReportMenu"


export function EllipsisView(){
    const { isMenuChartOpen, setIsMenuChartOpen} = useReportMenu()
    return (
        <>
            <ButtonBase onClick={setIsMenuChartOpen}>
            {isMenuChartOpen ? 
                <ArrowUpToLine className="w-6 h-6" /> :
                <EllipsisVertical className="w-6 h-6" /> 
                }
            </ButtonBase>
            {isMenuChartOpen && ( <ViewToggle></ViewToggle>)}
        </>  
    )
}