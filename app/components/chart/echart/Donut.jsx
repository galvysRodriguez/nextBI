import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { HEIGHT } from '../apexchart/config';
import { transformSeriesToValues } from './transformSeries';

const DonutChart = ({ 
  series = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ], 
  categories
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        
        {
          
          name: 'Access From',
          type: 'pie',
          radius: ['50%', '70%'], // Inner and outer radius to create the "donut" effect
          center: ['50%', '50%'], // Center the chart
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%', // Show percentage and name
          },
          labelLine: {
            show: true,
          },
          data:transformSeriesToValues(series, categories),
          
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [series]);

  return <div ref={chartRef} style={{ width: '100%', height: HEIGHT }} />;
};

export default DonutChart;
