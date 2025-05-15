"use client";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { mocksDataAgrouped } from "../mocks/mocksDataAgrouped";
import { useHandleTable } from "../hooks/reports/useHandleTable";
import { useTableDataContext } from "../context/TableContext";
import { useGroupedColumns } from "../context/report/useGroupedColumns";
import { useRows } from "../context/report/useRows";
import { useSelectedRows } from "../context/report/useSelectedRows";
import { usePageCount } from "../context/report/usePageCount";
import { useTotalRows } from "../context/report/useTotalRows";
import { useSearch } from "../context/report/useSearch";
import { usePaginationTable } from "../context/report/usePagination";
import { useSorting } from "../context/report/useSorting";
import { useFilters } from "../context/report/useFilters";
import React, { useMemo, lazy, Suspense, useEffect, memo } from "react";
import Progress from "../utils/Progress";

const LazyTable = lazy(() => import("./LazyTable"));


 const TableData = React.memo(function  SubTableData ({initialColumns, isLoading, refetch}) {
  console.time("render")
  console.time('TableData mounted');
    const {
        handleGroupingChange,
        handleSortingChange,
        handleFilterChange,
        handlePaginationChange,
        handleSelectRowsChange,
        handleGlobalFilterChange,
    } = useHandleTable(refetch)

    

    useEffect(() => {
      console.timeEnd('TableData mounted');
    }, []);

 
    const {groupedColumns} = useGroupedColumns()
    const {rows} = useRows()
    const {selectedRows} = useSelectedRows()
    const {pageCount} = usePageCount()
    const {totalRows} = useTotalRows()
    const {filters} = useFilters()
    const {sorting} = useSorting()
    const {pagination} = usePaginationTable()
    const {search} = useSearch()


    const memoizedGroupedColumns = useMemo(() => groupedColumns, [groupedColumns]);
    const memoizedRows = useMemo(() => rows, [rows]);
    const memoizedPageCount = useMemo(() => pageCount, [pageCount]);
    const memoizedTotalRows = useMemo(() => totalRows, [totalRows]);
    const memoizedFilters = useMemo(() => filters, [filters]);
    const memoizedSorting = useMemo(() => sorting, [sorting]);
    const memoizedPagination = useMemo(() => pagination, [pagination]);
    const memoizedSearch = useMemo(() => search, [search]);


    const MemoizedTableRow = memo(({ row }) => (
      <MuiTableRowRoot>
        {row.getVisibleCells().map((cell) => (
          <MemoizedTableCell key={cell.id} cell={cell} />
        ))}
      </MuiTableRowRoot>
    ));
    
    const MemoizedTableCell = memo(({ cell }) => (
      <MuiTableCellRoot>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </MuiTableCellRoot>
    ));

    console.log({rows})
    console.timeEnd("render")
    return (
        <>
        <div className="h-max[2000px] h-min[400px] w-[80%] mx-auto my-0 pb-24">
          <Suspense fallback={<Progress></Progress>}>
            <LazyTable
              //columnnas, filas e idioma
              columns={initialColumns}
              //data={mocksDataAgrouped}
              data={memoizedRows}
              localization={MRT_Localization_ES}

              //opciones permitidas y manuales
              enableGrouping
              enableColumnResizing
              //enableRowSelection
              enableColumnOrdering
              enableColumnPinning
              manualFiltering
              manualSorting
              manualPagination
              manualGrouping={false}

              components={{
                TableRow: MemoizedTableRow,
                TableCell: MemoizedTableCell,
              }}

              //metodos
              onGroupingChange={handleGroupingChange}
              onSortingChange={handleSortingChange}
              onColumnFiltersChange={handleFilterChange}
              onPaginationChange={handlePaginationChange}
              //onRowSelectionChange={handleSelectRowsChange}
              onGlobalFilterChange={handleGlobalFilterChange}

              rowCount={memoizedTotalRows}
              pageCount={memoizedPageCount}

              initialState={{
                columnVisibility: {
                  product_id: false,
                  product_code: false,
                  product_type:false,
                  brand:false,
                  category:false,
                  unit:false,
                  subcategory:false,
                  product_details: false,
                  product_presentations: false,
                  weekday_number: false,
                  weekday_name: false,
                  week_of_year: false,
                  week_of_month: false,
                  fortnight: false,
                  month_name: false,
                  quarter: false,
                  semester: false,
                  day:false,
                  month:false,
                  year:false,
                  is_weekend: false,
                }
              }}
              //estados
              state={{ 
                  isLoading: isLoading,
                  grouping: memoizedGroupedColumns,
                  sorting: memoizedSorting,
                  pagination: memoizedPagination,
                  columnFilters: memoizedFilters,
                  globalFilter: memoizedSearch,

                  //rowSelection: selectedRows,
              }}

              //progreso de la barra spinner
              muiCircularProgressProps={{
                  color: 'primary',
                  thickness: 5,
                  size: 55,
                }}

              //esqueleto de la tabla
              muiSkeletonProps={{
                  animation: 'pulse',
                  height: 28,
                }}

                //memoMode="rows"

              />
          </Suspense>

          </div>
          
          
          </>
    )
   
});

export default TableData;