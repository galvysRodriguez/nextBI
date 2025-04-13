import { useQuery } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/icons`
// Función para obtener los datos de la API
const fetchIcon = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export function useIconOption() {
    return useQuery({
      queryKey: ["icons"],
      queryFn: fetchIcon,
      staleTime: 5 * 60 * 1000
    });
  }
  