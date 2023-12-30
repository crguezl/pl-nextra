import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log(`middleware. pathname="${request.nextUrl.pathname}"`)

  const response = NextResponse.next()
  response.cookies.set('pl2324', 'fast')
  response.cookies.set({
    name: 'pl2324',
    value: 'excellent',
    path: '/',
  })
 let cookie = response.cookies.get('pl2324')
 if (cookie) {
   console.log(`middleware. cookie: ${JSON.stringify(cookie)}`) // => { name: 'pl2324', value: 'excellent', Path: '/' }
 }
  // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.
 
  return response // because is a "nextResponse" it continues to the next middleware
  // return NextResponse.redirect(new URL('/', request.url))
}
 
// See https://nextjs.org/docs/pages/building-your-application/routing/middleware
export const config = {
  matcher: ['/labs/:path*'],
}