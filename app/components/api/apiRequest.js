import { getServerAuthToken } from "../utils/auth";
import { getClientAuthToken } from "../utils/authClient";

export const apiRequest = async ({
    method = "GET",
    endpoint,
    body = null,
    params = {},
    headers = {},
  }) => {
    const token = (typeof window !== "undefined") ? getClientAuthToken() : await getServerAuthToken();

    const url = new URL(endpoint);

    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );
  
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };
  
    if (body && method !== "GET") {
      config.body = JSON.stringify(body);
    }
  
    const response = await fetch(url.toString(), config);
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Error fetching data");
    }
  
    return response.json();
  };
  