"use client"
import { Suspense, useEffect, useState } from "react";
import TrafficChart from "../../chart/echart/TrafficChart";
import { ChartDashboardSkeleton } from "app/app/dashboard/home/page";
import { normalizeDate } from "../../utils/convertDate";
import { useDetailTargetChartQuery } from "../../hooks/dashboard/useDetailChartTarget";
import { ShowFilters } from "../../dashboard/ShowFilters";
import { Filters } from "../../dashboard/Filters";


export function ChartDetailTarget({title, optimal, tolerable, deficient, id}) {
    const [graphFilters, setGraphFilters] = useState({
            start: '2024-06-01',
            end: '2024-06-10'
        });
    
        const [showGraphFilters, setShowGraphFilters] = useState(false);
    
        const { refetch, isFetching, isError } = useDetailTargetChartQuery({
            id, 
            date_from: normalizeDate(graphFilters.start),
            date_to: normalizeDate(graphFilters.end),
        });
    
        const [data, setData] = useState()
    
        useEffect(() => {
            const fetchData = async () => {
                const { data: apiData } = await refetch();
                setData(apiData.data)
            };
    
            if (graphFilters.start && graphFilters.end) {
                fetchData();
            }
    
        }, [graphFilters.start, graphFilters.end]);
    
        if(isFetching || !data){
            return(
                <ChartDashboardSkeleton></ChartDashboardSkeleton>
            )
        }
  return (
    <div className="w-[80%] m-auto flex items-center">
        <div className="w-full h-full p-12">
            <ShowFilters showDateFilters={showGraphFilters} setShowDateFilters={setShowGraphFilters}/>
            {showGraphFilters && <Filters dateRange={graphFilters} setDateRange={setGraphFilters}/>}
        <Suspense
            fallback={<ChartDashboardSkeleton></ChartDashboardSkeleton>}
        >
            <TrafficChart
            current={data.results.map((item) => item.value)}
                label={data.results.map((item) => item.date)}
            optimal={optimal}
            tolerable={tolerable}
            deficient={deficient}
            title={title}
            />
        </Suspense>
        </div>
    </div>
  );
}
