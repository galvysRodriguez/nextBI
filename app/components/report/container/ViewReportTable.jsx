"use client"
import { lazy, Suspense } from "react";
import { useReportView } from "../../context/useReportView";
import TableWithThemeProvider from "../LocaleTable";
import { TableData } from "../TableData";

const LazyTableData = lazy(() => import("../TableData"));

export function ViewReportTable({columns, isLoading, refetch}){
    const {isChart} = useReportView()
    return(
            <>
                <Suspense fallback={<div>Loading...</div>}></Suspense>
                {!isChart && (
                    <TableWithThemeProvider className={`${isChart ? 'hidden' : ''}`}>
                        <LazyTableData initialColumns={columns} isLoading={isLoading} refetch={refetch}/>
                    </TableWithThemeProvider>
                )}
            </>
            
        )
}