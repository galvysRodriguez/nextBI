import { create } from 'zustand';
import Cookies from 'js-cookie';

export const useAuthStore = create((set) => ({
  token: Cookies.get('authToken') || null,
  user: null,
  isAuthenticated: !!Cookies.get('authToken'),
  
  setAuthData: (data) => {
    Cookies.set('authToken', data.access_token, {
      expires: 1,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
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