import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { VARIABLES_CONFIG } from './lib/utils/utils';
import { extractPayload, PayloadCart } from './lib/utils/token';

export default async function middleware(req:NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const privateRoutes = ['/checkout','/favorites']
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const cartIdCookie = req.cookies.get(VARIABLES_CONFIG.CART_TOKEN!)?.value
  const cartPayload = cartIdCookie ? extractPayload<PayloadCart>(cartIdCookie): null

  if (!session) {
    const url = req.nextUrl.clone();
    if (isPrivateRoute || pathname.startsWith('/dashboard')) {
      url.pathname = '/auth/signin';
      url.search = `callbackUrl=${pathname}`;
      return NextResponse.redirect(url);
    }
    if(cartPayload && cartPayload?.cart?.state === 'ACTIVE'){
      const response = NextResponse.next();
      response.cookies.delete(VARIABLES_CONFIG.CART_TOKEN!)
      return response
    }
    return NextResponse.next();
  }


  if (session.role === 'admin' && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (pathname.startsWith('/dashboard') && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ['/','/cases/:path*','/checkout/:path*', '/favorites/:path*', '/dashboard/:path*'],
};
