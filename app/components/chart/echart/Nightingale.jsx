// components/NightingaleChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { HEIGHT } from '../apexchart/config';
import { transformSeriesToValues } from './transformSeries';

const NightingaleChart = ({ 
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
      legend: {
        top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: transformSeriesToValues(series, categories),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: HEIGHT }} />;
};

export default NightingaleChart;
