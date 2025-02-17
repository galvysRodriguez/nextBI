import React from "react";
import dynamic from "next/dynamic";
import { HEIGHT } from "./config";

// Carga dinámica de ApexCharts para evitar problemas en Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SparklineChart = ({
  data = [],
  color = "#fff",
  height = 160,
  title = "",
  subtitle = "",
}) => {
  const options = {
    chart: {
      type: "line",
      height,
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "straight",
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: [color],
    title: {
      text: title,
      offsetX: 0,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: subtitle,
      offsetX: 0,
      style: {
        fontSize: "14px",
      },
    },
  };

  const series = [{ data }];

  return (
    <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <Chart options={options} series={series} type="area" height={HEIGHT} />
    </div>
  );
};

export default SparklineChart;
