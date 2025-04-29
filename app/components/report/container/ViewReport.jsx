"use client"
import { lazy, Suspense, useMemo } from "react";
import { useReportLayout } from "../../context/reportLayout";
import { useReportView } from "../../context/useReportView";
import { useGrouping } from "../../hooks/reports/useGrouping";
import TableWithThemeProvider from "../LocaleTable";
import { TableData } from "../TableData";

const LazyTableData = lazy(() => import("../ChartData"));

export function ViewReport({columns}){
    const {isChart} = useReportView()
    const {getGroupedColumnValues, getTotalColumns, getSumByGroup} = useGrouping()

        const key = getTotalColumns(columns)[0]
        
        const groupedColumnValues = getGroupedColumnValues()
        const chartData = getSumByGroup(key)
        const values =  [{
            name: "valor",
            data: chartData,
          }]
        
        console.log("chartData", chartData)
        console.log("groupedColumnValues", groupedColumnValues)
      

    return(
        <>
            
            {isChart && (
                <>
                     <Suspense fallback={<div>Loading...</div>}></Suspense>
                     <LazyTableData series={values} categories={groupedColumnValues}></LazyTableData>
                </>
            )}
        </>
        
    )
}