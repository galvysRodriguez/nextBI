
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useRefetchAll } from "app/app/components/context/report/useRefetchAll"
import { useTitle } from "app/app/components/context/report/useTitle"
import { useContextFetch } from "app/app/components/hooks/reports/useContextFetch"
import { useGetReportWarehouse } from "app/app/components/hooks/reports/warehouse/useGetReportWarehouse"
import { useGetReportWarehouseAll } from "app/app/components/hooks/reports/warehouse/useGetReportWarehouseAll"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { ResetTableSatate } from "app/app/components/report/ResetTableState"
import { initialColumnsWarehouse } from "app/app/components/report/warehouse/column"
import { useEffect } from "react"

export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportWarehouse()
    console.timeEnd("render2")

    const{setRefetchAll} = useRefetchAll()
    const{refetch: refetchAll} = useGetReportWarehouseAll()
    
    const {setTitle} = useTitle()
            
    useEffect(() => {
        setTitle("Movimientos de inventario")
        setRefetchAll(refetchAll)
    }, [setTitle, setRefetchAll, refetchAll])
    return(
        <>
            <TableContainer 
                title={"Movimientos de inventario"}
                initialColumns={initialColumnsWarehouse}
                >
                    <ResetTableSatate></ResetTableSatate>
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