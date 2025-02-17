// components/BasicAreaChart.js
import React from "react";
import ReactApexChart from "react-apexcharts";
import { HEIGHT } from "./config";

const BasicAreaChart = ({ categories = [
    "2018-09-19T00:00:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ], seriesData =  [
    {
      name: "Series 1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "Series 2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]}) => {
  const options = {
    chart: {
      type: "area",
      height: 350,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: categories || [],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div id="chart-basic">
      <ReactApexChart options={options} series={seriesData} type="area" height={HEIGHT} />
    </div>
  );
};

export default BasicAreaChart;
