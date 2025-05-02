
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useContextFetch } from "app/app/components/hooks/reports/useContextFetch"
import { useGetReportWarehouse } from "app/app/components/hooks/reports/warehouse/useGetReportWarehouse"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsWarehouse } from "app/app/components/report/warehouse/column"

export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportWarehouse()
    console.timeEnd("render2")
    return(
        <>
            <TableContainer 
                title={"Movimientos de inventario"}
                initialColumns={initialColumnsWarehouse}
                >
                    <ChartExportProvider>
                        <HeaderReport initialColumns={initialColumnsWarehouse}></HeaderReport>
                        <ViewReport
                            columns={initialColumnsWarehouse} 
                            title={"Movimientos de inventario"}
                        >
                        </ViewReport>
                    </ChartExportProvider>
                        <ViewReportTable
                            columns={initialColumnsWarehouse} 
                            isLoading={isRefetching || isLoading}
                            refetch={refetch}
                        >
                        </ViewReportTable>
                    
            </TableContainer>
        </>
    )
}