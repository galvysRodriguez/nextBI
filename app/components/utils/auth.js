import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export const setAuthToken = (token) => {
  Cookies.set('authToken', token, {
    expires: 0.5 / 24, 
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

export const getServerAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('authToken')?.value;
};

export const getMiddlewareAuthToken = (request) => {
  return request.cookies.get('authToken')?.value;
};