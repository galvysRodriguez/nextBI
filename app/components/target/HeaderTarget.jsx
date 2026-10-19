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
    const isEdit = hasPermissions(fullPathUpdate) && !search
    const isDelete = hasPermissions(fullPathDelete) && !search
    return( 
        <>
            <div className={`${!search ? "w-[70%] m-auto h-30 flex justify-end items-end gap-4 py-6": "w-full max-w-[1200px] h-30 px-4 md:px-6 lg:px-8 flex justify-end gap-4 p-6"}`}>
                {search && <SearchTarget ></SearchTarget>}
                {hasPermissions(fullPathCreate) && <ButtonCreate></ButtonCreate>}
                {isEdit && <ButtonEdit></ButtonEdit>}
                {isDelete && <ButtonDelete></ButtonDelete>}
            </div>
        </>
    )
}
