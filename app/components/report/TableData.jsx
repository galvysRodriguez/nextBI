"use client";
import { MaterialReactTable } from "material-react-table";
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
import { useMemo } from "react";


export default function  TableData ({initialColumns, isLoading, refetch}) {
    const {
        handleGroupingChange,
        handleSortingChange,
        handleFilterChange,
        handlePaginationChange,
        handleSelectRowsChange,
        handleGlobalFilterChange,
    } = useHandleTable(refetch)


 
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

    console.log({rows})

    return (
        <>
        <div style={{ maxHeight: "800px", width: "80%", minHeight: "400px", margin: "0 auto", paddingBottom:'6rem'}}>
          <MaterialReactTable

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

            //metodos
            onGroupingChange={handleGroupingChange}
            onSortingChange={handleSortingChange}
            onColumnFiltersChange={handleFilterChange}
            onPaginationChange={handlePaginationChange}
            //onRowSelectionChange={handleSelectRowsChange}
            onGlobalFilterChange={handleGlobalFilterChange}
            
            rowCount={memoizedTotalRows}
            pageCount={memoizedPageCount}

            //estados
            initialState={{
                grouping: ['warehouse', 'type'], 
                expanded: true, 
              }}

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

              memoMode="rows"
            
          />
          </div>
          
          
          </>
    )
   
};
