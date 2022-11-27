
import { Grid, MenuList } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import InputButton from '../components/inputButton'
import RealmSelector from '../compositions/Realm/RealmSelector'

/**
 * @TODO Refactor
 */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

interface props {
  closeMenu: Function
}

const Aside = ({ closeMenu }: props) => {
  const router = useRouter()

  const [activeRealm, setActiveRealm] = useState(decodeURIComponent(String(router.query.realm ?? '')))
  const [realmPage, setRealmPage] = useState(decodeURIComponent(String(router.query.page ?? '')))

  const activateRealm = realm => {
    setRealmPage('')
    setActiveRealm(realm)
    closeMenu()
  }

  const activateRealmConfig = realm => {
    setRealmPage('config')
    setActiveRealm(realm)
    closeMenu()
  }

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.realm === encodeURIComponent(activeRealm) &&
      router.query.page === realmPage
    ) return

    router.query = {
      realm: encodeURIComponent(activeRealm),
      page: realmPage
    }

    router.push(
      {
        pathname: router.route,
        query: { ...router.query }
      }
    )
  }, [activeRealm, realmPage, router])

  const saveRealm = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/realm/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: event.target.name.value })
    })

    await res.json()
  }

  const { data, error } = useSWR(['/api/realm/fetch'], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return (
    <MenuList>
      <Grid style={{ padding: '1rem' }}>
        <form onSubmit={saveRealm}>
          <InputButton name="name" placeholder="Add realm..." />
        </form>
      </Grid>
      {
        data.map((realm, key) =>
          <RealmSelector
            key={key}
            realm={realm}
            realmKey={key}
            activateRealm={activateRealm}
            activateRealmConfig={activateRealmConfig}
            active={activeRealm === realm.name}
          />
        )
      }
    </MenuList>
  )
}

export default Aside
