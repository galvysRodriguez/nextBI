"use client"
import React, { forwardRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HEIGHT } from './config';
import { COLORS } from '../color';
import { TITLE_ECHART } from '../echart/optionEchart';
import { TITLE_APEX } from './optionApex';
import { useChartExport } from '../../context/chartExportContext';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ColumnChart = ({
  categories = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  yaxis = 'Ventas ($)',
  title = 'Gráfico de Columnas - Ventas Mensuales',
  series = [{
    name: 'Ventas en 2023',
    data: [1200, 1400, 1500, 1800, 1900, 2100, 2200, 2500, 2600, 2400, 2300, 2200]
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
      },
      zoom: { enabled: true },
            toolbar: {
              show: false,
              tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
              },
            },
    },
    colors: COLORS, // Paleta de colores
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
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
          return `${val}`;
        },
      },
    },
  };

  return <Chart 
    options={options} 
    series={series} 
    type="bar" 
    height={HEIGHT} 
  />
}


export default ColumnChart;