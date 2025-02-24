import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(req:any) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const privateRoutes = ['/checkout','/favorites']
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!session) {
    if (isPrivateRoute || pathname.startsWith('/dashboard')) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/signin';
      url.search = `callbackUrl=${pathname}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (session.role === 'admin' && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (pathname.startsWith('/dashboard') && session.role !== 'admin') {
    // return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/','/checkout/:path*', '/favorites/:path*', '/dashboard/:path*'],
};
