import '../styles/globals.css'
import 'reflect-metadata'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'sonner'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import { RealmContextProvider } from '../context/RealmContext'

const RootLayout = ({ children }: {children: React.ReactNode}) => {
  return <html lang="en">
    <body>
    <SessionProvider>
      <RealmContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </RealmContextProvider>
    </SessionProvider>
    <Toaster />
    </body>
  </html>
}

export default RootLayout
