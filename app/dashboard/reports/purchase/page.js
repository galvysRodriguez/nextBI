
"use client"
import { useTableContext } from "app/app/components/context/TableContext";
import { MocksDataShopping } from "app/app/components/mocks/MocksDataShopping";
import TableContainer from "app/app/components/report/container/TableShoppingContainer";
import TableWithThemeProvider from "app/app/components/report/LocaleTable";

import { initialColumnsShopping } from "app/app/components/utils/columns";

export default function Home(){
    
  
    return(
        <>
            <TableContainer></TableContainer>
        </>
    )
}