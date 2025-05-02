// components/GaugeChart.js
"use client"
import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTheme } from "@mui/material/styles";
import { COLORS } from "../../utils/const";

const GaugeChart = ({ result = 60, optimal = 100, title = "Cumplimiento" }) => {
  const chartRef = useRef(null);
  const value = (result / optimal) * 100; // Nivel de la aguja

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      backgroundColor: COLORS.white,
      title: {
        text: title,
        left: "center",
        top: "5%",
        textStyle: {
          color: "#000",
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      series: [
        {
          type: "gauge",
          progress: {
            show: true,
            width: 18,
            itemStyle: {
              color: COLORS.principal, // Color del progreso
            },
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
              color: COLORS.principal,
            },
          },
          axisLabel: {
            distance: 25,
            color: COLORS.principal,
            fontSize: 14, // Reducimos el tamaño de los labels del eje
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              borderColor: COLORS.principal,
            },
          },
          pointer: {
            itemStyle: {
              color: COLORS.principal, // Color de la aguja
            },
          },
          detail: {
            valueAnimation: true,
            fontSize: 40, // Tamaño más pequeño del texto principal
            offsetCenter: [0, "90%"],
            color: COLORS.title,
            formatter: `{small|${result}}`, // Muestra el % y el result
            rich: {
              small: {
                fontSize: 40, // Hace más pequeño el texto de `result`
                color: COLORS.title,
                lineHeight: 30,
              },
            },
          },
          data: [
            {
              value: value, // Nivel de la aguja
            },
          ],
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [value, title]);

  return <div ref={chartRef} style={{ width: "600px", height: "400px", borderRadius: "1rem", overflow: "hidden" }} />;
};

export default GaugeChart;
