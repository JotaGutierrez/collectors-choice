import '../styles/globals.css'
import 'reflect-metadata'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'sonner'
import { RealmContextProvider } from '../context/RealmContext'
import { ThemeProvider } from '../context/ThemeProvider'

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
