import { useSearchTarget } from "../context/IsGrid"


export function SearchTarget(){
    const {changeSearch} = useSearchTarget()
    return(
        <>
            <input
                type="text"
                placeholder="Buscar"
                className="w-64  p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => changeSearch(e.target.value)}
            />
        </>
    )
}