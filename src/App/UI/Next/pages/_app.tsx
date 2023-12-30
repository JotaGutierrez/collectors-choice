import '../styles/globals.css'
import 'reflect-metadata'
import { useRouter } from 'next/router'
import { Key, createContext, useEffect, useState } from 'react'
import Item from '../../../../Core/Item/domain/Item'
import Realm from '../../../../Core/Realm/domain/Realm'
import fetcher from '../../../../Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '../../../../Core/Tag/domain/Tag'

interface AlertInterface {
  message: string;
  id: Key;
}

interface AlertBagContextInterface {
  alerts: Array<AlertInterface>;
  pushAlert: (string) => void;
}

interface RealmContextInterface {
  realm?: Realm;
  tags?: Array<Tag>;
  filter?: Array<String>;
  items?: Array<Item>;
  activeItem?: Item;
  setActiveItem: Function;
  setFilter: Function;
  activeRealm: string;
  activateRealm: Function;
  showFilterTags: boolean;
  toggleFilterTags: Function;
  showRealmConfig: Function;
  hideRealmConfig: Function;
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

  const showRealmConfig = () => {
    setRealmPage('config')
  }

  const hideRealmConfig = () => {
    setRealmPage('')
  }

  const [showFilterTags, setShowFilterTags] = useState(false)
  const [filter, setFilter] = useState()
  const [activeRealm, setActiveRealm] = useState(decodeURIComponent(String(router.query?.realm ?? '')))
  const [realmPage, setRealmPage] = useState(decodeURIComponent(String(router.query?.page ?? '')))
  const [isOpened, setIsOpened] = useState(false)
  const [realm, setRealm] = useState()
  const [tags, setTags] = useState()
  const [items, setItems] = useState()
  const [activeItem, _setActiveItem] = useState()

  const setActiveItem = async item => {
    await _setActiveItem(null)
    await _setActiveItem(item)
  }

  useEffect(() => {
    setActiveRealm(decodeURIComponent(String(router.query?.realm ?? '')))
    setRealmPage(decodeURIComponent(String(router.query?.page ?? '')))
  }, [router.query])

  useEffect(() => {
    const fetchRealm = async () => {
      await _setActiveItem(null)
      await setItems(null)
      await setTags(null)
      await setFilter(null)

      const realm = await fetcher('/api/realm/fetchOne', '?name=' + activeRealm)
      setRealm(realm)

      const tags = await fetcher('/api/tag/fetch', '?realm=' + activeRealm)
      setTags(tags)

      const _items = await fetcher(
        '/api/item/fetch',
        `?${filter && filter !== '' ? `filter=${encodeURIComponent(JSON.stringify(filter))}&` : ''}realm=${activeRealm}`
      )
      setItems(_items)
    }

    if (activeRealm !== '') {
      fetchRealm()
    }
  }, [activeRealm])

  useEffect(() => {
    const fetchItems = async () => {
      const _items = await fetcher(
        '/api/item/fetch',
        `?${filter && filter !== '' ? `filter=${encodeURIComponent(JSON.stringify(filter))}&` : ''}realm=${activeRealm}`
      )
      setItems(_items)
    }

    fetchItems()
  }, [filter])

  return <AsideContext.Provider value={{ isOpened, setIsOpened }}>
    <AlertBagContext.Provider value={alerts}>
      <RealmContext.Provider value={{
        realm,
        tags,
        filter,
        items,
        activeItem,
        setActiveItem,
        setFilter,
        showFilterTags,
        toggleFilterTags,
        activeRealm,
        activateRealm,
        showRealmConfig,
        hideRealmConfig,
        realmPage
      }}>
        <Component {...pageProps} />
      </RealmContext.Provider>
    </AlertBagContext.Provider>
  </AsideContext.Provider>
}

export default MyApp
