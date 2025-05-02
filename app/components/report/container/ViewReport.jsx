"use client"
import { lazy, Suspense} from "react";
import { useReportView } from "../../context/useReportView";
import { useGrouping } from "../../hooks/reports/useGrouping";
import Progress from "../../utils/Progress";

const LazyTableData = lazy(() => import("../ChartData"));

export function ViewReport({columns, title}){
    console.time("chart")
    const {isChart} = useReportView()
    const {getGroupedColumnValues, getTotalColumns, getSumByGroup} = useGrouping()

    if(!isChart) return <></>
    

        const key = getTotalColumns(columns)[0]
        
        const groupedColumnValues = getGroupedColumnValues()
        const chartData = getSumByGroup(key)
        const values =  [{
            name: "valor",
            data: chartData,
          }]
        
        console.log("chartData", chartData)
        console.log("groupedColumnValues", groupedColumnValues)
      
        console.timeEnd("chart")
    return(
        <>
            
            {isChart && (
                <>
                     <Suspense fallback={<Progress></Progress>}>
                        <LazyTableData series={values} categories={groupedColumnValues} title={title}></LazyTableData>
                     </Suspense>
                </>
            )}
        </>
        
    )
}