import { useCallback } from "react";
import { exportApexChart, exportEChart } from "../../report/exportChart";
import useChartStore from "../../context/useChartStore";
import { useReportChart } from "../../context/useReportChart";
import { useChartExport } from "../../context/chartExportContext";
import { showErrorToast } from "../../utils/toast";
import { useReportView } from "../../context/useReportView";

const chartLibraryTypes = {
  line: 'apexchart',
  basicColumn: 'apexchart',
  radar: 'apexchart',
  pie: 'echart',
  nightingale: 'echart',
  basicBar: 'apexchart',
  donut: 'echart',
  pieSemi: 'echart'
};


export const useChartExportControls = () => {
    const {chartInstanceRef, chartRef} = useChartExport()
    const {selectedChart} = useReportChart()
    const type = chartLibraryTypes[selectedChart];
    const {isChart} = useReportView()
  

    const  exportChart = useCallback((format, title)=>{
      const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];  
      if (!isChart) {
        showErrorToast("Error, ingrese a la sección de gráfica")
        return;
      }
      
      if (type === 'apexchart') {
        return exportApexChart(chartInstanceRef.current, `${title}-${formattedDate}`, format);
      } else if (type === 'echart'){
        return exportEChart(chartInstanceRef.current, `${title}-${formattedDate}`, format);
      }
      return null
    }, [chartInstanceRef, type, isChart]);
    
    return {
        exportChart
    }
    
};