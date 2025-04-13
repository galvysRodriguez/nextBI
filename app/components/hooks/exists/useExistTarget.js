import { useQuery } from "@tanstack/react-query";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const BASE_URL = `${API_BASE}/targets/exist/`;

const verifyTargetExistence = async ({ title, target_id = null }) => {
  const url = new URL(BASE_URL);
  url.searchParams.append('title', title);
  
  if (target_id) url.searchParams.append('target_id', target_id.toString());

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Error verifying title${target_id ? ' (update)' : ''}`
    );
  }

  return response.json();
};

export const useExistTargetQuery = ({ title, target_id }) => {
  return useQuery({
    queryKey: ["targetExistence", title, target_id],
    queryFn: () => verifyTargetExistence({ title, target_id }),
    enabled: false, 
    retry: false,
    staleTime: 0,
    cacheTime: 0,
  });
};