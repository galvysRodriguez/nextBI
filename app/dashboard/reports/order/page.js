
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useGetReportOrder } from "app/app/components/hooks/reports/order/useGetReportOrder"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsOrder } from "app/app/components/report/order/column"


export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportOrder()
    console.timeEnd("render2")
    return(
        <>
            <TableContainer 
                title={"Órdenes de Compras"}
                initialColumns={initialColumnsOrder}
                >
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsOrder}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsOrder} 
                            title={"Órdenees Compras"}
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