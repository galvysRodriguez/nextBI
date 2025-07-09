import { useAuthStore } from "../hooks/auth/useAuthStore";
import { getServerAuthToken } from "../utils/auth";
import { getClientAuthToken, removeAuthToken } from "../utils/authClient";
import { showErrorToast } from "../utils/toast";

export const apiRequest = async ({
  method = "GET",
  endpoint,
  body = null,
  params = {},
  headers = {},
}) => {
  const token =
    typeof window !== "undefined"
      ? getClientAuthToken()
      : await getServerAuthToken();
      

  const clearAuthData = () => {
    removeAuthToken();
    if (typeof window !== "undefined") {
      localStorage.removeItem("authUser");
      localStorage.removeItem("company");
    }
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

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

  try {
    const response = await fetch(url.toString(), config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log(errorData);
      showErrorToast("Se ha caducado la sesión");
      clearAuthData();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    showErrorToast("Error, se ha caducado la sesión");
    clearAuthData();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw error;
  }

};
