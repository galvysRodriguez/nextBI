"use client"
import { useAggregations, useFormula } from "../../api/target/fetchSelect";


export const OptionFormula = () =>{
    const { data: formula, isLoading, error } = useFormula();
    return(
        <>
            <option value="">Seleccionar formula</option>
                {isLoading && <option>Cargando...</option>}
                {error && <option>Error al cargar</option>}
                {formula?.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                ))}
        </>
    )
}