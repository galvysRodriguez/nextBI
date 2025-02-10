import { useQuery } from "@tanstack/react-query";

const fetchTargets = async ({ queryKey }) => {
  const [, content] = queryKey; // Extraer `content` de `queryKey`
  
  if (!content) {
    throw new Error("No content provided for API request"); // Validación para evitar el error
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL || ""}${content}`; // Usar `content` en la URL dinámica
  console.log("Fetching URL:", url); // Debugging

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Error fetching targets");

  return response.json();
};

export function useTargets(content) {
  return useQuery({
    queryKey: ["targets", content], 
    queryFn: fetchTargets,
    enabled: !!content,
  });
}
