// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/recipes/create', '/dashboard']; 

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const authToken = request.cookies.get('auth_token')?.value;

    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname); 
      return NextResponse.redirect(loginUrl);
    }
    
  }

  return NextResponse.next();  
}

export const config = {
  matcher: [
     
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    
     
  ],
};
