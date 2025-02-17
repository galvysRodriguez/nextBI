import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { transformSeriesToValues } from './transformSeries';
import { HEIGHT } from '../apexchart/config';



const PieChart = ({ 
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
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
      },
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
          radius: '50%',
         
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: transformSeriesToValues(series, categories),
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

export default PieChart;
