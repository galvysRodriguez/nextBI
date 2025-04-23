"use client"
import { usePerspectiveIconOption } from "../layout/useDynamicPerspective"

export function Title({id, title}) {
    const {data, isLoading, error} = usePerspectiveIconOption()
    const perspectiva = data?.data.find(d => d.id == id)
    const value = perspectiva?.perspective
    return (
        <h1 className="text-3xl font-bold text-center text-[#253664] pt-4 mt-8 mb-6 animate-fadeIn">
            {title || `Perspectiva de ${value}`} 
        </h1>
    )
}