"use client"
import React from "react";
import ReactApexChart from "react-apexcharts";
import { HEIGHT } from "./config";

const StackedAreaChart = ({
  categories = [
    "2018-09-19T00:00:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ],
  seriesData = [
    {
      name: "Series 1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Series 2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
}) => {
  const options = {
    chart: {
      type: "area",
      height: 350,
      stacked: true,
      events: {
        selection: (chart, e) => {
          console.log("Selection range:", new Date(e.xaxis.min), new Date(e.xaxis.max));
        },
      },
    },
    colors: ["#008FFB", "#00E396", "#CED4DC"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth", // Use "smooth" for better visuals
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: "datetime", // Ensure datetime is used correctly
      categories: categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  return (
    <div id="chart-stacked">
      <ReactApexChart options={options} series={seriesData} type="area" height={HEIGHT} />
    </div>
  );
};

export default StackedAreaChart;
