"use client";
import React, { forwardRef, useEffect, useRef } from "react";
import * as echarts from "echarts";
import { transformSeriesToValues } from "./transformSeries";
import { HEIGHT } from "../apexchart/config";
import { COLORS } from "../color";
import { OPTION_ECHART, SERIE_ECHART, STYLE_AXIS_ECHART, TITLE_ECHART } from "./optionEchart";
import { useChartExport } from "../../context/chartExportContext";

const PieChart = ({
  series = [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ],
  categories,
  title = "Referer of a Website",
  subtitle,
  xtitle,
  ytitle,
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
            radius: "50%",
            data: transformSeriesToValues(series, categories),
            avoidLabelOverlap: false,
            name: "Valor",
            label: {
              show: true,
              position: "outside",
              formatter: "{b}: {d}%", // Show percentage and name
            },
            labelLine: {
              show: true,
            },
            itemStyle: {
              borderRadius: 5,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: true,
              formatter: "{b}: {d}%",
              position: "outside",
            },
            labelLine: {
              length: 15,
              length2: 0,
              maxSurfaceAngle: 80,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      
        radius: "100%",
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };

      // Pasamos la instancia al componente padre
    }
  }, [series, categories, title]);

  // Manejo de redimensionamiento

  return <div ref={chartRef} style={{ width: "100%", height: HEIGHT }} />;
};

export default PieChart;
