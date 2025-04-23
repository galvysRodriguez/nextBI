"use client"
import { create } from 'zustand';
import Cookies from 'js-cookie';
import { setAuthToken } from '../../utils/authClient';


export const useAuthStore = create((set) => ({
  token: Cookies.get('authToken') || null,
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  isAuthenticated: !!Cookies.get('authToken'),
  
  setAuthData: (data) => {
    setAuthToken(data.access_token)
    localStorage.setItem('authUser', JSON.stringify(data.user))
    set({ 
      token: data.access_token,
      user: data.user,
      isAuthenticated: !!data.access_token
    });
  },
  
  clearAuthData: () => {
    Cookies.remove('authToken');
    set({ 
      token: null,
      user: null,
      isAuthenticated: false 
    });
  },
}));