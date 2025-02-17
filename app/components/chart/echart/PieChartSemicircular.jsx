import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { transformSeriesToValues } from './transformSeries';
import { HEIGHT } from '../apexchart/config';

const PieChartSemicircular = ({ 
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
          radius: ['40%', '70%'],
          center: ['50%', '70%'], // Adjust the center to position the semicircle
          startAngle: 180, // Start angle for semicircle
          endAngle: 360, // End angle for semicircle
          data: transformSeriesToValues(series,categories)
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

export default PieChartSemicircular;
