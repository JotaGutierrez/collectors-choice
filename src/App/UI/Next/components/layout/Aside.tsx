import Realm from '@Core/Realm/domain/Realm'
import saveRealm from '@Core/Realm/infrastructure/Api/CreateRealm'
import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import { PlusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/router'
import { Key, useContext, useEffect, useState } from 'react'
import useSWR from 'swr'
import { RealmContext } from '../../pages/_app'
import RealmSelector from '../compositions/Realm/RealmSelector'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const Aside = () => {
  const router = useRouter()

  const realmContext = useContext(RealmContext)

  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitForm = async event => {
    event.preventDefault()
    setSubmitting(true)
    await saveRealm(name)
    setName('')
    setSubmitting(false)
  }

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
    <div className="flex flex-col h-full">
      <div className='grid grid-flow-row grow auto-rows-max text-sm gap-1 p-4'>
        {
          data.map((realm: Realm, key: Key) =>
            <RealmSelector
              key={key}
              realm={realm}
              realmKey={key}
              activateRealm={realmContext.activateRealm}
            />
          )
        }
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="flex w-full max-w-sm items-center space-x-2 p-4 pb-8">
        <Input name="name" onChange={event => setName(event.target.value)} placeholder="Add realm..." />
        {
          submitting
            ? <Progress />
            : <Button onClick={submitForm} name="name"><PlusIcon /></Button>
        }
      </div>
    </div>
  )
}

export default Aside
