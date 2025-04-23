import { cookies } from 'next/headers';

export const getServerAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get('authToken')?.value;
};

export const getMiddlewareAuthToken = (request) => {
  return request.cookies.get('authToken')?.value;
};