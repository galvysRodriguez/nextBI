import { useQuery } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives`
// Función para obtener los datos de la API
const fetchPerspective = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export function usePerspectiveOption() {
    return useQuery({
      queryKey: ["perspectives"],
      queryFn: fetchPerspective,
    });
  }
  