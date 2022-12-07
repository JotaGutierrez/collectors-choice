import '../styles/globals.css'
import 'reflect-metadata'
import { useRouter } from 'next/router'
import { createContext, useState } from 'react'

export const AlertBagContext = createContext([])
export const RealmContext = createContext([])
export const AsideContext = createContext([])

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  const pushAlert = alert => {
    const id = Math.random()

    setAlerts({ alerts: [...alerts.alerts, { message: alert, id }], pushAlert })

    setTimeout(() => {
      alerts.alerts.shift()
      setAlerts({ alerts: [...alerts.alerts], pushAlert })
    }, 1500)
  }

  const [alerts, setAlerts] = useState({ alerts: [], pushAlert })

  const toggleFilterTags = () => setShowFilterTags(!showFilterTags)

  const activateRealm = realm => {
    setRealmPage('')
    setActiveRealm(realm)
    setIsOpened(false)
  }

  const activateRealmConfig = realm => {
    setRealmPage('config')
    setActiveRealm(realm)
    setIsOpened(false)
  }

  const [showFilterTags, setShowFilterTags] = useState(false)
  const [activeRealm, setActiveRealm] = useState(decodeURIComponent(String(router.query?.realm ?? '')))
  const [realmPage, setRealmPage] = useState(decodeURIComponent(String(router.query?.page ?? '')))
  const [isOpened, setIsOpened] = useState(false)

  return <AsideContext.Provider value={{ isOpened, setIsOpened }}>
    <AlertBagContext.Provider value={alerts}>
      <RealmContext.Provider value={{
        showFilterTags,
        toggleFilterTags,
        activeRealm,
        setActiveRealm: activateRealm,
        activateRealmConfig,
        realmPage
      }}>
        <Component {...pageProps} />
      </RealmContext.Provider>
    </AlertBagContext.Provider>
  </AsideContext.Provider>
}

export default MyApp
