
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useRefetchAll } from "app/app/components/context/report/useRefetchAll"
import { useTitle } from "app/app/components/context/report/useTitle"
import { useGetReportPurchase } from "app/app/components/hooks/reports/purchase/useGetReportPurchase"
import { useGetReportPurchaseAll } from "app/app/components/hooks/reports/purchase/useGetReportPurchaseAll"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsPurchase } from "app/app/components/report/purchase/column"
import { ResetTableSatate } from "app/app/components/report/ResetTableState"
import { useEffect } from "react"


export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportPurchase()
    console.timeEnd("render2")
    const{setRefetchAll} = useRefetchAll()
    const{refetch: refetchAll} = useGetReportPurchaseAll()

    const {setTitle} = useTitle()
    
    useEffect(() => {
        setTitle("Compras")
        setRefetchAll(refetchAll)
    }, [setTitle, setRefetchAll, refetchAll])
    return(
        <>
            <TableContainer 
                title={"Compras"}
                initialColumns={initialColumnsPurchase}
                >
                    <ResetTableSatate></ResetTableSatate>
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsPurchase}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsPurchase} 
                            title={"Compras"}
                        >
                        </ViewReport>
                    </ChartExportProvider>
                        <ViewReportTable
                            columns={initialColumnsPurchase} 
                            isLoading={isRefetching || isLoading}
                            refetch={refetch}
                        >
                        </ViewReportTable>
                    
            </TableContainer>
        </>
    )
}