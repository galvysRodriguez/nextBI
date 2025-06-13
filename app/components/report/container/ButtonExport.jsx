import { useColumns } from "../../context/report/useColumns";
import { useRows } from "../../context/report/useRows";
import { useReportFormat } from "../../context/useReportFormat";
import { useReportMenu } from "../../context/useReportMenu";
import { useReportScope } from "../../context/useReportScope";
import { useChartExportControls } from "../../hooks/reports/useChartExportControl";
import { useGetReportWarehouseAll } from "../../hooks/reports/warehouse/useGetReportWarehouseAll";
import { handleExport } from "../export";
import { useTitle } from "../../context/report/useTitle";
import { useRefetchAll } from "../../context/report/useRefetchAll";

export function ButtonExport({initialColumns}){
    const {setIsMenuOpen} =  useReportMenu()
    const {rows} = useRows()
    const {format} = useReportFormat()
    const {scope} = useReportScope()
    const { refetchAll} = useRefetchAll();
    const { exportChart}  = useChartExportControls()
    const {columnVisibility} = useColumns()
    const {title} = useTitle()

    const handleClick = async() => {
        if(scope == 'all'){
            const { data: apiData } = await refetchAll();
            await handleExport({
                rows: apiData.data.data,
                format: format,
                initialColumns,
                columnVisibility,
                title
              })
            return setIsMenuOpen(false);
        }

        if(format === 'png' || format === 'svg'){
            exportChart(format, title)
            return setIsMenuOpen(false)
        }

        await handleExport({
                  rows: rows,
                  format: format,
                  initialColumns,
                  columnVisibility,
                  title
                })
        setIsMenuOpen(false); 
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