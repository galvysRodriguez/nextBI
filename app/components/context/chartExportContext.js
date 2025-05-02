import React, { createContext, useContext, useRef } from 'react';

const ChartExportContext = createContext();

export const ChartExportProvider = ({ children }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

  return (
    <ChartExportContext.Provider value={{ chartRef, chartInstanceRef }}>
      {children}
    </ChartExportContext.Provider>
  );
};

export const useChartExport = () => useContext(ChartExportContext);
