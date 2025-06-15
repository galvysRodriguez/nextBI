import { useCallback } from "react";
import { useTableDataContext } from "../../context/TableContext";
import { useRows } from "../../context/report/useRows";
import { useGroupedColumns } from "../../context/report/useGroupedColumns";
import { useSelectedRows } from "../../context/report/useSelectedRows";
import { columnTranslations } from "./columnsMap";


export function useGrouping(){
    const {rows} = useRows()
    const{groupedColumns} = useGroupedColumns()
    const {selectedRows} = useSelectedRows()

    const filteredGroupedRows = useCallback(() => {
        return rows.filter(row =>
          groupedColumns.some(group => group.id === row.id)
        )
      }, [rows, groupedColumns]);
      
    const selectedGroupedRows = useCallback(() => {
        return rows.filter(row =>
            selectedRows.some(selected => selected.id === row.id)
        )
      }, [rows, selectedRows]);

      const getTotalColumns = useCallback((columns) => {
        return columns
          .filter((col) => col?.total === true)
          .map((col) => col.accessorKey);
      }, []);
    

      const getGroupedColumnValues = useCallback(() => {
        if (!groupedColumns?.length || !rows?.length) return  rows.map((row) => row.id)
        
        const uniqueValues = new Set();
        
        rows?.forEach((row) => {
            const groupKey = groupedColumns.map(col => row[col]).join(' - ')
            uniqueValues.add(groupKey)
        });
        
        return Array.from(uniqueValues)
    }, [rows, groupedColumns]);

    const getTranslateColumn = useCallback(()=>{
      if (Array.isArray(groupedColumns)) {
        return groupedColumns.map(k => columnTranslations[k] || k);
      }
      return columnTranslations[groupedColumns] || groupedColumns;
    },
    [groupedColumns])

    const getColumnName = useCallback((groupedColumns)=>{
       if (!groupedColumns?.length) return  "ID"

       return groupedColumns.join(' - ')
    }, [])


    const getSumByGroup = useCallback((sumColumn) => {
      if (!groupedColumns?.length || !rows?.length || !sumColumn) return rows.map((row) => row[sumColumn]);
      
      const sumsMap = {};
      
      rows.forEach((row) => {
        const groupKey = groupedColumns.map(col => row[col]).join(' - ');
        const value = Number(row[sumColumn]) || 0;
        sumsMap[groupKey] = ((sumsMap[groupKey] || 0) + value).toFixed(2);
      });
      
      return Object.values(sumsMap)
  }, [rows, groupedColumns]);

  const getTotalColumnKey = useCallback((columns) => {
    const totalColumn = columns.find(column => column.total === true);
    return totalColumn ? totalColumn.accessorKey : null;
  }, []);

    const convertRowsToChartData = useCallback((accessorKey = 'quantity') => {
      return [
        {
          name: accessorKey,
          data: rows.map((row) => {
            const value = row[accessorKey];
            return typeof value === 'number' ? value : 0;
          }),
        },
      ];
    }, [rows]);
    
    

    return {
        filteredGroupedRows,
        selectedGroupedRows,
        getColumnName,
        getTranslateColumn,
        getGroupedColumnValues,
        convertRowsToChartData,
        getTotalColumns,
        getTotalColumnKey,
        getSumByGroup,
    }
}