import Item from '@Core/Item/domain/Item'
import deleteItem from '@Core/Item/infrastructure/Api/DeleteItem'
import saveDescription from '@Core/Item/infrastructure/Api/SaveDescription'
import saveProperty from '@Core/Item/infrastructure/Api/SaveProperty'
import Tag from '@Core/Tag/domain/Tag'
import { ChevronLeftIcon, TrashIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { Autosave } from 'react-autosave'
import TagSelect from '../../atoms/TagsSelect'
import { TypographyH3 } from '../../atoms/Typography'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

const Page = ({ item, tags }: { item: Item, tags: Array<Tag> }) => {
  const [itemNotes, setItemNotes] = useState(null)

  const properties = new Set([...tags.filter(tag => tag.group !== '').map(tag => tag.group)])

  useEffect(() => {
    setItemNotes(item.notes)
  }, [item])

  return <>
    <div className='flex flex-col w-full h-screen'>
      <div className='border-b'>
        <div className='flex flex-row items-center p-4'>
          <Button
            color="inherit"
            onClick={() => null}
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
        {
          [...Array.from(properties)].map((property, key) => {
            const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
            return <div key={key}>
              <Select name="" onChange={event => saveProperty(item, event.target.value, property, tags)}
                      value={selectedTag ? selectedTag.name : ''}>
                <option value=""></option>
                {tags.filter(tag => tag.group === property).map((tag, key) => <option key={key}
                                                                                      value={tag.name}>{tag.name}</option>)}
              </Select>
            </div>
          })
        }
      </div>
    </div>
  </>
}

export default Page
