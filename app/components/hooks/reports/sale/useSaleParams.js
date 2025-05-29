import { useMemo } from "react";
import { useFilters } from "app/app/components/context/report/useFilters";
import { useSorting } from "app/app/components/context/report/useSorting";
import { usePaginationTable } from "app/app/components/context/report/usePagination";
import { useSearch } from "app/app/components/context/report/useSearch";

export function useSaleParams() {
  const { filters } = useFilters();
  const { sorting } = useSorting();
  const { pagination } = usePaginationTable();
  const { search } = useSearch();

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
    const priceRange = findRangeFilterValue('price');
    const priceBSRange = findRangeFilterValue('price_bs');
    const subtotalRange = findRangeFilterValue('subtotal');
    const subtotalBSRange = findRangeFilterValue('subtotal_bs');
    const totalRange = findRangeFilterValue('total');
    const totalBSRange = findRangeFilterValue('total_bs');
    const discountRange = findRangeFilterValue('discount');
    const discountBSRange = findRangeFilterValue('discount_bs');
    const discountPercentageRange = findRangeFilterValue('discount_percentage');
  

    return {
      warehouse: findFilterValue('warehouse'),
      control_number: findFilterValue('control_number'),
      invoice_number: findFilterValue('invoice_number'),
      invoice_type: findFilterValue('invoice_type'),
      returned: findFilterValue('returned'),

      price: findFilterValue('price'),
      tax_rate: findFilterValue('tax_rate'),
      seller_name: findFilterValue('seller_name'),
      seller_percentage: findFilterValue('seller_percentage'),
      city: findFilterValue('city'),
      state: findFilterValue('state'),

      customer_name: findFilterValue('customer_name'),
      customer_type: findFilterValue('customer_type'),
      customer_commercial: findFilterValue('customer_commercial'),
      customer_address: findFilterValue('customer_address'),

      product_name: findFilterValue('product_name'),
      product_code: findFilterValue('product_code'),
      category: findFilterValue('category'),
      subcategory: findFilterValue('subcategory'),
      product_type: findFilterValue('product_type'),
      unit: findFilterValue('unit'),
      brand: findFilterValue('brand'),
      product_presentations: findFilterValue('product_presentations'),

      weekday_name: findFilterValue('weekday_name'),
      week_of_year: findFilterValue('week_of_year'),
      week_of_month: findFilterValue('week_of_month'),
      fortnight: findFilterValue('fortnight'),
      month: findFilterValue('month'),
      month_name: findFilterValue('month_name'),
      quarter: findFilterValue('quarter'),
      semester: findFilterValue('semester'),
      year: findFilterValue('year'),
      is_weekend: findFilterValue('is_weekend'),

      date_min: dateRange.min,
      date_max: dateRange.max,
      quantity_min: quantityRange.min,
      quantity_max: quantityRange.max,
      price_min: priceRange.min,
      price_max: priceRange.max,
      price_bs_min: priceBSRange.min,
      price_bs_max: priceBSRange.max,
      subtotal_min: subtotalRange.min,
      subtotal_max: subtotalRange.max,
      subtotal_bs_min: subtotalBSRange.min,
      subtotal_bs_max: subtotalBSRange.max,
      total_min: totalRange.min,
      total_max: totalRange.max,
      total_bs_min: totalBSRange.min,
      total_bs_max: totalBSRange.max,
      discount_min: discountRange.min,
      discount_max: discountRange.max,
      discount_bs_min: discountBSRange.min,
      discount_bs_max: discountBSRange.max,
      discount_percentage_min: discountPercentageRange.min,
      discount_percentage_max: discountPercentageRange.max,

      order_by: orderBy,
      order_dir: orderDir,
      limit: pageSize,
      offset: offset,
      search: search,
    };
  }, [filters, sorting, pagination, search]);

  return params;
}

