import '../styles/globals.css'
import 'reflect-metadata'
import { useRouter } from 'next/router'
import { Key, createContext, useState } from 'react'

interface AlertInterface {
  message: string;
  id: Key;
}

interface AlertBagContextInterface {
  alerts: Array<AlertInterface>;
  pushAlert: (string) => void;
}

interface RealmContextInterface {
  activeRealm: string;
  activateRealm: Function;
  showFilterTags: boolean;
  toggleFilterTags: Function;
  activateRealmConfig: Function;
  realmPage: string;
}

interface AsideContextInterface {
  isOpened: boolean;
  setIsOpened: Function;
}

export const AlertBagContext = createContext<AlertBagContextInterface | null>(null)
export const RealmContext = createContext<RealmContextInterface | null>(null)
export const AsideContext = createContext<AsideContextInterface | null>(null)

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
        activateRealm,
        activateRealmConfig,
        realmPage
      }}>
        <Component {...pageProps} />
      </RealmContext.Provider>
    </AlertBagContext.Provider>
  </AsideContext.Provider >
}

export default MyApp
