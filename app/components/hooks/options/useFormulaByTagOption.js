import { useQuery } from "@tanstack/react-query";

// Función para obtener los datos de la API
const fetchFormulaByTag = async (tagId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/formula/tag/${tagId}`);
  if (!response.ok) {
    throw new Error('Error fetching data');
  }
  return response.json();
};

export function useFormulaByTagOption(tagId) {
    const isValidTag = !!(tagId && !isNaN(tagId));

  return useQuery({
    queryKey: ["formula_by_tag", tagId],
    queryFn: () => fetchFormulaByTag(tagId),
    enabled: isValidTag, 
  });
}
