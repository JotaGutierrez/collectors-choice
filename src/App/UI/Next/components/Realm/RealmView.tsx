import createItem from '@Core/Item/infrastructure/Api/CreateItem'
import Realm from '@Core/Realm/domain/Realm'
import { ChevronLeftIcon, GearIcon, MixerHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRealmContext } from '../../context/RealmContext'
import { useRealm, useTags } from '../../hooks/swr'
import BoardView from '../Item/BoardView'
import GridView from '../Item/GridView'
import ListView from '../Item/ListView'
import { TypographyH4 } from '../Shared/Typography'
import InlineTags from '../Tag/InlineTags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

interface ItemFormProps {
  activeRealm: String;
}

const ItemForm = ({ activeRealm }: ItemFormProps) => {
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const registerItem = async event => {
    event.preventDefault()
    setSubmitting(true)

    await createItem(name, activeRealm.toString())

    toast(`Item guardado: ${name}`)
    setName('')
    setSubmitting(false)
  }

  return submitting
    ? <Progress />
    : <><Input name="name" value={name} onChange={event => setName(event.target.value)} placeholder="Add item..." />
          <Button onClick={registerItem} name="name"><PlusIcon /></Button>
        </>
}

interface props {
  realm: Realm;
}

const RealmView = ({ realm }: props) => {
  const realmContext = useRealmContext()

  const { _realm, loading } = useRealm(realm)
  const { tags, loadingTags } = useTags(realm.name)

  return <>
    <div className='flex flex-col w-full h-dvh overflow-scroll snap-x'>
      <div className='border-b snap-top sticky top-0 backdrop-blur-md'>
        <div className='flex flex-row items-center p-4'>
          <Button
            color="inherit"
            onClick={() => realmContext?.setIsOpened(!realmContext.isOpened)}
            variant="ghost"
          >
            <ChevronLeftIcon />
          </Button>
          <TypographyH4 text={_realm?.name ?? 'Collectors Choice'} className="grow" />
          <Button
            color="inherit"
            onClick={() => realmContext?.toggleFilterTags()}
            variant={'ghost'}
          >
            <MixerHorizontalIcon />
          </Button>
          <Button
            color="inherit"
            onClick={ () => realmContext?.setActiveItem(null) && realmContext.showRealmConfig(realm.name) }
            variant={'ghost'}
          >
            <GearIcon />
          </Button>
        </div>
        {realmContext?.showFilterTags && loadingTags && <Skeleton className='w-[100%] h-[2rem] rounded-xs bg-slate-100' />}
        {realmContext?.showFilterTags && !!tags && <div className='px-4 pb-4 pt-0'><InlineTags tags={tags}/></div>}
      </div>
      <div className={`${realmContext?.activeItem ? 'closed' : 'open'} grow p-4` }>
        {loading && <Skeleton className='w-[100%] h-[4rem] rounded-xs bg-slate-100' />}
        {!loading && !_realm.config && <ListView/>}
        {!loading && _realm.config?.view === 'list' && <ListView/>}
        {!loading && _realm.config?.view === 'grid' && <GridView tags={tags}/>}
        {!loading && _realm.config?.view === 'board' && <BoardView tags={tags} property={_realm.config._property}/>}
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="flex w-full items-center space-x-2 p-4 pb-8">
        <ItemForm activeRealm={realmContext?.activeRealm ?? ''} />
      </div>
    </div>

  </>
}

export default RealmView
