"use client";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";
import { TableData } from "app/app/components/report/TableData";
import { TitleBase } from "../../container/Title";
import { HeaderReport } from "./HeaderReport";

export function TableContainer({title, children}) {
  return (
    <>
      <div className="pb-18">
        <TitleBase title={title}></TitleBase>
        <HeaderReport></HeaderReport>
        {children}
      </div>
    </>
  );
}