"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { transformSeriesToValues } from "./transformSeries";
import { HEIGHT } from "../apexchart/config";
import { COLORS } from "../color";
import {
  OPTION_ECHART,
  SERIE_ECHART,
  STYLE_AXIS_ECHART,
  TITLE_ECHART,
} from "./optionEchart";
import { useChartExport } from "../../context/chartExportContext";

const PieChartSemicircular = ({
  series = [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ],
  categories,
  title = "Distribución Semircular",
  startAngle = 180,
  endAngle = 360,
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
        color: COLORS, // Paleta de colores personalizada
        ...OPTION_ECHART,
        title: {
          text: title,
          subtext: subtitle,
          ...TITLE_ECHART,
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            radius: "100%",

            startAngle: startAngle,
            endAngle: endAngle,
            data: transformSeriesToValues(series, categories),
            ...SERIE_ECHART,
            center: ["50%", "70%"],
          },
        ],
       
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };

      // Pasamos la instancia al componente padre
    }
  }, [series, categories, title, startAngle, endAngle]);

  // Manejo de redimensionamient

  return <div ref={chartRef} style={{ width: "100%", height: HEIGHT }} />;
};

export default PieChartSemicircular;
