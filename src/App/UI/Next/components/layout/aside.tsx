
import { Grid, MenuList } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import useSWR from 'swr'
import saveRealm from '../../../../../Core/Realm/infrastructure/Api/CreateRealm'
import fetcher from '../../../../../Core/Shared/Infrastructure/Http/Fetcher'
import { RealmContext } from '../../pages/_app'
import InputButton from '../components/inputButton'
import RealmSelector from '../compositions/Realm/RealmSelector'

interface props {
  closeMenu: Function
}

const Aside = ({ closeMenu }: props) => {
  const router = useRouter()

  const realmContext = useContext(RealmContext)

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.realm === encodeURIComponent(realmContext.activeRealm) &&
      router.query.page === realmContext.realmPage
    ) return

    router.query = {
      realm: encodeURIComponent(realmContext.activeRealm),
      page: realmContext.realmPage
    }

    router.push(
      {
        pathname: router.route,
        query: { ...router.query }
      }
    )
  }, [realmContext.activeRealm, realmContext.realmPage, router])

  const { data, error } = useSWR(['/api/realm/fetch'], fetcher, { refreshInterval: 10000 })

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
            activateRealm={realmContext.activateRealm}
            activateRealmConfig={realmContext.activateRealmConfig}
            active={realmContext.activeRealm === realm.name}
          />
        )
      }
    </MenuList>
  )
}

export default Aside
