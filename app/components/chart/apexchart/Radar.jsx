"use client"
import React, { forwardRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';
import { COLORS } from '../color';
import { TITLE_ECHART } from '../echart/optionEchart';
import { TITLE_APEX } from './optionApex';
import { useChartExport } from '../../context/chartExportContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadarChart = ({
  categories = ['2011', '2012', '2013', '2014', '2015', '2016'],
  series = [
    { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
    { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
    { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] }
  ],
  title = 'Gráfico de Radar',
}) => {
  const { chartInstanceRef } = useChartExport();
  const options = {
    chart: {
      height: 350,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      },
      events: {
        mounted: (chartContext) => {
          chartInstanceRef.current = chartContext
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true // Cada barra usa un color diferente
      },
    },
    colors: COLORS, // Paleta de colores
    title: {
      text: title,
      ...TITLE_APEX,
    },
    stroke: { width: 2 },
    fill: { opacity: 0.1 },
    markers: { size: 0 },
    xaxis: { categories: categories,
      labels: {
        style: {
          fontWeight: 'bold',
          fontSize: '13px',
          colors: '#000'
        }
      }
    },
    yaxis: { show: false },
    tooltip: {
      y: {
        formatter: function(val) {
          return `${val}`;
        },
      },
    },
  };


  return <Chart 
    options={options} 
    series={series} 
    type="radar" 
    height={HEIGHT} 
  />
}


export default RadarChart;