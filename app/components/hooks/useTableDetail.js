import { useCallback } from 'react';

const useTableUtils = ({ filters, groupedColumns }) => {
  const getFilteredRows = useCallback((rows) => {
    if (!filters || filters.length === 0) {
        return rows;
      }

    return rows.filter((row) =>
      filters.every((f) => {
        const { id, value } = f;
        switch (id) {
          case 'id':
          case 'client':
          case 'product':
          case 'category':
          case 'subCategory':
          case 'deposit':
            return (
              !value ||
              value === '' ||
              (row[id] && row[id].toString().toLowerCase().includes(value.toLowerCase()))
            );

          case 'quantity':
          case 'price':
          case 'amount':
            return (
              (!f.value?.[0] || row[id] >= f.value[0]) &&
              (!f.value?.[1] || row[id] <= f.value[1])
            );

          case 'date':
            return (
              (!f.value?.[0] || new Date(row.date) >= new Date(f.value[0])) &&
              (!f.value?.[1] || new Date(row.date) <= new Date(f.value[1]))
            );

          default:
            return true;
        }
      })
    );
  }, [filters]);

  const groupRows = useCallback((rows) => {
    if (!groupedColumns?.length) return rows;

    return rows.reduce((acc, row) => {
      const key = groupedColumns?.map((col) => row[col]).join(' - ');
      if (!acc[key]) {
        acc[key] = { ...row, groupedBy: key, count: 1 };
      } else {
        acc[key].count += 1;
        acc[key].amount += row.amount;
      }
      return acc;
    }, {});
  }, [groupedColumns]);

  const groupColumns = useCallback((columns) => {
    return columns.map((col) => ({
      ...col,
      isGrouped: groupedColumns?.includes(col.accessorKey),
    }));
  }, [groupedColumns]);

  const getGroupedColumnValues = useCallback((rows) => {
    if (!groupedColumns?.length) return rows.map((row) => row.invoice);
    return rows.map((row) => groupedColumns?.map((col) => row[col]).join(' - '));
  }, [groupedColumns]);

  const groupRowsWithAmount = useCallback((rows) => {
    if (!groupedColumns?.length) {
      return rows.map((row) => ({
        ...row,
        totalAmount: row.amount,
      }));
    }
    return rows.reduce((acc, row) => {
      const groupKey = groupedColumns?.map((col) => row[col]).join(' - ');
      if (!acc[groupKey]) {
        acc[groupKey] = {
          ...row,
          groupedBy: groupKey,
          count: row.quantity,
          totalAmount: row.amount,
        };
      } else {
        acc[groupKey].count += row.quantity;
        acc[groupKey].totalAmount += row.amount;
      }
      return acc;
    }, {});
  }, [groupedColumns]);

  return {
    getFilteredRows,
    groupRows,
    groupColumns,
    getGroupedColumnValues,
    groupRowsWithAmount,
  };
};

export default useTableUtils;
