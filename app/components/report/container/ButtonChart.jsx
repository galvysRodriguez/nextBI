import { useReportLayout } from "../../context/reportLayout"
import { useReportChart } from "../../context/useReportChart"

const chartNames = {
    line: "Línea",
    basicColumn: "Columna Básica",
    radar: "Radar",
    pie: "Pastel",
    nightingale: "Rosa de Vientos",
    basicBar: "Barra Básica",
    donut: "Dona",
    pieSemi: "Pastel Semicircular",
  };

export function ButtonChart({chartKey}){
    const { selectedChart, setSelectedChart} = useReportChart()
    return (
        <button
            onClick={() => setSelectedChart(chartKey)}
            className={`px-4 py-2 m-1 rounded-lg font-medium transition-all duration-300 
                border shadow-sm 
                ${
                selectedChart === chartKey
                    ? 'bg-[#085494] text-white border-blue-700'
                    : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'
                }`}
            >
            {chartNames[chartKey] || chartKey}
        </button>
    )
}