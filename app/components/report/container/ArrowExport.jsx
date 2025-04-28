"use client"
import { useState } from "react";
import { ButtonBase } from "./ButtonBase";
import { ArrowDownToLine, ArrowUpToLine, Download } from "lucide-react";
import { useReportLayout } from "../../context/reportLayout";
import { MenuExport } from "./MenuExport";


export function ArrowExport(){
    const { isMenuOpen, setIsMenuOpen} = useReportLayout()

    return (
        <>
            <ButtonBase onClick={setIsMenuOpen}>
                {isMenuOpen ? 
                    <ArrowUpToLine className="w-6 h-6" /> : 
                    <Download className="w-6 h-6" />}
            </ButtonBase>
            {isMenuOpen && ( <MenuExport></MenuExport>)}
        </>
    )
}