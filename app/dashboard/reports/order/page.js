
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useRefetchAll } from "app/app/components/context/report/useRefetchAll"
import { useTitle } from "app/app/components/context/report/useTitle"
import { useGetReportOrder } from "app/app/components/hooks/reports/order/useGetReportOrder"
import { useGetReportOrderAll } from "app/app/components/hooks/reports/order/useGetReportOrderAll"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsOrder } from "app/app/components/report/order/column"
import { ResetTableSatate } from "app/app/components/report/ResetTableState"
import { useEffect } from "react"


export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportOrder()
    const {setTitle} = useTitle()
    const{setRefetchAll} = useRefetchAll()
    const{refetch: refetchAll} = useGetReportOrderAll()

    useEffect(() => {
        setTitle("Órdenes de Compras")
        setRefetchAll(refetchAll)
    }, [setTitle, setRefetchAll, refetchAll])
    console.timeEnd("render2")
    return(
        <>
            <TableContainer 
                title={"Órdenes de Compras"}
                initialColumns={initialColumnsOrder}
                >
                    <ResetTableSatate></ResetTableSatate>
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsOrder}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsOrder} 
                            title={"Órdenes de Compras"}
                        >
                        </ViewReport>
                    </ChartExportProvider>
                        <ViewReportTable
                            columns={initialColumnsOrder} 
                            isLoading={isRefetching || isLoading}
                            refetch={refetch}
                        >
                        </ViewReportTable>
                    
            </TableContainer>
        </>
    )
}