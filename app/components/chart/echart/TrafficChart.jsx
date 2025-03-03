import dynamic from "next/dynamic";
import { COLORS } from "../../utils/const";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficChart = ({ label, cumulative, current, average, min_daily, title = 'Total de ventas' }) => {
  const minDailyArray = Array(label.length).fill(min_daily);
  
  const chartOptions = {
    chart: {
      height: "100%",
      type: "bar",
      zoom: { enabled: true },
      toolbar: {
        show: true,
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
      background: COLORS.white,
    },
    colors: [COLORS.chartPrincipal, "#0FC2C0", "#28A745", "#023535"],
    stroke: { width: [1, 4, 2, 0] },
    title: {
      text: title,
      align: "center",
      style: {
        color: COLORS.black,
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
      labels: { style: { colors: COLORS.black } },
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
      name: "Acumulado",
      type: "bar",
      data: cumulative,
    },
    {
      name: "Valor del día",
      type: "line",
      data: current,
    },
    {
      name: "Objetivo",
      type: "line",
      data: average,
    },
    {
      name: "Mínimo Diario",
      type: "area",
      data: minDailyArray,
    },
  ]

  return (
    <div
      style={{
        width: "80%",
        height: "100%",
        margin: "0 auto",
        borderRadius: "8px",
        padding: "20px",
        backgroundColor: COLORS.white,
      }}
    >
      <ReactApexChart options={chartOptions} series={chartSeries} type="line" height={600} />
    </div>
  );
};

export default TrafficChart;
