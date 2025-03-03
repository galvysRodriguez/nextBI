import { useQuery } from "@tanstack/react-query";

const fetchTargetId = async (id) => {
  if (!id) return null; 
  const response = await fetch(`http://localhost:8000/targets/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
};

export function useTargetId(id) {
  return useQuery({
    queryKey: ["targetId", id],
    queryFn: () => fetchTargetId(id),
    enabled: !!id, 
  });
}

const fetchTargetDetailId = async (id) => {
  if (!id) return null; 
  const response = await fetch(`http://localhost:8000/targets/detail/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
};

export function useTargetDetailId(id) {
  return useQuery({
    queryKey: ["targetDetailId", id],
    queryFn: () => fetchTargetDetailId(id),
    enabled: !!id, 
  });
}