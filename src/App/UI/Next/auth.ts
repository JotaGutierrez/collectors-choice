import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  pages: {
    signIn: '/login'
  },
  trustHost: true,
  ...authConfig
})
