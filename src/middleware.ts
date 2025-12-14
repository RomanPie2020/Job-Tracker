import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  if (!token?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const response = NextResponse.next()
  response.headers.set('x-user-email', token.email)
  console.log('Middleware - User email:', token.email)
  return response
}

export const config = {
  matcher: ['/api/jobs/:path*'],
}
