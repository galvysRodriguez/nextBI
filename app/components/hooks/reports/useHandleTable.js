

import { useCallback } from "react";
import { useTableDataContext } from "../../context/TableContext";

export function useHandleTable(refetch) {
  const {
    groupedColumns,
    sorting,
    filters,
    setGroupedColumns,
    setSorting,
    setFilter,
    search,
    setSearch,
    selectedRows,
    pagination,
    setPagination,
    setSelectedRows,
  } = useTableDataContext();

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
