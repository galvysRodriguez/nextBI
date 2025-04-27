import { useMemo } from "react";
import { useTableDataContext } from "app/app/components/context/TableContext";

export function useWarehouseParams() {
  const {
    filters,
    sorting,
    pagination,
    search,
  } = useTableDataContext();

  const params = useMemo(() => {
    const findFilterValue = (id) => {
      const filter = filters?.find((f) => f.id === id);
      return filter?.value ?? null;
    };

    const findRangeFilterValue = (id) => {
        const filter = filters?.find((f) => f.id === id);
        if (Array.isArray(filter?.value)) {
          return {
            min: filter.value[0] ?? null,
            max: filter.value[1] ?? null,
          };
        }
        return { min: null, max: null };
      };

    const orderBy = sorting?.[0]?.id || 'id';
    const orderDir = sorting?.[0]?.desc ? 'desc' : 'asc';
    const pageIndex = pagination?.pageIndex ?? 0;
    const pageSize = pagination?.pageSize ?? 10;
    const offset = pageIndex * pageSize;

    const quantityRange = findRangeFilterValue('quantity');
    const dateRange = findRangeFilterValue('date');

    return {
      warehouse: findFilterValue('warehouse'),
      type: findFilterValue('type'),
      product: findFilterValue('product'),
      date_min: dateRange.min,
      date_max: dateRange.max,
      quantity_min: quantityRange.min,
      quantity_max: quantityRange.max,
      order_by: orderBy,
      order_dir: orderDir,
      limit: pagination?.pageSize,
      offset: offset,
      search: search,
    };
  }, [filters, sorting, pagination, search]);

  return params;
}
