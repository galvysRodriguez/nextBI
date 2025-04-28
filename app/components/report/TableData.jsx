"use client";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { mocksDataAgrouped } from "../mocks/mocksDataAgrouped";
import { useHandleTable } from "../hooks/reports/useHandleTable";
import { useTableDataContext } from "../context/TableContext";


export function TableData ({initialColumns, isLoading, refetch}) {
    const {
        handleGroupingChange,
        handleSortingChange,
        handleFilterChange,
        handlePaginationChange,
        handleSelectRowsChange,
        handleGlobalFilterChange,
    } = useHandleTable(refetch)


    const {
        groupedColumns,
        sorting,
        filters,
        pagination,
        rows,
        search,
        selectedRows,
        pageCount,
        totalRows,
    } = useTableDataContext()

    console.log({rows})

    return (
        <>
        <div style={{ maxHeight: "800px", width: "80%", minHeight: "400px", margin: "0 auto", paddingBottom:'6rem'}}>
          <MaterialReactTable

            //columnnas, filas e idioma
            columns={initialColumns}
            //data={mocksDataAgrouped}
            data={rows}
            localization={MRT_Localization_ES}

            //opciones permitidas y manuales
            enableGrouping
            enableColumnResizing
            enableRowSelection
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
            onRowSelectionChange={handleSelectRowsChange}
            onGlobalFilterChange={handleGlobalFilterChange}
            
            rowCount={totalRows}
            pageCount={pageCount}

            //estados
            initialState={{
                grouping: ['warehouse', 'type'], 
                expanded: true, 
              }}

            state={{ 
                isLoading: isLoading,
                grouping: groupedColumns,
                sorting: sorting,
                pagination: pagination,
                columnFilters: filters,
                globalFilter: search,
                rowSelection: selectedRows,
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
