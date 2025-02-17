// components/LineChart.js
import React from "react";
import ReactApexChart from "react-apexcharts";
import { HEIGHT } from "./config";

const LineChart = ( {
    categories = ['2011', '2012', '2013', '2014', '2015', '2016'],
    series = [
        {
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        },
        {
          name: 'Series 2',
          data: [20, 30, 40, 80, 20, 80],
        },
        {
          name: 'Series 3',
          data: [44, 76, 78, 13, 43, 10],
        },
      ], 
      title = 'Radar Chart - Multi Series'

}) => {
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: title || "Default Title",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories || [],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={HEIGHT} />
    </div>
  );
};

export default LineChart;
