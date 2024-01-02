import Item from '@Core/Item/domain/Item'
import deleteItem from '@Core/Item/infrastructure/Api/DeleteItem'
import saveDescription from '@Core/Item/infrastructure/Api/SaveDescription'
import Tag from '@Core/Tag/domain/Tag'
import { ChevronLeftIcon, TrashIcon } from '@radix-ui/react-icons'
import { useContext, useEffect, useState } from 'react'
import { Autosave } from 'react-autosave'
import { RealmContext } from '../../../pages/_app'
import TagSelect from '../../atoms/TagsSelect'
import { TypographyH3 } from '../../atoms/Typography'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

const Page = ({ item, tags }: { item: Item, tags: Array<Tag> }) => {
  const [itemNotes, setItemNotes] = useState(null)
  const realmContext = useContext(RealmContext)

  useEffect(() => {
    setItemNotes(item.notes)
  }, [item])

  return <>
    <div className='flex flex-col w-full h-screen'>
      <div className='border-b'>
        <div className='flex flex-row items-center p-4'>
          <Button
            color="inherit"
            onClick={() => realmContext.setActiveItem(null)}
            variant="ghost"
          >
            <ChevronLeftIcon />
          </Button>
          <TypographyH3 text={item.name} className={'grow'} />
          <Button
            color="inherit"
            onClick={event => deleteItem(event, item._id)}
            variant={'ghost'}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
      <div className={'grow p-4'}>
         <Textarea
            rows={10}
            defaultValue={itemNotes}
            onChange={(e) => setItemNotes(e.target.value)}
            placeholder={'Add some notes...'}
          />
          <Autosave data={itemNotes} onSave={event => saveDescription(event, item)}></Autosave>
      </div>
      <Separator className="mb-4 mt-4" />
      <div className="flex w-full items-center space-x-2 p-4 pb-8 justify-end">
        {tags && tags.length > 0 && <TagSelect tags={tags} item={item}/>}
      </div>
    </div>
  </>
}

export default Page
