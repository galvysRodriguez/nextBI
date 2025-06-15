
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useRefetchAll } from "app/app/components/context/report/useRefetchAll"
import { useTitle } from "app/app/components/context/report/useTitle"
import { useGetReportSale } from "app/app/components/hooks/reports/sale/useGetReportSale"
import { useGetReportSaleAll } from "app/app/components/hooks/reports/sale/useGetReportSaleAll"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { ResetTableSatate } from "app/app/components/report/ResetTableState"
import { initialColumnsSale } from "app/app/components/report/sale/column"
import { useEffect } from "react"

export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportSale()
    console.timeEnd("render2")
    const{setRefetchAll} = useRefetchAll()
    const{refetch: refetchAll} = useGetReportSaleAll()

    const {setTitle} = useTitle()
        
     useEffect(() => {
        setTitle("Ventas")
        setRefetchAll(refetchAll)
    }, [setTitle, setRefetchAll, refetchAll])


    return(
        <>
            <TableContainer 
                title={"Ventas"}
                initialColumns={initialColumnsSale}
                >
                    <ResetTableSatate></ResetTableSatate>
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsSale}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsSale} 
                            title={"Ventas"}
                        >
                        </ViewReport>
                    </ChartExportProvider>
                        <ViewReportTable
                            columns={initialColumnsSale} 
                            isLoading={isRefetching || isLoading}
                            refetch={refetch}
                        >
                        </ViewReportTable>
                    
            </TableContainer>
        </>
    )
}