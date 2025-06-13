"use client";
import { lazy, Suspense } from "react";
import { useReportView } from "../../context/useReportView";
import { useGrouping } from "../../hooks/reports/useGrouping";
import Progress from "../../utils/Progress";
import { SubtitlesIcon } from "lucide-react";
import { columnTranslations } from "../../hooks/reports/columnsMap";

const LazyTableData = lazy(() => import("../ChartData"));

export function ViewReport({ columns, title }) {
  console.time("chart");
  const { isChart } = useReportView();
  const { getGroupedColumnValues, getTotalColumns, getSumByGroup, getColumnName, getTranslateColumn } =
    useGrouping();

  if (!isChart) return <></>;

  const key = getTotalColumns(columns)[0];
  const columnTranslate = getTranslateColumn()
  const column = getColumnName(columnTranslate)
  const groupedColumnValues = getGroupedColumnValues();
  const chartData = getSumByGroup(key);
  const keyValue = columnTranslations[key]
  const subtitle = `${column} por ${keyValue}`
  const values = [
    {
      name: "valor",
      data: chartData,
    },
  ];

  console.timeEnd("chart");
  return (
    <>
      {isChart && (
        <>
          <Suspense fallback={<Progress></Progress>}>
            <LazyTableData
              series={values}
              categories={groupedColumnValues}
              title={title}
              subtitle={subtitle}
              ytitle={keyValue}
              xtitle={column}
            ></LazyTableData>
          </Suspense>
        </>
      )}
    </>
  );
}
