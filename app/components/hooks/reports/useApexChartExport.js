import { useEffect } from 'react';
import { useChartExport } from '../../context/chartExportContext';

export const useApexChartExport = (chartId, chartRef) => {
  const { registerChart } = useChartExport();

  useEffect(() => {
    if (!chartId || !chartRef?.current) return;

    let retryTimer;
    let mounted = true;

    const tryRegister = () => {
      if (!mounted) return;

      const chart = chartRef.current?.chart;

      if (chart?.el?.parentNode) {
        registerChart(chartId, (type = 'png') => {
          chart.dataURI().then(({ imgURI, svgURI }) => {
            const uri = type === 'svg' ? svgURI : imgURI;
            const link = document.createElement('a');
            link.href = uri;
            link.download = `${chartId}.${type}`;
            link.click();
          });
        });
      } else {
        // Reintentar después de un breve retraso si el componente sigue montado
        retryTimer = setTimeout(tryRegister, 300);
      }
    };

    tryRegister();

    // Cleanup function para evitar memory leaks
    return () => {
      mounted = false;
      clearTimeout(retryTimer);
    };
  }, [chartId, chartRef, registerChart]);
};