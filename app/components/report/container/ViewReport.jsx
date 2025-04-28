"use client"
import { useMemo } from "react";
import { useReportLayout } from "../../context/reportLayout";
import { useReportView } from "../../context/useReportView";
import { useGrouping } from "../../hooks/reports/useGrouping";
import { ChartData } from "../ChartData";
import TableWithThemeProvider from "../LocaleTable";
import { TableData } from "../TableData";


export function ViewReport({columns, isLoading, refetch}){
    const {isChart} = useReportView()
    const {convertRowsToChartData, getGroupedColumnValues, getTotalColumns, getSumByGroup} = useGrouping()
   

    if(isChart){
        const key = getTotalColumns(columns)[0]
        
        const groupedColumnValues = getGroupedColumnValues()
        const chartData = getSumByGroup(key)
        const values =  [{
            name: "valor",
            data: chartData,
          }]
        
        console.log("chartData", chartData)
        console.log("groupedColumnValues", groupedColumnValues)
        return (
            <ChartData series={values} categories={groupedColumnValues}></ChartData>
        )
    }

    return(
        <TableWithThemeProvider>
          <TableData initialColumns={columns} isLoading={isLoading} refetch={refetch}/>
        </TableWithThemeProvider>
    )
}