"use client";
import { forwardRef, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { HEIGHT } from "../apexchart/config";
import { transformSeriesToValues } from "./transformSeries";
import {
  OPTION_ECHART,
  SERIE_ECHART,
  STYLE_AXIS_ECHART,
  TITLE_ECHART,
} from "./optionEchart";
import { COLORS } from "../color";
import { useChartExport } from "../../context/chartExportContext";

const NightingaleChart = ({
  series = [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ],
  categories,
  title,
  subtitle,
  ytitle,
  xtitle,
}) => {
  const { chartRef, chartInstanceRef } = useChartExport();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      chartInstanceRef.current = myChart;

      const option = {
        ...OPTION_ECHART,
        color: COLORS, 
        series: [
          {
            type: "pie",
            ...SERIE_ECHART,
            data: transformSeriesToValues(series, categories),
            // Configuración específica para gráfico Nightingale (rosa)
            radius: ["20%", "80%"],
            roseType: "radius",
            center: ["50%", "53%"],
          },
        ],
        title: {
          text: title,
          subtext: subtitle,
          ...TITLE_ECHART,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, [series, categories, title]);

  // Manejo de redimensionamiento

  return <div ref={chartRef} style={{ width: "100%", height: HEIGHT }} />;
};

export default NightingaleChart;

/*name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',*/
