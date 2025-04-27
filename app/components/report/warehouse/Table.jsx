"use client";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";


const Table = ({ rows, initialColumns }) => {

  return (
    <>
    <div style={{ height: "600px", width: "100%" }}>
      <MaterialReactTable
        columns={columnsWithAggregation}
        data={data?.length ? data : []}
        localization={MRT_Localization_ES}
        
      />
      </div>
      
      
      </>
    
  );
};

export default Table;