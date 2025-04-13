import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const BASE_URL = `${API_BASE}/formula/exist/`;

const verifyFormulaExistence = async ({ title, id = null }) => {
  const url = new URL(BASE_URL);
  url.searchParams.append('title', title);
  if (id) url.searchParams.append('formula_id', id.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error al verificar el título${id ? ' (update)' : ''}`);
  }

  return response.json();
};


export const useExistFormulaQuery = ({ title, id }) => {
  return useQuery({
    queryKey: ["checkTitleUpdate", title, id],
    queryFn: () => verifyFormulaExistence({ title, id }),
    enabled: false,
    retry: false, 
    staleTime: 0, 
    cacheTime: 0,
  });
};