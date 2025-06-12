"use client";
import { create } from "zustand";
import { getClientAuthToken, removeAuthToken, setAuthToken } from "../../utils/authClient";

export const useAuthStore = create((set) => ({
  token: null,
  user:  null,
  isAuthenticated: false,

  loadFromStorage: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("authUser")
      const token = getClientAuthToken()
      if (user && token) {
        set({
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
        });
      }
    }
  },

  setAuthData: (data) => {
    setAuthToken(data.access_token);
    if (typeof window !== "undefined") {
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("company", JSON.stringify(data.enterprise));
    }
    set({
      token: data.access_token,
      user: data.user,
      isAuthenticated: !!data.access_token,
    });
  },

  clearAuthData: () => {
    removeAuthToken()
    if (typeof window !== "undefined") {
      localStorage.removeItem("authUser");
      localStorage.removeItem("company");
    }
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
