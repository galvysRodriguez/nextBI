"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';

// Carga dinámica para evitar errores de SSR con ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BasicBarChart = (
                {
                    categories = [
                        'South Korea',
                        'Canada',
                        'United Kingdom',
                        'Netherlands',
                        'Italy',
                        'France',
                        'Japan',
                        'United States',
                        'China',
                        'Germany',
                      ], 
                      title, 
                      series = [
                        {
                          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
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
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
  };

  return <Chart options={options} series={series} type="bar" height={HEIGHT} />;
};

export default BasicBarChart;
