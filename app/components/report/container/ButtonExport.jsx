import { useChartExport } from "../../context/chartExportContext";
import { useGroupedColumns } from "../../context/report/useGroupedColumns";
import { useRows } from "../../context/report/useRows";
import { useReportLayout } from "../../context/reportLayout";
import useChartStore from "../../context/useChartStore";
import { useReportChart } from "../../context/useReportChart";
import { useReportFormat } from "../../context/useReportFormat";
import { useReportMenu } from "../../context/useReportMenu";
import { useReportScope } from "../../context/useReportScope";
import { useChartExportControls } from "../../hooks/reports/useChartExportControl";
import { useGetReportWarehouseAll } from "../../hooks/reports/warehouse/useGetReportWarehouseAll";
import { handleExport } from "../export";



export function ButtonExport({initialColumns}){
    const {setIsMenuOpen} =  useReportMenu()
    const {rows} = useRows()
    const {format} = useReportFormat()
    const {scope} = useReportScope()
    const { refetch, isFetching } = useGetReportWarehouseAll();
    //const { exportChart } = useChartExport();
    const { exportChart}  = useChartExportControls()



    const handleClick = async() => {
        if(scope == 'all'){
            const { data: apiData } = await refetch();
            handleExport({
                rows: apiData.data.data,
                format: format,
                initialColumns,
              })
            return setIsMenuOpen(false);
        }

        if(format === 'png' || format === 'svg'){
            //await exportChart(selectedChart, format)
            //return setIsMenuOpen(false)
            exportChart(format)
            return setIsMenuOpen(false)
        }

        handleExport({
                  rows: rows,
                  format: format,
                  initialColumns,
                })
        setIsMenuOpen(false); // Cerrar menu luego de exportar
    };

    return (
        <button
            onClick={handleClick}
            className="w-full bg-[#085494] text-white hover:bg-[#06457a] py-2 rounded-full transition-all font-bold"
        >
            Exportar
        </button>
    )
}