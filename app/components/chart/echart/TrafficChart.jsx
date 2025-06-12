"use client"
import dynamic from "next/dynamic";
import { COLORS as color} from "../../utils/const";
import { COLORS } from "../color";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficChart = ({ label, optimal, current, deficient, tolerable, title = 'Total de ventas' }) => {
  const optimalArray = Array(label.length).fill(optimal);
  const tolerableArray = Array(label.length).fill(tolerable);
  const deficientArray = Array(label.length).fill(deficient);
  
  const chartOptions = {
    chart: {
      height: "100%",
      type: "bar",
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
      background: color.white,
    },
    colors: COLORS,
    stroke: { width: [1, 4, 2, 0] },
    title: {
      text: title,
      align: "center",
      style: {
        color: color.black,
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        fontWeight: '500',
      },
    },
    dataLabels: { enabled: false },
    labels: label,
    fill: { opacity: 1 },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (val) => `${val}` },
      theme: "light",
    },
    markers: {
      size: 6,
      hover: { size: 8 },
    },
    grid: {
      borderColor: "#e7e7e7",
      row: { colors: ["transparent", "#f3f3f3"], opacity: 0.5 },
    },
    xaxis: {
      labels: { 
          style: { colors: color.black },
          formatter: function(value) {
            return new Date(value).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
            }
        },
    },
    yaxis: {
      labels: { style: { colors: COLORS.black } },
    },
    legend: { position: "bottom" },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        barHeight: "100%",
        borderRadius: 4,
        barGap: "-50%",
      },
    },
  }

  const chartSeries =[
    {
      name: "Obtenido",
      type: "line",
      data: current,
    },
    {
      name: "Óptimo",
      type: "line",
      data: optimalArray,
    },
    {
      name: "Deficiente",
      type: "area",
      data: deficientArray,
    },
    {
      name: "Tolerable",
      type: "bar",
      data: tolerableArray,
    },
  ]

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        margin: "0 auto",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: color.white,
      }}
    >
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={600} />
    </div>
  );
};

export default TrafficChart;
