import { useCallback } from "react";
import { exportApexChart, exportEChart } from "../../report/exportChart";
import useChartStore from "../../context/useChartStore";
import { useReportChart } from "../../context/useReportChart";
import { useChartExport } from "../../context/chartExportContext";

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
  

    const  exportChart = useCallback((format)=>{
      const today = new Date();
        const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD  
      if (!chartInstanceRef.current) return;
      
      if (type === 'apexchart') {
        return exportApexChart(chartInstanceRef.current, `chart-${formattedDate}`, format);
      } else if (type === 'echart'){
        return exportEChart(chartInstanceRef.current, `chart-${formattedDate}`, format);
      }
      return null
    }, [chartInstanceRef, type]);
    
    return {
        exportChart
    }
    
};