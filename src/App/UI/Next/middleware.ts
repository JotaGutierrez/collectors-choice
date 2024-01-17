import { auth } from 'auth'
import { NextResponse } from 'next/server'

export interface User {
  name: string;
  email: string;
  image: string;
}

export const config = {
  matcher: ['/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)']
}

export const withUser = (handler: { (request: Request, user: User): Promise<Response>}) => async (request: Request) => {
  const session = await auth()

  if (!session?.user) {
    throw new Error('Invalid session')
  }

  return handler(request, session?.user as User)
}

export const middleware = async (request: Request) => {
  const session = await auth()
  const url = new URL(request.url)

  if (!session?.user) {
    if (url.pathname === '/') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return new NextResponse(null, { status: 403 })
  }
}
