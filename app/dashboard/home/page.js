"use client"
import HomeChart from 'app/app/components/chart/echart/HomeChart';
import { TitleBase } from 'app/app/components/container/Title';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

const ObjectivesDashboard = () => {
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [showGraphFilters, setShowGraphFilters] = useState(false);
  
  const [dateRange, setDateRange] = useState({
    start: '2023-01-01',
    end: '2023-12-31',
  });
  
  const [graphFilters, setGraphFilters] = useState({
    start: '2023-01-01',
    end: '2023-12-31',
    deposit: 'Todos'
  });

  const perspectives = [
    { id: 1, name: 'Compras', active: 35, completed: 15, failed: 6, details: 'Objetivos de compras y adquisiciones' },
    { id: 2, name: 'Ventas', active: 52, completed: 27, failed: 7, details: 'Objetivos de ventas y marketing' },
    { id: 3, name: 'Almacenes', active: 29, completed: 12, failed: 3, details: 'Objetivos de almacén e inventario' },
    { id: 4, name: 'Producción', active: 41, completed: 18, failed: 5, details: 'Objetivos de producción y manufactura' },
    { id: 5, name: 'Logística', active: 23, completed: 9, failed: 2, details: 'Objetivos de distribución y logística' },
    { id: 6, name: 'Calidad', active: 18, completed: 8, failed: 1, details: 'Objetivos de control de calidad' },
  ];

   const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;

  const navigate = (direction) => {
    if (direction === 'next') {
      setCurrentIndex(prev => (prev + 1) % (perspectives.length - cardsToShow + 1));
    } else {
      setCurrentIndex(prev => (prev - 1 + (perspectives.length - cardsToShow + 1)) % (perspectives.length - cardsToShow + 1));
    }
  };

  const visiblePerspectives = perspectives.slice(currentIndex, currentIndex + cardsToShow);

  const deposits = ['Todos', 'Depósito 1', 'Depósito 2', 'Depósito 3'];

  return (
    <div className="max-w-6xl mx-auto pb-8">
        <TitleBase title={"Tablero"}></TitleBase>
      <div className="mb-6">
        <button 
          onClick={() => setShowDateFilters(!showDateFilters)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
        >
          <span className="mr-2">{showDateFilters ? '▼' : '▶'}</span>
          Filtros de fecha
        </button>
        
        {showDateFilters && (
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicial</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="p-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="p-2 border rounded-md"
                />
              </div>
              <button className="self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>

      
      <div className="relative mb-8">
        <button 
          onClick={() => navigate('prev')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition -ml-4"
          disabled={currentIndex === 0}
        >
          <ChevronLeft></ChevronLeft>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
          {visiblePerspectives.map((perspective) => (
            <div key={perspective.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="p-6 flex flex-col">
                <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
                  {perspective.name}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">Activos</span>
                      <span className="text-sm font-semibold">{perspective.active}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#67A7EB] h-2.5 rounded-full" 
                        style={{ width: `${(perspective.active / (perspective.active + perspective.completed + perspective.failed)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">Completados</span>
                      <span className="text-sm font-semibold ">{perspective.completed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#94ADD1]  h-2.5 rounded-full" 
                        style={{ width: `${(perspective.completed / (perspective.active + perspective.completed + perspective.failed)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">Fallados</span>
                      <span className="text-sm font-semibold ">{perspective.failed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#9DC2EB] h-2.5 rounded-full" 
                        style={{ width: `${(perspective.failed / (perspective.active + perspective.completed + perspective.failed)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate('next')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition -mr-4"
          disabled={currentIndex >= perspectives.length - cardsToShow}
        >
          <ChevronRight></ChevronRight>
        </button>
      </div>


      <div className="rounded-lg p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setShowGraphFilters(!showGraphFilters)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showGraphFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        </div>
        
        {showGraphFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicial</label>
                <input
                  type="date"
                  value={graphFilters.start}
                  onChange={(e) => setGraphFilters({...graphFilters, start: e.target.value})}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
                <input
                  type="date"
                  value={graphFilters.end}
                  onChange={(e) => setGraphFilters({...graphFilters, end: e.target.value})}
                  className="p-2 border rounded-md w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Depósito</label>
                <select
                  value={graphFilters.deposit}
                  onChange={(e) => setGraphFilters({...graphFilters, deposit: e.target.value})}
                  className="p-2 border rounded-md w-full"
                >
                  {deposits.map(deposit => (
                    <option key={deposit} value={deposit}>{deposit}</option>
                  ))}
                </select>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Aplicar filtros
            </button>
          </div>
        )}
        
        <div className="h-192 flex items-center justify-cente">
          <HomeChart></HomeChart>
        </div>
      </div>
    </div>
  );
};



export default function Home() {
  return (
    <>
       <ObjectivesDashboard></ObjectivesDashboard> 
    </>
  );
}
