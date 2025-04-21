"use client"
import { useCallback } from 'react';
import { useRouter } from 'next/navigation'; 
import { getAuthToken } from '../lib/auth';

export const useAuth = () => {
  const router = useRouter()

  const isAuthenticated = useCallback(() => {
    return !!getAuthToken()
  }, []);

  const requireAuth = useCallback((redirectTo = '/login') => {
    if (!isAuthenticated()) {
      router.push(redirectTo)
      return false
    }
    return true
  }, [isAuthenticated, router])

  const redirectIfAuthenticated = useCallback((redirectTo = '/dashboard') => {
    if (isAuthenticated()) {
      router.push(redirectTo)
      return true
    }
    return false
  }, [isAuthenticated, router])

  return {
    isAuthenticated,
    requireAuth,
    redirectIfAuthenticated
  };
};
