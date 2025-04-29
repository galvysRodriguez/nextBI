

import { useCallback } from "react";
import { useGroupedColumns } from "../../context/report/useGroupedColumns";
import { useFilters } from "../../context/report/useFilters";
import { useSorting } from "../../context/report/useSorting";
import { useSearch } from "../../context/report/useSearch";
import { useSelectedRows } from "../../context/report/useSelectedRows";
import { usePaginationTable } from "../../context/report/usePagination";

export function useHandleTable(refetch) {
  const {pagination, setPagination} = usePaginationTable()
  const {groupedColumns, setGroupedColumns} = useGroupedColumns()
  const {filters, setFilter} = useFilters()
  const {sorting, setSorting} = useSorting()
  const {search, setSearch} = useSearch()
  const {selectedRows, setSelectedRows} = useSelectedRows()


  const handleGroupingChange = useCallback(
    (updater) => {
      const newGroupedColumns =
        typeof updater === "function" ? updater(groupedColumns) : updater;
      setGroupedColumns(newGroupedColumns);
    },
    [groupedColumns, setGroupedColumns]
  );

  const handleSortingChange = useCallback(
    (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);
      refetch()
    },
    [refetch, sorting, setSorting]
  );

  const handleFilterChange = useCallback(
    (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(filters) : updater;
      setFilter(newFilters);
      refetch()
    },
    [refetch, filters, setFilter]
  );


  const handlePaginationChange = useCallback(
    (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater(pagination)
          : updater;
        setPagination(newPagination);
        refetch()
      
    },
    [refetch, pagination, setPagination]
  );

  const handleGlobalFilterChange = useCallback(
    (updater) => {
      const newGlobalFilter =
        typeof updater === "function"
          ? updater(search)
          : updater;
        setSearch(newGlobalFilter);
        refetch()
      
    },
    [refetch, search, setSearch]
  );

  const handleSelectRowsChange = useCallback(
    (updater) => {
      const newSelectedRows =
        typeof updater === "function"
          ? updater(selectedRows)
          : updater;
        setSelectedRows(newSelectedRows);
    },
    [setSelectedRows, selectedRows]
  );

  return {
    handleGroupingChange,
    handleSortingChange,
    handleFilterChange,
    handlePaginationChange,
    handleSelectRowsChange,
    handleGlobalFilterChange,
  };
}
