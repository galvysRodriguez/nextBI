"use client"
import { GridAndRow } from "./GridAndRow"
import { SearchTarget } from "./SearchTarget"
import { ButtonCreate } from "./ButtonCreate"
import { ButtonDelete } from "./ButtonDelete"
import { ButtonEdit } from "./ButtonEdit"
import { usePermissionButton } from "../hooks/usePermissionButton"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { useCardStore } from "../context/IsGrid"

export function HeaderTarget({search=false}){
    const pathname = usePathname();
    const { getSelected, isNullSelected} = useCardStore()
    const {hasPermissions} = usePermissionButton()
    const fullPathDelete = useMemo(() => {
      const cleanPath = pathname.replace(/\/delete$/, "");
        if (cleanPath.startsWith("/dashboard/target/perspective/")) {
          return `/dashboard/target/${getSelected()}`
        }
        return `${cleanPath}/${getSelected()}`;
      }, [pathname, getSelected]);

    const basePathCreate = useMemo(() => pathname.replace(/\/create$/, ''), [pathname]);
    const fullPathCreate = `${basePathCreate}/create`;

    const basePathUpdate = useMemo(() => pathname.replace(/\/update$/, ''), [pathname]);
    const fullPathUpdate = `${basePathUpdate}/update/${getSelected()}`
    return( 
        <>
            <div className="w-[70%] m-auto h-30 flex justify-end items-end gap-4 py-6">
                {search && <SearchTarget ></SearchTarget>}
                {hasPermissions(fullPathCreate) && <ButtonCreate></ButtonCreate>}
                {hasPermissions(fullPathUpdate) && <ButtonEdit></ButtonEdit>}
                {hasPermissions(fullPathDelete) && <ButtonDelete></ButtonDelete>}
            </div>
        </>
    )
}
