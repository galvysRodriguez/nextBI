"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';

// Carga dinámica para evitar errores de SSR con ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StackedBarChart = (
                    {
                        categories = [2008, 2009, 2010, 2011, 2012, 2013, 2014], 
                        title = 'Fiction Books Sales',
                        series = [
                            {
                              name: 'Marine Sprite',
                              data: [44, 55, 41, 37, 22, 43, 21],
                            },
                            {
                              name: 'Striking Calf',
                              data: [53, 32, 33, 52, 13, 43, 32],
                            },
                            {
                              name: 'Tank Picture',
                              data: [12, 17, 11, 9, 15, 11, 20],
                            },
                            {
                              name: 'Bucket Slope',
                              data: [9, 7, 5, 8, 6, 9, 4],
                            },
                            {
                              name: 'Reborn Kid',
                              data: [25, 12, 19, 32, 25, 24, 10],
                            },
                          ]
                    }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    title: {
      text: title,
    },
    xaxis: {
      categories: categories,
      labels: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + 'K';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40,
    },
  };

  return <Chart options={options} series={series} type="bar" height={HEIGHT} />;
};

export default StackedBarChart;
