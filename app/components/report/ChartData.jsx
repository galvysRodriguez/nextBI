"use client"
import { ButtonChart } from "./container/ButtonChart";
import { useReportLayout } from "../context/reportLayout";
import { cloneElement, lazy, Suspense, useRef }  from "react";
import { useReportChart } from "../context/useReportChart";
import Progress from "../utils/Progress";
import useChartStore from "../context/useChartStore";


const RadarChart = lazy(() => import("../chart/apexchart/Radar"));
const LineChart = lazy(() => import("../chart/apexchart/Line"));
const ColumnChart = lazy(() => import("../chart/apexchart/BasicColumn"));
const PieChart = lazy(() => import("../chart/echart/Pie"));
const NightingaleChart = lazy(() => import("../chart/echart/Nightingale"));
const BasicBarChart = lazy(() => import("../chart/apexchart/BasicBar"));
const DonutChart = lazy(() => import("../chart/echart/Donut"));
const PieChartSemicircular = lazy(() => import("../chart/echart/PieChartSemicircular"));

const chartComponents = {
  line: LineChart,
  basicColumn: ColumnChart,
  radar: RadarChart,
  pie: PieChart,
  nightingale: NightingaleChart,
  basicBar: BasicBarChart,
  donut: DonutChart,
  pieSemi: PieChartSemicircular
};


export default function ChartData({series, categories, title, subtitle, ytitle, xtitle}) {
    console.time("chart-data")
    const{selectedChart} = useReportChart()
    const ChartComponent = chartComponents[selectedChart];
    console.timeEnd("chart-data")
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
        <Suspense fallback={<Progress></Progress>}>
          {ChartComponent && (
            <ChartComponent 
              series={series} 
              categories={categories} 
              title={title}
              chartId={selectedChart}
              subtitle={subtitle}
              ytitle={ytitle}
              xtitle={xtitle}
              />
            )}
        </Suspense>
      </div>
      </div>
    </div>
  );
}