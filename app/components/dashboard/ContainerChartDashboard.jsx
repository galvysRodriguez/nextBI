"use client"
import { Suspense, useEffect, useState } from "react";
import { ShowFilters } from "./ShowFilters";
import { Filters } from "./Filters";
import HomeChart from 'app/app/components/chart/echart/HomeChart';
import { useDashboardMetricQuery } from "../hooks/dashboard/useMetric";
import { ChartDashboardSkeleton } from "app/app/dashboard/home/page";
import { normalizeDate } from "../utils/convertDate";


export default function ContainerChartDashboard(){
    const [graphFilters, setGraphFilters] = useState({
        start: '2024-06-01',
        end: '2024-06-30'
    });

    const [showGraphFilters, setShowGraphFilters] = useState(false);

    const { refetch, isFetching, isError } = useDashboardMetricQuery({
        date_from: normalizeDate(graphFilters.start),
        date_to: normalizeDate(graphFilters.end),
    });

    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data: apiData } = await refetch();
            console.log(apiData.data)
            setData(apiData.data)
        };

        if (graphFilters.start && graphFilters.end) {
            fetchData();
        }

        console.log("data", data)
        console.log(data?.value_inventory)

    }, [graphFilters.start, graphFilters.end]);

    if(isFetching || !data){
        return(
            <ChartDashboardSkeleton></ChartDashboardSkeleton>
        )
    }

    return (
        <div className="rounded-lg p-6">
            <ShowFilters showDateFilters={showGraphFilters} setShowDateFilters={setShowGraphFilters}/>
            {showGraphFilters && <Filters dateRange={graphFilters} setDateRange={setGraphFilters}/>}
            <Suspense fallback={<ChartDashboardSkeleton></ChartDashboardSkeleton>}>
                <HomeChart
                    inventory={data?.value_inventory?.map((p) => p.value) || []}
                    sales={data?.value_sale?.map((p) => p.value) || []}
                    purchases={data?.value_purchase?.map((p) => p.value) || []}
                    labels={data?.value_purchase?.map((p) => p.date) || []}
                ></HomeChart>
            </Suspense>
        </div>
    )
}