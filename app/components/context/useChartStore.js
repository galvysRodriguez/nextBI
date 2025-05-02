import { create } from 'zustand';
import { createRef } from 'react';

const chartIdMap = {
  line: 'line-chart',
  basicColumn: 'column-chart',
  radar: 'radar-chart',
  pie: 'pie-chart',
  nightingale: 'nightingale-chart',
  basicBar: 'bar-chart',
  donut: 'donut-chart',
  pieSemi: 'semi-pie-chart'
};

const useChartStore = create((set, get) => ({
  chartRefs: {},

  // Obtener ID predefinido de gráfico
  getChartId: (chartType) => {
    return chartIdMap[chartType] || `custom-chart-${chartType}`;
  },

  // Añadir una referencia
  addChartRef: (chartId, ref) => set((state) => ({
    chartRefs: {
      ...state.chartRefs,
      [chartId]: ref
    }
  })),

  // Eliminar una referencia
  removeChartRef: (chartId) => set((state) => {
    const newRefs = { ...state.chartRefs };
    delete newRefs[chartId];
    return { chartRefs: newRefs };
  }),

  // Obtener una referencia de gráfico
  getChartRef: (chartId) => {
    return get().chartRefs[chartId];
  },

  exportChart: async (chartType, type = 'png') => {
    const get = useChartStore.getState;
    const chartId = get().getChartId(chartType);
    const chartWrapper = get().chartRefs[chartId];
  
    if (!chartWrapper || !chartWrapper.current || !chartWrapper.current.getChart) {
      console.error(`Gráfico ${chartId} no está disponible o mal referenciado`);
      return;
    }
  
    const chart = chartWrapper.current.getChart();
    if (!chart) {
      console.error(`No se pudo acceder al chart en ${chartId}`);
      return;
    }
  
    if (type === 'png' || type === 'svg') {
      return chart.dataURI().then(({ imgURI }) => {
        const link = document.createElement('a');
        link.download = `chart-${chartId}.${type}`;
        link.href = imgURI;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
  
}));

export default useChartStore;
