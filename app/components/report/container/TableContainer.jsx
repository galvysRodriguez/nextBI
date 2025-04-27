"use client";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";
import { TableData } from "app/app/components/report/TableData";
import { TitleBase } from "../../container/Title";

export function TableContainer({columns, title, isLoading, refetch}) {
  return (
    <>
      <div className="pb-18">
        <TitleBase title={title}></TitleBase>
        <TableWithThemeProvider>
          <TableData initialColumns={columns} isLoading={isLoading} refetch={refetch}/>
        </TableWithThemeProvider>
      </div>
    </>
  );
}