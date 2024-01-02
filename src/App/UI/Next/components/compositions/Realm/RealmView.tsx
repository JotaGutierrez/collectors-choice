import createItem from '@Core/Item/infrastructure/Api/CreateItem'
import Realm from '@Core/Realm/domain/Realm'
import Tag from '@Core/Tag/domain/Tag'
import { ChevronLeftIcon, GearIcon, MixerHorizontalIcon, PlusIcon } from '@radix-ui/react-icons'
import { useContext, useState } from 'react'
import { AlertBagContext, AsideContext, RealmContext } from '../../../pages/_app'
import { TypographyH4 } from '../../atoms/Typography'
import BoardView from '../Item/BoardView'
import GridView from '../Item/GridView'
import ListView from '../Item/ListView'
import InlineTags from '../Tag/InlineTags'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

interface ItemFormProps {
  activeRealm: String;
}

const ItemForm = ({ activeRealm }: ItemFormProps) => {
  const alertBag = useContext(AlertBagContext)
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const registerItem = async event => {
    event.preventDefault()
    setSubmitting(true)

    await createItem(name, activeRealm.toString())

    alertBag.pushAlert(`Item guardado: ${name}`)
    setName('')
    setSubmitting(false)
  }

  return <>
    <Input name="name" value={name} onChange={event => setName(event.target.value)} placeholder="Add item..." />
    {
      submitting
        ? <Progress />
        : <Button onClick={registerItem} name="name"><PlusIcon /></Button>
    }
  </>
}

interface props {
  realm: Realm;
  tags: Array<Tag>;
}

const RealmView = ({ realm, tags }: props) => {
  const realmContext = useContext(RealmContext)
  const asideContext = useContext(AsideContext)

  return <>
    <div className='flex flex-col w-full h-screen overflow-scroll snap-x'>
      <div className='border-b snap-top sticky top-0 backdrop-blur-md'>
        <div className='flex flex-row items-center p-4'>
          <Button
            color="inherit"
            onClick={() => asideContext.setIsOpened(!asideContext.isOpened)}
            variant="ghost"
          >
            <ChevronLeftIcon />
          </Button>
          <TypographyH4 text={realmContext.activeRealm ?? 'Collectors Choice'} className="grow" />
          <Button
            color="inherit"
            onClick={() => realmContext.toggleFilterTags()}
            variant={'ghost'}
          >
            <MixerHorizontalIcon />
          </Button>
          <Button
            color="inherit"
            onClick={ () => realmContext.setActiveItem(null) && realmContext.showRealmConfig(realm.name) }
            variant={'ghost'}
          >
            <GearIcon />
          </Button>
        </div>
        {realmContext.showFilterTags && <div className='px-4 pb-4 pt-0'><InlineTags tags={tags}/></div>}
      </div>
      <div className={`${realmContext.activeItem ? 'closed' : 'open'} grow p-4` }>
        {realm.config?.view === 'list' && <ListView/>}
        {realm.config?.view === 'grid' && <GridView tags={tags}/>}
        {realm.config?.view === 'board' && <BoardView tags={tags} property={realm.config._property}/>}
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="flex w-full items-center space-x-2 p-4 pb-8">
        <ItemForm activeRealm={realmContext.activeRealm} />
      </div>
    </div>

  </>
}

export default RealmView
