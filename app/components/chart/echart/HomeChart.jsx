"use client";
import dynamic from "next/dynamic";
import { COLORS as color } from "../../utils/const";
import { COLORS } from "../color";
import { STYLE_AXIS, SUBTITLE_APEX, TITLE_APEX } from "../apexchart/optionApex";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const generateMockData = () => {
  const dates = [
    "2023-01-15",
    "2023-02-10",
    "2023-03-05",
    "2023-04-20",
    "2023-05-15",
    "2023-06-08",
    "2023-07-12",
    "2023-08-18",
    "2023-09-22",
    "2023-10-30",
    "2023-11-14",
    "2023-12-05",
  ];

  return {
    labels: dates,
    inventory: dates.map(() => Math.floor(Math.random() * 5000) + 3000),
    purchases: dates.map(() => Math.floor(Math.random() * 8000) + 5000),
    sales: dates.map(() => Math.floor(Math.random() * 7000) + 4000),
  };
};

const HomeChart = ({
  inventory,
  purchases,
  sales,
  labels,
  title = "Métricas clave",
  xtitle = "Fecha",
  ytitle = "Total",
  subtitle = "Total por fecha"
}) => {
  const mockData = generateMockData();

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
    stroke: {
      curve: "smooth",
      width: [3, 3, 3, 0],
    },
    title: {
      text: title,
      ...TITLE_APEX,
    },
    subtitle: {
      text: subtitle,
      ...SUBTITLE_APEX,
    },
    dataLabels: { enabled: false },
    labels: labels,
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
        formatter: function (value) {
          return new Date(value + "T00:00:00Z") 
            .toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
            });
        }
      },
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
    legend: { position: "bottom" },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        barHeight: "100%",
        borderRadius: 4,
        barGap: "-50%",
      },
    },
  };

  const chartSeries = [
    {
      name: "Valor de inventario",
      data: inventory,
      type: "line",
    },
    {
      name: "Volumen de compras",
      data: purchases,
      type: "line",
    },
    {
      name: "Volumen de ventas",
      data: sales,
      type: "line",
    },
  ];

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
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={500}
      />
    </div>
  );
};

export default HomeChart;
