"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';

// Carga dinámica para evitar errores de SSR con ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart = (
                    {
                        categories = [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                          ],
                          yaxis = 'Ventas ($)', 
                          title = 'Gráfico de Columnas - Ventas Mensuales',
                          series = [
                            {
                              name: 'Ventas en 2023',
                              data: [1200, 1400, 1500, 1800, 1900, 2100, 2200, 2500, 2600, 2400, 2300, 2200],
                            },
                          ]
                    }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false, // Para columnas verticales
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: yaxis,
      },
    },
    title: {
      text: title,
      align: 'center',
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `$${val}`;
        },
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={HEIGHT} />;
};

export default ColumnChart;
