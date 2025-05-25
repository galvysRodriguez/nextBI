
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useGetReportSale } from "app/app/components/hooks/reports/sale/useGetReportSale"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsSale } from "app/app/components/report/sale/column"

export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportSale()
    console.timeEnd("render2")
    return(
        <>
            <TableContainer 
                title={"Ventas"}
                initialColumns={initialColumnsSale}
                >
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