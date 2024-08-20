// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from "next-auth/jwt"
 export { default } from "next-auth/middleware"

// This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
//     if(token && (
//         request.url === '/login' ||
//         request.url === '/dashboard' ||
//         request.url === '/verify'
        
//     )){
//         return NextResponse.redirect(new URL('/dashboard', request.url))
//     }
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/dashboard/:path*',
    'verify/:path*',
  ]
}