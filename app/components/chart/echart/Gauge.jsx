// components/GaugeChart.js

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "@mui/material/styles";
import { COLORS } from "../../utils/const";



const GaugeChart = ({ value = 70, title = "Cumplimiento" }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Inicializa el gráfico solo después de que el componente haya sido montado
    const myChart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: COLORS.white, // Fondo dinámico basado en el tema
      title: {
        text: title, // Título dinámico
        left: "center", // Alineación del título
        top: "5%", // Posición del título
        textStyle: {
          color: '#000', // Color del texto basado en el tema
          fontSize: 20, // Tamaño de la fuente del título
          fontWeight: "bold", // Estilo de fuente
        },
      },
      series: [
        {
          type: "gauge",
          progress: {
            show: true,
            width: 18,
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: COLORS.constrant,
            },
          },
          axisLabel: {
            distance: 25,
            color: COLORS.constrant, // Color dinámico para el texto
            fontSize: 20,
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              borderColor: COLORS.constrant, // Color del ancla basado en el tema
            },
          },
          detail: {
            valueAnimation: true,
            fontSize: 60,
            offsetCenter: [0, "90%"],
            color: COLORS.title, // Color dinámico para el detalle
          },
          data: [
            {
              value: value, // Valor dinámico pasado como prop
            },
          ],
        },
      ],
    };

    myChart.setOption(option);

    // Actualizar el valor dinámicamente si cambia
    return () => {
      myChart.dispose();
    };
  }, [value, title]); // Dependencias del valor, título y tema

  return <div ref={chartRef} style={{ width: "600px", height: "400px", borderRadius:"1rem", overflow:'hidden'}} />;
};

export default GaugeChart;
