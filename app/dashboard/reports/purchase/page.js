
"use client"
import { ChartExportProvider } from "app/app/components/context/chartExportContext"
import { useGetReportPurchase } from "app/app/components/hooks/reports/purchase/useGetReportPurchase"
import { HeaderReport } from "app/app/components/report/container/HeaderReport"
import { TableContainer } from "app/app/components/report/container/TableContainer"
import { ViewReport } from "app/app/components/report/container/ViewReport"
import { ViewReportTable } from "app/app/components/report/container/ViewReportTable"
import { initialColumnsPurchase } from "app/app/components/report/purchase/column"


export default function Home(){
    console.time("render2")
    const {refetch, isLoading, isError, isRefetching} = useGetReportPurchase()
    console.timeEnd("render2")
    return(
        <>
            <TableContainer 
                title={"Compras"}
                initialColumns={initialColumnsPurchase}
                >
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