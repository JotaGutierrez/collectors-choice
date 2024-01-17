import { auth } from 'auth'
import { NextApiRequest } from 'next'
import { NextResponse } from 'next/server'

export interface User {
  name: string;
  email: string;
  image: string;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}

export type NextApiRequestWithAuth = NextApiRequest & {
  userId: string;
};

export const withUser = (handler: Function) => async (request: Request) => {
  const { user } = await auth()

  return handler(request, user)
}

export const middleware = async () => {
  const { user } = await auth()

  if (!user) {
    return new NextResponse(null, { status: 403 })
  }
}
