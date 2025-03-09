"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';

// Carga dinámica para evitar errores de SSR con ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StackedColumnChart = (
                            {
                                categories = [
                                    'Enero',
                                    'Febrero',
                                    'Marzo',
                                    'Abril',
                                    'Mayo',
                                    'Junio',
                                    'Julio',
                                    'Agosto',
                                    'Septiembre',
                                    'Octubre',
                                    'Noviembre',
                                    'Diciembre',
                                  ],
                                  yaxis = 'Cantidad (unidades)',
                                  title = 'Gráfico de Columnas Apiladas - Ventas por Producto', 
                                  series = [
                                    {
                                      name: 'Producto A',
                                      data: [44, 55, 41, 67, 22, 43, 21, 49, 62, 32, 56, 71],
                                    },
                                    {
                                      name: 'Producto B',
                                      data: [53, 32, 33, 52, 13, 43, 32, 41, 56, 23, 45, 38],
                                    },
                                    {
                                      name: 'Producto C',
                                      data: [12, 17, 11, 9, 15, 11, 20, 12, 14, 15, 11, 16],
                                    },
                                  ]
                            }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true, // Activa las columnas apiladas
    },
    plotOptions: {
      bar: {
        horizontal: false, // Columnas verticales
        borderRadius: 4,
        columnWidth: '60%',
      },
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      title: {
        text: yaxis,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 10,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} unidades`,
      },
    },
    title: {
      text: title,
      align: 'center',
    },
    fill: {
      opacity: 1,
    },
  };

  return <Chart options={options} series={series} type="bar" height={HEIGHT} />;
};

export default StackedColumnChart;
