import React, { useState } from "react";
import dynamic from "next/dynamic";
import { COLORS } from "../../utils/const";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficChart = ({ colors = [COLORS.chartPrincipal, COLORS.chartSecondary], title = 'Total de ventas' }) => {
  const [chartOptions] = useState({
    chart: {
      height: "100%",
      type: "line",
      toolbar: {
        show: true,
      },
      background: COLORS.white, // Fondo del gráfico en modo claro
    },
    colors: colors, // Colores de las series
    stroke: {
      width: [0, 4],
      dashArray: [0, 8],
    },
    title: {
      text: title,
      align: "center",
      style: {
        color: COLORS.black, // Color del título en modo claro
        fontFamily: 'Arial, sans-serif', // Cambia la fuente del título
        fontSize: '24px', // Cambia el tamaño de la fuente
        fontWeight: '500', // Cambia el grosor de la fuente
      },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    fill: {
      opacity: [0.85, 1],
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val}`,
      },
      theme: "light", // Tooltip en modo claro
    },
    markers: {
      size: 6,
      hover: {
        size: 8,
      },
    },
    annotations: {
      xaxis: [
        {
          x: "01 Jan 2001",
          borderColor: "#00E396",
          label: {
            text: "Inicio",
            style: {
              color: COLORS.black, // Color del texto de la anotación
              background: COLORS.white, // Fondo de la anotación
            },
          },
        },
        {
          x: "09 Jan 2001",
          borderColor: "#FF4560",
          label: {
            text: "Hoy",
            style: {
              color: COLORS.black, // Color del texto de la anotación
              background: COLORS.white, // Fondo de la anotación
            },
          },
        },
      ],
    },
    grid: {
      borderColor: "#e7e7e7", // Color de la cuadrícula en modo claro
      row: {
        colors: ["transparent", "#f3f3f3"], // Colores de las filas de la cuadrícula
        opacity: 0.5,
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: COLORS.black, // Color de las etiquetas del eje X
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: COLORS.black, // Color de las etiquetas del eje Y
        },
      },
    },
  });

  const [chartSeries] = useState([
    {
      name: "Valores obtenidos",
      type: "column",
      data: [440, 505, 514, 671, 727, 813, 901, 952, 1052, 1120, 1257, 1360],
    },
    {
      name: "Objetivo",
      type: "line",
      data: [400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500],
    },
  ]);

  return (
    <div
      style={{
        width: "80%",
        height:'100%',
        margin: "0 auto",
        borderRadius: "8px", // Bordes redondeados
        padding: "20px", // Espaciado alrededor del gráfico
        backgroundColor: COLORS.white, // Fondo del contenedor
      }}
    >
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={600}
      />
    </div>
  );
};

export default TrafficChart;