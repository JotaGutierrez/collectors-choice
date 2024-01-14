import '../styles/globals.css'
import 'reflect-metadata'
import React from 'react'
import { ThemeProvider } from '../components/theme/ThemeProvider'
import { AlertBagProvider } from '../context/AlertBag'
import { RealmContextProvider } from '../context/RealmContext'

const RootLayout = ({ children }: {children: React.ReactNode}) => {
  return <html lang="en">
    <body>
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
    </body>
  </html>
}

export default RootLayout
