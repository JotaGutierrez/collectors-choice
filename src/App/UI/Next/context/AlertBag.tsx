'use client'

import React, { Key, createContext, useContext, useState } from 'react'

interface AlertInterface {
  message: string;
  id: Key;
}

interface AlertBagContextInterface {
  alerts: Array<AlertInterface>;
  pushAlert: (string) => void;
}

interface Props {
  children: React.ReactNode;
}

const AlertBagContext = createContext<AlertBagContextInterface | null>(null)

export const AlertBagProvider = ({ children }: Props) => {
  const pushAlert = (alert: AlertInterface) => {
    const id = Math.random()

    // @ts-ignore
    setAlerts({ alerts: [...alerts.alerts, { message: alert, id }], pushAlert })

    setTimeout(() => {
      alerts.alerts.shift()
      setAlerts({ alerts: [...alerts.alerts], pushAlert })
    }, 1500)
  }

  const [alerts, setAlerts] = useState({ alerts: [], pushAlert })

  return (
    <AlertBagContext.Provider value={alerts}>
      {children}
    </AlertBagContext.Provider>
  )
}

export const useAlertBagContext = () => useContext(AlertBagContext)
