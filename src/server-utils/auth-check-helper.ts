import { authOptions } from '@/providers/google-auth-options'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function requireEmail(): Promise<string> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }
  return session.user.email
}

export function jsonResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status })
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status })
}

export async function withAuth(
  handler: (email: string, request?: NextRequest) => Promise<NextResponse>,
  request?: NextRequest
) {
  try {
    const email = await requireEmail()
    return await handler(email, request)
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      return errorResponse('Unauthorized', 401)
    }
    console.error('Route error:', err)
    return errorResponse('Internal Server Error')
  }
}
