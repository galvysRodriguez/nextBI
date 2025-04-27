import { useTableDataContext } from "../../context/TableContext";
import { useCallback } from "react";


export function useContextFetch(){
    const {setIsLoading, setRefetch} = useTableDataContext()

    const handleRefetch = useCallback((refetch, isLoading) => {
        setIsLoading(isLoading);
        setRefetch(refetch);
    }, [setIsLoading, setRefetch]);

    return {
        handleRefetch,
    };
}