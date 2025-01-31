"use client"
import { Grip } from "lucide-react";
import { Rows3 } from "lucide-react";
import { useIsGrid } from "../context/IsGrid";
import { SearchTarget } from "./SearchTarget";


export function HeaderTarget(){
    return(
        <>
            <div className="h-30 flex justify-center items-center gap-4 p-6">
                <SearchTarget></SearchTarget>
                <button className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Crear
                </button>
                <GridAndRow></GridAndRow>
            </div>
        </>
    )
}

export function GridAndRow(){
    const { grid, changeGrid } = useIsGrid()

    if (grid) {
        return (
          <Rows3
            onClick={() => changeGrid()}
            className="text-[#303a56] hover:text-[#1c324d] cursor-pointer" // Color azul
          />
        )
      }
    
      return (
        <Grip
          onClick={() => changeGrid()}
          className="text-[#303a56] hover:text-[#1c324d] cursor-pointer" // Color verde
        />
      )
}

