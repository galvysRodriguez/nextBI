"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { HEIGHT } from "./config";
import { COLORS } from "../color";
import { useApexChartExport } from "../../hooks/reports/useApexChartExport";
import { TITLE_ECHART } from "../echart/optionEchart";
import { SUBTITLE_APEX, TITLE_APEX, STYLE_AXIS } from "./optionApex";
import { useChartExport } from "../../context/chartExportContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineChart = ({
  categories = ["2011", "2012", "2013", "2014", "2015", "2016"],
  series = [
    { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
    { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
    { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
  ],
  title = "Gráfico de Líneas",
  subtitle,
  ytitle,
  xtitle,
}) => {
  const { chartInstanceRef } = useChartExport();
  const options = {
    chart: {
      height: 350,
      type: "line",
      events: {
        mounted: (chartContext) => {
          chartInstanceRef.current = chartContext;
        },
      },
      zoom: { enabled: true },
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    colors: COLORS, // Paleta de colores
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true, // Cada barra usa un color diferente
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3, 3],
    },
    title: {
      text: title,
      ...TITLE_APEX,
    },
    subtitle: {
      text: subtitle,
      ...SUBTITLE_APEX,
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: xtitle,
        ...STYLE_AXIS,
      },
    },

    yaxis: {
      title: {
        text: ytitle,
        ...STYLE_AXIS,
      },
    },
    markers: {
      size: 5,
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="line"
        height={HEIGHT}
        //ref={chartRef}
      />
    </div>
  );
};

export default LineChart;
