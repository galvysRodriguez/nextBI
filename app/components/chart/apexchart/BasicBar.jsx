"use client"
import React, { forwardRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';
import { COLORS } from '../color';
import { TITLE_ECHART } from '../echart/optionEchart';
import { TITLE_APEX } from './optionApex';
import { useChartExport } from '../../context/chartExportContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BasicBarChart = ({
  categories = [
    'South Korea', 'Canada', 'United Kingdom', 'Netherlands', 
    'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'
  ],
  title = 'Gráfico de Barras Horizontal',
  series = [{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
}) => {
  const { chartInstanceRef } = useChartExport();
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      events: {
        mounted: (chartContext) => {
          chartInstanceRef.current = chartContext
        }
      }
    },
    colors: COLORS, // Paleta de colores personalizada
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        distributed: true // Cada barra usa un color diferente
      },
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: title,
      ...TITLE_APEX,
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val;
        }
      }
    }
  };


  return <Chart 
    options={options} 
    series={series} 
    type="bar" 
    height={HEIGHT} 
  />
}


export default BasicBarChart;