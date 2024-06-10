import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

 
export default async function middleware(req) {
  const session = await getToken({req,secret:process.env.NEXTAUTH_SECRET})

  const requestedPage = req.nextUrl.pathname;
  const url = req.nextUrl.clone();

  if(!session){

    url.pathname = '/auth/login'
    url.search = `p=${requestedPage}`

    return NextResponse.redirect(url)
  }

  if(session.rol === 'admin'){
    return NextResponse.redirect('/dashboard')
  }

  if(session.rol !== 'admin' && req.nextUrl.pathname.startsWith('/dashboard')){
    url.pathname='/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/checkout/:path*','/dashboard'],
}