'use client'

import Item from '@Core/Item/domain/Item'
import Realm from '@Core/Realm/domain/Realm'
import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '@Core/Tag/domain/Tag'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface RealmContextInterface {
  realm?: Realm;
  tags?: Array<Tag>|null;
  filter?: Array<String>|null;
  items?: Array<Item>|null;
  activeItem?: Item|null;
  setActiveItem: Function;
  setFilter: Function;
  activeRealm: string;
  activateRealm: Function;
  showFilterTags: boolean;
  toggleFilterTags: Function;
  showRealmConfig: Function;
  hideRealmConfig: Function;
  realmPage: string;
  isOpened: boolean;
  setIsOpened: Function;
}

const RealmContext = createContext<RealmContextInterface|null>(null)

interface Props {
  children: React.ReactNode
}

export const RealmContextProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState<|null>()
  const [realmPage, setRealmPage] = useState('')
  const [realm, setRealm] = useState()
  const [tags, setTags] = useState<Tag[]|null>(null)
  const [items, setItems] = useState<|null>()
  const [activeItem, _setActiveItem] = useState<|null>()
  const [activeRealm, setActiveRealm] = useState('')
  const [showFilterTags, setShowFilterTags] = useState(false)

  const [isOpened, setIsOpened] = useState(true)

  const toggleFilterTags = () => setShowFilterTags(!showFilterTags)

  const setActiveItem = async item => {
    await _setActiveItem(null)
    _setActiveItem(item)
  }

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

  useEffect(() => {
    const fetchRealm = async () => {
      _setActiveItem(null)
      setItems(null)
      setTags(null)
      setFilter(null)

      const realm = await fetcher('/api/realm/fetchOne', '?name=' + activeRealm)
      setRealm(realm)

      const tags = await fetcher('/api/tag/fetch', '?realm=' + activeRealm)
      setTags(tags)
    }

    if (activeRealm !== '') {
      fetchRealm()
    }
  }, [activeRealm])

  return (
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
    realmPage,
    isOpened,
    setIsOpened
  }}>
    {children}
  </RealmContext.Provider>)
}

export const useRealmContext = () => useContext(RealmContext)
