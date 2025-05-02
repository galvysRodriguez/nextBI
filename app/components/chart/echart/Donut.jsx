"use client"
import React, { forwardRef, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { HEIGHT } from '../apexchart/config';
import { transformSeriesToValues } from './transformSeries';
import { OPTION_ECHART, SERIE_ECHART, TITLE_ECHART } from './optionEchart';
import { COLORS } from '../color';
import { useChartExport } from '../../context/chartExportContext';

const DonutChart = ({ 
  series = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ], 
  categories,
  title = "Donut Chart"
}) => {
  const { chartRef, chartInstanceRef } = useChartExport();

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      chartInstanceRef.current = myChart;
      
      const option = {
        ...OPTION_ECHART,
        color: COLORS,
        series: [
          {
            type: 'pie',
            ...SERIE_ECHART,
            data: transformSeriesToValues(series, categories),
            radius: ['40%', '70%'], // Configuración específica para donut
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)'
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        title: {
          text: title,
          ...TITLE_ECHART,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        }
      };

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }}, [series, categories, title]);
  

  return <div ref={chartRef} style={{ width: '100%', height: HEIGHT }} />;
};


export default DonutChart