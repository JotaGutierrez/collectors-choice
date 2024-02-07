import Item from '@Core/Item/domain/Item'
import deleteItem from '@Core/Item/infrastructure/Api/DeleteItem'
import saveDescription from '@Core/Item/infrastructure/Api/SaveDescription'
import { ArchiveIcon, ChevronLeftIcon, DotsVerticalIcon, TrashIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { Autosave } from 'react-autosave'
import { useRealmContext } from '../../context/RealmContext'
import { useItem } from '../../hooks/swr'
import { TypographyH3 } from '../Shared/Typography'
import TagSelect from '../Tag/TagsSelect'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

const AutoSaveInput = ({ value, onSave }: {value: string, onSave: any}) => {
  const [notes, setNotes] = useState(value)

  useEffect(() => {
    setNotes(value)
  }, [value])

  return <>
    <Textarea
      rows={10}
      defaultValue={notes}
      onChange={e => setNotes(e.target.value)}
      placeholder={'Add some notes...'}
    />
    <Autosave data={notes} onSave={onSave} saveOnUnmount={true}/>
  </>
}

const Page = ({ _item }: { _item: Item }) => {
  const realmContext = useRealmContext()

  const { item, loadingItem } = useItem(_item._id)

  return <>
    <div className='flex flex-col w-full h-dvh'>
      <div className='border-b'>
        <div className='flex flex-row items-center p-4'>
          {loadingItem
            ? <Skeleton />
            : <><Button
              color="inherit"
              onClick={() => realmContext?.setActiveItem(null)}
              variant="ghost"
            >
              <ChevronLeftIcon/>
            </Button><TypographyH3 text={_item.name} className={'grow'}/>
              <DropdownMenu>
                <DropdownMenuTrigger><DotsVerticalIcon /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    Archive
                    <DropdownMenuShortcut>
                      <Button
                        color="inherit"
                        onClick={event => event.preventDefault()}
                        variant={'ghost'}
                      >
                        <ArchiveIcon />
                      </Button>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Delete
                    <DropdownMenuShortcut>
                      <Button
                        color="inherit"
                        onClick={event => {
                          event.preventDefault()
                          deleteItem(_item._id)
                            .then(realmContext?.setActiveItem(null))
                        }}
                        variant={'ghost'}
                      >
                        <TrashIcon/>
                      </Button>
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              </>}
        </div>
      </div>
      <div className={'grow p-4'}>
        {loadingItem
          ? <Skeleton/>
          : <><AutoSaveInput value={item.notes} onSave={(event: any) => saveDescription(event, item)} /></>}
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="w-dvw sm:w-full overflow-x-auto space-x-2 p-4 pb-8 justify-end">
        {loadingItem
          ? <Skeleton className='w-[100%] h-[4rem] rounded-xs bg-slate-100' />
          : <TagSelect item={item} allowAdd={true}/>
        }
      </div>
    </div>
  </>
}

export default Page
