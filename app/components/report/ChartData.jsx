"use client"
import RadarChart from "../chart/apexchart/Radar";
import LineChart from "../chart/apexchart/Line";
import ColumnChart from "../chart/apexchart/BasicColumn";
import PieChart from "../chart/echart/Pie";
import NightingaleChart from "../chart/echart/Nightingale";
import BasicBarChart from "../chart/apexchart/BasicBar";
import DonutChart from "../chart/echart/Donut";
import PieChartSemicircular from "../chart/echart/PieChartSemicircular";
import { ButtonChart } from "./container/ButtonChart";
import { useReportLayout } from "../context/reportLayout";
import React, { cloneElement }  from "react";
import { useReportChart } from "../context/useReportChart";


const chartComponents = {
  //basicArea: <BasicAreaChart />,
  //stackedArea: <StackedAreaChart />,
  line: <LineChart />,
  //stackedColumn: <StackedColumnChart/>,
  basicColumn: <ColumnChart />,
  radar: <RadarChart />,
  pie: <PieChart/>,
  nightingale: <NightingaleChart />,
  //gauge: <GaugeChart />,
  basicBar: <BasicBarChart/>,
  //stackedBar: <StackedBarChart />,
  donut: <DonutChart></DonutChart>,
  pieSemi: <PieChartSemicircular></PieChartSemicircular>
};
export default function ChartData({series, categories}) {
    const{selectedChart} = useReportChart()
  return (
    <div className="p-6">
      <div className="mb-6">
        {Object.keys(chartComponents).map((chartKey) => (
          <ButtonChart chartKey={chartKey} key={chartKey}></ButtonChart>
        ))}
      </div>
      <div>
        {/* Mostrar el gráfico seleccionado */}
      <div className="h-[700px]">
        {React.cloneElement(chartComponents[selectedChart], {
          series: series,
          categories:categories,
        })}
      </div>
      </div>
    </div>
  );
}