import { useQuery } from "@tanstack/react-query";

const urlAggregation = `${process.env.NEXT_PUBLIC_API_URL || ""}/aggregations`;
const urlIndicator = `${process.env.NEXT_PUBLIC_API_URL || ""}/indicators`;
const urlFormula = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula`;

export const fetchAggregations = async () => {
  const response = await fetch(urlAggregation); // Reemplaza con tu URL
  if (!response.ok) {
    throw new Error("Error al cargar los datos");
  }
  const result = await response.json();

  return Object.entries(result.data).map(([id, name]) => ({
    id,
    name,
  }));
};

export function useAggregations() {
  return useQuery({
    queryKey: ["aggregations"],
    queryFn: fetchAggregations,
  });
}


export const fetchIndicators = async () => {
    const response = await fetch(urlIndicator); // Reemplaza con tu URL
    if (!response.ok) {
      throw new Error("Error al cargar los datos");
    }
    const result = await response.json();

    return Object.entries(result.data).map(([id, name]) => ({
        id,
        name,
    }));
  };

  export function useIndicators() {
    return useQuery({
      queryKey: ["indicators"],
      queryFn: fetchIndicators,
    });
  }
  

  export const fetchFormula = async () => {
    const response = await fetch(urlFormula); // Reemplaza con tu URL
    if (!response.ok) {
      throw new Error("Error al cargar los datos");
    }
    const result = await response.json();

    return Object.entries(result.data).map(([id, name]) => ({
        id,
        name,
    }));
  };

  export function useFormula() {
    return useQuery({
      queryKey: ["formula"],
      queryFn: fetchFormula,
    });
  }
  