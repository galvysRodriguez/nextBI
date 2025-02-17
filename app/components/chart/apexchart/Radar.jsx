import React from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';

// Carga dinámica para evitar problemas con SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadarChart = (
                    {
                        categories = ['2011', '2012', '2013', '2014', '2015', '2016'],
                        series = [
                            {
                              name: 'Series 1',
                              data: [80, 50, 30, 40, 100, 20],
                            },
                            {
                              name: 'Series 2',
                              data: [20, 30, 40, 80, 20, 80],
                            },
                            {
                              name: 'Series 3',
                              data: [44, 76, 78, 13, 43, 10],
                            },
                          ], 
                          title = 'Radar Chart - Multi Series'

                    }) => {
  const options = {
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    title: {
      text: title,
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: categories,
    },
  };

  return <Chart options={options} series={series} type="radar" height={HEIGHT} />;
};

export default RadarChart;
