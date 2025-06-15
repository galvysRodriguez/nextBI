"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useGroupedColumns } from "../context/report/useGroupedColumns";
import { useRows } from "../context/report/useRows";
import { useSelectedRows } from "../context/report/useSelectedRows";
import { usePageCount } from "../context/report/usePageCount";
import { useTotalRows } from "../context/report/useTotalRows";
import { useFilters } from "../context/report/useFilters";
import { useSorting } from "../context/report/useSorting";
import { usePaginationTable } from "../context/report/usePagination";
import { useSearch } from "../context/report/useSearch";
import { useColumns } from "../context/report/useColumns";

export function ResetTableSatate() {
  const pathname = usePathname();

  const { setGroupedColumns } = useGroupedColumns();
  const { setSelectedRows } = useSelectedRows();
  const { setPageCount } = usePageCount();
  const { setTotalRows } = useTotalRows();
  const { setFilter } = useFilters();
  const { setSorting } = useSorting();
  const { setPagination } = usePaginationTable();
  const { setSearch } = useSearch();
  const { setColumnVisibility } = useColumns();

  useEffect(() => {
    setGroupedColumns([]);
    setSelectedRows([]);
    setPageCount(0);
    setTotalRows(0);
    setFilter([]);
    setSorting([]);
    setPagination({ pageIndex: 0, pageSize: 10 });
    setSearch("");
    setColumnVisibility({
      product_id: false,
      product_code: false,
      product_type: false,
      brand: false,
      category: false,
      unit: false,
      subcategory: false,
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
      day: false,
      month: false,
      year: false,
      is_weekend: false,
      presentation: false,
      modificator: false,
      supplier_type: false,
      city: false,
      state: false,
      customer_commercial: false,
      customer_address: false,
      seller_percentage: false,
      customer_type: false,
      discount_percentage: false,
      tax_rate: false,
      subtotal: false,
      subtotal_bs: false,
      discount: false,
      discount_bs: false,
      invoice_type: false,
      invoice_number: false,
      control_number: false,
      seller_name: false,
      customer_name: false,
      returned: false,
    });
  }, [pathname]);

  return null;
}
