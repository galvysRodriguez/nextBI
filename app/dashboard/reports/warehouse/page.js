
"use client"
import { useContextFetch } from "app/app/components/hooks/reports/useContextFetch"
import { useGetReportWarehouse } from "app/app/components/hooks/reports/warehouse/useGetReportWarehouse"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { initialColumnsWarehouse } from "app/app/components/report/warehouse/column"

export default function Home(){
    const {refetch, isLoading, isError, isRefetching} = useGetReportWarehouse()
  
    return(
        <>
            <TableContainer 
                columns={initialColumnsWarehouse} 
                title={"Movimientos de inventario"}
                isLoading={isRefetching || isLoading}
                refetch={refetch}
                >
            </TableContainer>
        </>
    )
}