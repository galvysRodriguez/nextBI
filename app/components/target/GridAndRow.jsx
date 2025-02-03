"use client"
import { Grip } from "lucide-react"
import { Rows3 } from "lucide-react"
import { useIsGrid } from "../context/IsGrid"

export function GridAndRow(){
    const { grid, changeGrid } = useIsGrid()

    if (grid) {
        return (
          <Rows3
            onClick={() => changeGrid()}
            className="text-[#303a56] hover:text-[#1c324d] cursor-pointer" 
          />
        )
      }
    
      return (
        <Grip
          onClick={() => changeGrid()}
          className="text-[#303a56] hover:text-[#1c324d] cursor-pointer"
        />
      )
}