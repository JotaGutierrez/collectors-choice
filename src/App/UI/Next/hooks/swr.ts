import Item from '@Core/Item/domain/Item'
import Realm from '@Core/Realm/domain/Realm'
import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import useSWR from 'swr'

function useRealms () {
  const { data, error, isLoading } = useSWR('/api/realm/fetch', fetcher, { refreshInterval: 10000 })

  return {
    _realms: data,
    loading: isLoading,
    isError: error
  }
}

function useRealm (realm: Realm) {
  const { data, error, isLoading } = useSWR(`/api/realm/fetchOne?name=${realm.name}`, fetcher, { refreshInterval: 10000 })

  return {
    _realm: data,
    loading: isLoading,
    isError: error
  }
}

function useTags (realm: string) {
  const { data, error, isLoading } = useSWR(`/api/tag/fetch?realm=${realm}`, fetcher, { refreshInterval: 10000 })

  return {
    tags: data,
    loadingTags: isLoading,
    isError: error
  }
}

function useItems (realm: string, filter: Array<String>) {
  const { data, error, isLoading } = useSWR(`/api/item/fetch?realm=${realm}${filter ? `&filter=${encodeURIComponent(JSON.stringify(filter))}&` : ''}`, fetcher, { refreshInterval: 10000 })

  return {
    items: data,
    loading: isLoading,
    isError: error
  }
}

function useItem (item: Item) {
  const { data, error, isLoading } = useSWR(`/api/item/fetchOne?id=${item}`, fetcher)

  return {
    item: data,
    loadingItem: isLoading,
    isError: error
  }
}

export {
  useRealms,
  useRealm,
  useTags,
  useItems,
  useItem
}
