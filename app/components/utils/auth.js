"use server"
import { cookies } from 'next/headers';

export const getServerAuthToken = async () => {
  const cookieStore = cookies();
  return cookieStore.get('authToken')?.value;
};

export const getMiddlewareAuthToken = async(request) => {
  return request.cookies.get('authToken')?.value;
};