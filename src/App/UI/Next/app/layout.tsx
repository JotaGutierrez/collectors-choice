import '../styles/globals.css'
import 'reflect-metadata'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import { AlertBagProvider } from '../context/AlertBag'
import { RealmContextProvider } from '../context/RealmContext'

const RootLayout = ({ children }: {children: React.ReactNode}) => {
  return <html lang="en">
    <body>
    <SessionProvider>
      <AlertBagProvider>
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
      </AlertBagProvider>
    </SessionProvider>
    </body>
  </html>
}

export default RootLayout
