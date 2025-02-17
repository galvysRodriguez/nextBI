import React, { useState } from "react";

import RadarChart from "../chart/apexchart/Radar";
import LineChart from "../chart/apexchart/Line";
import StackedColumnChart from "../chart/apexchart/StackedColumn";
import ColumnChart from "../chart/apexchart/BasicColumn";
import PieChart from "../chart/echart/Pie";
import NightingaleChart from "../chart/echart/Nightingale";
import BasicBarChart from "../chart/apexchart/BasicBar";
import StackedBarChart from "../chart/apexchart/StackedBar";
import DonutChart from "../chart/echart/Donut";
import PieChartSemicircular from "../chart/echart/PieChartSemicircular";


const chartComponents = {
  //basicArea: <BasicAreaChart />,
  //stackedArea: <StackedAreaChart />,
  line: <LineChart />,
  stackedColumn: <StackedColumnChart/>,
  basicColumn: <ColumnChart />,
  radar: <RadarChart />,
  pie: <PieChart/>,
  nightingale: <NightingaleChart />,
  //gauge: <GaugeChart />,
  basicBar: <BasicBarChart/>,
  stackedBar: <StackedBarChart />,
  donut: <DonutChart></DonutChart>,
  pieSemi: <PieChartSemicircular></PieChartSemicircular>
};

export function Chart({series, categories}) {
  const [selectedChart, setSelectedChart] = useState("stackedColumn");

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(chartComponents).map((chartKey) => (
          <button
            key={chartKey}
            onClick={() => setSelectedChart(chartKey)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              cursor: "pointer",
              backgroundColor: selectedChart === chartKey ? "#007bff" : "#f0f0f0",
              color: selectedChart === chartKey ? "white" : "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {chartKey}
          </button>
        ))}
      </div>
      <div>
        {/* Mostrar el gráfico seleccionado */}
      <div style={{height:'800px'}}>
        {React.cloneElement(chartComponents[selectedChart], {
          series: series,
          categories:categories,
        })}
      </div>
      </div>
    </div>
  );
}
