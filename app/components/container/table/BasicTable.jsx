"use client"
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { useCardStore } from "../../context/IsGrid";
import { useState } from "react";

const BasicTable = ({ rows, initialColumns }) => {
    const { rowSelection, setRowSelection} = useCardStore();

  // Obtener el ID de la fila seleccionada
  const selectedRowId = Object.keys(rowSelection)[0] || null;
  return (
    <>
    <div style={{ maxHeight: "600px", width: "70%" }}>
      <MaterialReactTable
        columns={initialColumns}
        data={rows.length ? rows : []}
        enableMultiRowSelection={false}
        enableRowSelection
        enableSorting
        enableColumnOrdering
        getRowId={(row) => String(row.id)} 
        localization={MRT_Localization_ES}
        muiTableContainerProps={{
          sx: { maxHeight: "500px" }, 
        }}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
      </div>
      </>
    
  );
};

export default BasicTable;
