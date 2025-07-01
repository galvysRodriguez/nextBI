import { NextResponse } from 'next/server';
import { getMiddlewareAuthToken } from './app/components/utils/auth';

export function middleware(request) {
  const token = getMiddlewareAuthToken(request)
  const { pathname } = request.nextUrl
  const publicRoutes = ['/login', '/_next', '/favicon.ico', '/images/favicon.svg']

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.delete('from')
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next();
}