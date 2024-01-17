import { auth } from 'auth'
import { NextResponse } from 'next/server'

export interface User {
  name: string;
  email: string;
  image: string;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}

export const withUser = (handler: { (request: Request, user: User): Promise<Response>}) => async (request: Request) => {
  // @ts-ignore
  const { user } = await auth()

  return handler(request, user)
}

export const middleware = async () => {
  // @ts-ignore
  const { user } = await auth()

  if (!user) {
    return new NextResponse(null, { status: 403 })
  }
}
