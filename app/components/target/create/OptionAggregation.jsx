import { useAggregations } from "../../api/target/fetchSelect";


export const OptionAggregation = () =>{
    const { data: aggregations, isLoading, error } = useAggregations();
    return(
        <>
            <option value="">Seleccionar Agregación</option>
                {isLoading && <option>Cargando...</option>}
                {error && <option>Error al cargar</option>}
                {aggregations?.map((agg) => (
                  <option key={agg.id} value={agg.id}>
                    {agg.name}
                  </option>
                ))}
        </>
    )
}