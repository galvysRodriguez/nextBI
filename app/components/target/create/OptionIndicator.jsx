"use client"
import { useAggregations, useIndicators } from "../../api/target/fetchSelect";


export const OptionIndicator = () =>{
    const { data: indicators, isLoading, error } = useIndicators();
    console.log(indicators)
    return(
        <>
            <option value="">Seleccionar Indicador</option>
                {isLoading && <option>Cargando...</option>}
                {error && <option>Error al cargar</option>}
                {indicators?.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                ))}
        </>
    )
}