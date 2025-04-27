"use client"
import Cookies from 'js-cookie';

export const setAuthToken = (token) => {
    Cookies.set('authToken', token, {
      expires: 0.5 * 24/ 24, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  };
  
  export const getClientAuthToken = () => {
    return Cookies.get('authToken');
  };
  
  export const removeAuthToken = () => {
    Cookies.remove('authToken', { path: '/' });
  };