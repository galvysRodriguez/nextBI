import { useQuery } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives/icons/`
// Función para obtener los datos de la API
const fetchPerspectiveIcon = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export function usePerspectiveIconOption() {
    return useQuery({
      queryKey: ["perspectives-icon"],
      queryFn: fetchPerspectiveIcon,
      staleTime: 1200 * 60 * 1000
    });
  }
  