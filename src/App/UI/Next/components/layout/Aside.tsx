import Realm from '@Core/Realm/domain/Realm'
import saveRealm from '@Core/Realm/infrastructure/Api/CreateRealm'
import {MoonIcon, PlusIcon, SunIcon} from '@radix-ui/react-icons'
import {useTheme} from 'next-themes'
import {Key, useContext, useState} from 'react'
import {useRealms} from '../../hooks/swr'
import {RealmContext} from '../../pages/_app'
import {TypographyH4} from '../atoms/Typography'
import RealmSelector from '../compositions/Realm/RealmSelector'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {Progress} from '@/components/ui/progress'
import {Separator} from '@/components/ui/separator'
import {Skeleton} from '@/components/ui/skeleton'

const Aside = () => {
  const realmContext = useContext(RealmContext)

  const { _realms, loading } = useRealms()
  const { setTheme } = useTheme()

  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submitForm = async event => {
    event.preventDefault()
    setSubmitting(true)
    await saveRealm(name)
    setName('')
    setSubmitting(false)
  }

  return (
    <div className='flex flex-col w-full h-dvh overflow-scroll snap-x'>
      <div className='border-b snap-top sticky top-0 backdrop-blur-md'>
        <div className='flex flex-row items-center p-4'>
          <TypographyH4 text={'Collectors Choice'} className="grow" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='grid grid-flow-row grow auto-rows-max text-sm gap-1 p-4'>
        {loading || !_realms
          ? <Skeleton className='w-[100%] h-[4rem] rounded-xs bg-slate-100' />
          : _realms.map((realm: Realm, key: Key) =>
            <RealmSelector
              key={key}
              realm={realm}
              realmKey={key}
              activateRealm={realmContext.activateRealm}
            />
          )}
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="flex w-full max-w-sm items-center space-x-2 p-4 pb-8">
        {
          submitting
            ? <Progress />
            : <>
              <Input name="name" onChange={event => setName(event.target.value)} placeholder="Add realm..." />
              <Button onClick={submitForm} name="name"><PlusIcon /></Button>
            </>
        }
      </div>
    </div>
  )
}

export default Aside
