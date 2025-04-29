"use client"
import { ButtonBase } from "./ButtonBase";
import { ArrowDownToLine, ArrowUpToLine, Download } from "lucide-react";
import { useReportLayout } from "../../context/reportLayout";
import { MenuExport } from "./MenuExport";
import { shallow } from "zustand/shallow";
import { useReportMenu } from "../../context/useReportMenu";


export function ArrowExport({initialColumns}){
    const { setIsMenuOpen, isMenuOpen } = useReportMenu()
    return (
        <>
            <ButtonBase onClick={setIsMenuOpen}>
                {isMenuOpen ? 
                    <ArrowUpToLine className="w-6 h-6" /> : 
                    <Download className="w-6 h-6" />}
            </ButtonBase>
            {isMenuOpen && ( <MenuExport initialColumns={initialColumns}></MenuExport>)}
        </>
    )
}