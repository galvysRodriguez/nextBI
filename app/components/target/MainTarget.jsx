"use client"
import { useIsGrid, useSearchTarget } from "../context/IsGrid"
import { useSearch } from "../hooks/useSearch"
import { mockObjectives } from "../mocks/MocksTarget"
import { CardTarget } from "./CardTarget"

export function MainTarget(){
    const { grid } = useIsGrid()
    const filteredData = useSearch(mockObjectives)

    if(grid){
        return (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6 w-full max-w-[1200px] px-4 md:px-6 lg:px-8animate-fadeInGrid">
                {filteredData.map((objective) => {
                        return (
                            <CardTarget
                                key={objective.id}
                                {...objective}
                            />
                        )
                
                })}
            </div>
        )
    }

    return (
        <h1>Row</h1>
    )
}