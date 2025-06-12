"use client"
import { CardStatusTarget } from 'app/app/components/dashboard/CardStatusTarget';
import { Filters } from 'app/app/components/dashboard/Filters';
import { ShowFilters } from 'app/app/components/dashboard/ShowFilters';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { Suspense, useEffect, useState } from 'react';
import { useDashboardTargetQuery } from '../hooks/dashboard/useTargetStatus';
import { TargetStatusSkeleton } from 'app/app/dashboard/home/page';
import { normalizeDate } from '../utils/convertDate';

export default function ContainerTargetStatus({children}){
    const [showDateFilters, setShowDateFilters] = useState(false);
      
      const [dateRange, setDateRange] = useState({
        start: '2023-01-01',
        end: '2025-12-31',
      });
      
       const [currentIndex, setCurrentIndex] = useState(0);
      const cardsToShow = 3;
    
      const { refetch, isFetching, isError } = useDashboardTargetQuery({
              date_from: normalizeDate(dateRange.start),
              date_to: normalizeDate(dateRange.end),
          });
      
      const [data, setData] = useState([])
      
          useEffect(() => {
              const fetchData = async () => {
                  const { data: apiData } = await refetch();
                  setData(apiData.data || [])
              };
      
              if (dateRange.start && dateRange.end) {
                  fetchData();
              }
    
      
          }, [dateRange.start, dateRange.end]);

           const navigate = (direction) => {
        if (direction === 'next') {
          setCurrentIndex(prev => (prev + 1) % (data.length - cardsToShow + 1));
        } else {
          setCurrentIndex(prev => (prev - 1 + (data.length - cardsToShow + 1)) % (data.length - cardsToShow + 1));
        }
      };

      if(isFetching){
        return (<TargetStatusSkeleton></TargetStatusSkeleton>)
      }

    
      const visiblePerspectives = data.slice(currentIndex, currentIndex + cardsToShow);
    return (
        <>
            <div className="rounded-lg">
                <ShowFilters showDateFilters={showDateFilters} setShowDateFilters={setShowDateFilters}/>
                {showDateFilters && <Filters dateRange={dateRange} setDateRange={setDateRange}/>}
            </div>
                <div className="relative">
                {data.length > cardsToShow && (
                <button 
                    onClick={() => navigate('prev')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition -ml-4"
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft></ChevronLeft>
                </button>
                )}
            
                
                <Suspense fallback={<TargetStatusSkeleton></TargetStatusSkeleton>}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {visiblePerspectives.map((perspective) => (
                            <div key={perspective.name} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
                            <div className="p-6 flex flex-col">
                                <h3 className="text-lg text-center font-semibold text-gray-800 mb-2">
                                {perspective.name}
                                </h3>
                                <div className="space-y-4">
                                <CardStatusTarget 
                                    value={perspective.active} 
                                    total={perspective.active + perspective.completed + perspective.failed} 
                                    title="Activos"
                                    color="bg-[#67A7EB]"
                                />
                                <CardStatusTarget 
                                    value={perspective.completed} 
                                    total={perspective.active + perspective.completed + perspective.failed} 
                                    title="Completados"
                                    color="bg-[#94ADD1]"
                                />
                                <CardStatusTarget 
                                    value={perspective.failed} 
                                    total={perspective.active + perspective.completed + perspective.failed} 
                                    title="Fallados"
                                    color="bg-[#9DC2EB]"
                                />
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                </Suspense>
                
               
            {data.length > cardsToShow && (
                <button 
                onClick={() => navigate('next')}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition -mr-4"
                disabled={currentIndex >= data.length - cardsToShow}
                >
                <ChevronRight></ChevronRight>
                </button>
            )}
            </div>
        </>
        
    )
}