"use server"
import { cookies } from 'next/headers';

export const getServerAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('authToken')?.value;
};

export const getMiddlewareAuthToken = async(request) => {
  return request.cookies.get('authToken')?.value;
};