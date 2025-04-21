"use client"
import { useState } from "react";
import { API_ROUTES } from "../../api/routes";
import { useAuthStore } from "./useAuthStore";

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const authStore = useAuthStore()

  const login = async (formData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(API_ROUTES.USERS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión")
      }

      authStore.setAuthData(data.data)

      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  };

  return { login, loading, error };
};
