
"use client"
import { useContextFetch } from "app/app/components/hooks/reports/useContextFetch"
import { useGetReportWarehouse } from "app/app/components/hooks/reports/warehouse/useGetReportWarehouse"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsWarehouse } from "app/app/components/report/warehouse/column"

export default function Home(){
    const {refetch, isLoading, isError, isRefetching} = useGetReportWarehouse()
  
    return(
        <>
            <TableContainer 
                title={"Movimientos de inventario"}
                initialColumns={initialColumnsWarehouse}
                >
                    <ViewReport
                        columns={initialColumnsWarehouse} 
                    >
                    </ViewReport>
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