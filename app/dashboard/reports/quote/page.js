
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useRefetchAll } from "app/app/components/context/report/useRefetchAll"
import { useTitle } from "app/app/components/context/report/useTitle"
import { useGetReportQuote } from "app/app/components/hooks/reports/quote/useGetReportQuote"
import { useGetReportQuoteAll } from "app/app/components/hooks/reports/quote/useGetReportQuoteAll"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsQuote } from "app/app/components/report/quote/column"
import { useEffect } from "react"

export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportQuote()
    console.timeEnd("render2")
    const{setRefetchAll} = useRefetchAll()
    const{refetch: refetchAll} = useGetReportQuoteAll()

    const {setTitle} = useTitle()

    useEffect(() => {
        setTitle("Cotizaciones")
        setRefetchAll(refetchAll)
    }, [setTitle, setRefetchAll, refetchAll])
    return(
        <>
            <TableContainer 
                title={"Cotizaciones"}
                initialColumns={initialColumnsQuote}
                >
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsQuote}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsQuote} 
                            title={"Cotizaciones"}
                        >
                        </ViewReport>
                    </ChartExportProvider>
                        <ViewReportTable
                            columns={initialColumnsQuote} 
                            isLoading={isRefetching || isLoading}
                            refetch={refetch}
                        >
                        </ViewReportTable>
                    
            </TableContainer>
        </>
    )
}