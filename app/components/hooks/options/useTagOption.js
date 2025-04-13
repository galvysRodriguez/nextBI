import { useQuery } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/tags`
// Función para obtener los datos de la API
const fetchTag = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export function useTagOption() {
    return useQuery({
      queryKey: ["tags"],
      queryFn: fetchTag,
      staleTime: 5 * 60 * 1000
    });
  }
  