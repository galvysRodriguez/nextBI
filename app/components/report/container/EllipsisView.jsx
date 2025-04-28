import { Ellipsis, ArrowUpToLine } from "lucide-react"
import { ButtonBase } from "./ButtonBase"
import { useReportLayout } from "../../context/reportLayout"
import { ViewToggle } from "./ViewToggle"


export function EllipsisView(){
    const { isMenuChartOpen, setIsMenuChartOpen} = useReportLayout()
    return (
        <>
            <ButtonBase onClick={setIsMenuChartOpen}>
            {isMenuChartOpen ? 
                <ArrowUpToLine className="w-6 h-6" /> :
                <Ellipsis className="w-6 h-6" /> 
                }
            </ButtonBase>
            {isMenuChartOpen && ( <ViewToggle></ViewToggle>)}
        </>  
    )
}