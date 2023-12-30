import Realm from '@Core/Realm/domain/Realm'
import saveRealmNotes from '@Core/Realm/infrastructure/Api/SaveRealmNotes'
import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '@Core/Tag/domain/Tag'
import saveTag from '@Core/Tag/infrastructure/Api/CreateTagGroup'
import deleteTag from '@Core/Tag/infrastructure/Api/DeleteTag'
import deleteTagGroup from '@Core/TagGroup/application/DeleteTagGroup'
import saveTagGroup from '@Core/TagGroup/infrastructure/Api/CreateTagGroup'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  GridIcon,
  LayoutIcon,
  ListBulletIcon,
  PlusIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import { useState } from 'react'
import { Autosave } from 'react-autosave'
import useSWR from 'swr'
import { TypographyNav, TypographySmall } from '../../atoms/Typography'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

interface props {
  realm: Realm;
  tags: Array<Tag>;
}

function saveView (view: string, property: string|null) {
  console.log(view, property)
}

/** @TODO: Refactor. Split modules */
const RealmConfig = ({ realm, tags }: props) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showTagGroups, setShowTagGroups] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [realmNotes, setRealmNotes] = useState(realm.notes)

  const [tagName, setTagName] = useState('')
  const [tagGroupName, setTagGroupName] = useState('')

  const properties = new Set([...tags.filter(tag => tag.group !== '').map(tag => tag.group)])

  const { data, error } = useSWR(['/api/tag_group/fetch', '?realm=' + realm.name], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <div className={'flex flex-col gap-4 py-2'}>
    <div className={'p-4'}>
      <div className={'flex flex-row  pb-4'}>
        <TypographyNav text="Realm description" className={'grow'}/>
        <Button
          color="inherit"
          onClick={() => setShowDescription(!showDescription)}
          variant={'ghost'}
        >
          {showDescription ? <ChevronDownIcon /> : <ChevronLeftIcon/>}
        </Button>
      </div>
      {showDescription &&
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <Textarea
                  name="notes"
                  id="notes"
                  placeholder="Add realm notes..."
                  defaultValue={realm.notes}
                  onChange={e => setRealmNotes(e.target.value)}
              />
              <Autosave data={realmNotes} onSave={event => saveRealmNotes(event, realm)}/>
          </div>
      }
    </div>
    <Separator className={'my-4'} />
    <div className={'p-4'}>
      <div className={'flex flex-row pb-4'}>
        <TypographyNav text="Realm properties" className={'grow'}/>
        <Button
          color="inherit"
          onClick={() => setShowTagGroups(!showTagGroups)}
          variant={'ghost'}
        >
          {showTagGroups ? <ChevronDownIcon /> : <ChevronLeftIcon/>}
        </Button>
      </div>
      {showTagGroups && <>
          <div className={'flex flex-col gap-4 mb-4'}>
            {data.map((data, groupKey) =>
              <div className={'flex flex-row'} key={groupKey}>
                  <TypographySmall text={data.name} className={'grow'}/>
                  <Button
                      variant='ghost'
                      onClick={() => deleteTagGroup(data._id)}
                  >
                      <TrashIcon/>
                  </Button>
              </div>
            )}
          </div>
          <div className="flex w-full items-center space-x-2 pb-8">
              <Input name="name-group-name"
                     onChange={event => setTagGroupName(event.target.value)}
                     placeholder="Add Tag Group..."
              />
            {
              submitting
                ? <Progress />
                : <Button
                    onClick={() => saveTagGroup(tagGroupName, realm)}
                    placeholder="Add Tag Group..."
                ><PlusIcon /></Button>
            }
          </div>
      </>
      }
    </div>
    <Separator className={'my-4'} />
    <div className={'p-4'}>
      <div className={'flex flex-row mb-4'}>
        <TypographyNav text="Realm tags" className={'grow'}/>
        <Button
          color="inherit"
          onClick={() => setShowAddTag(!showAddTag)}
          variant={'ghost'}
        >
          {showAddTag ? <ChevronDownIcon /> : <ChevronLeftIcon/>}
        </Button>
      </div>
      {showAddTag &&
        <>
          <div className={'flex flex-col gap-4 mb-4'}>
            {Array.isArray(tags) && tags.map((tag, key) =>
              <div className={'flex flex-row'} key={key}>
                <TypographySmall text={tag.name} className={'grow'}/>
                <Button
                  variant='ghost'
                  onClick={() => deleteTag(tag._id)}
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
          <div className="flex w-full items-center space-x-2">
              <Input name="name"
                     onChange={event => setTagName(event.target.value)}
                     placeholder="Add Tag..."
              />
            {
              submitting
                ? <Progress/>
                : <Button onClick={() => saveTag({ tagName, realm: realm.name, group: '' })}
                          placeholder="Add Tag..."><PlusIcon/></Button>
            }
          </div>
      </>
      }
    </div>
    <Separator className={'my-4'}/>
    <div className={'p-4'}>
      <Card>
        <CardHeader>
          <TypographyNav text={'View Settings'} className={''}></TypographyNav>
          <CardDescription>Choose the default view. You can change it at any time.</CardDescription>
        </CardHeader>

        <CardDescription>
          <div className={'flex flex-row gap-2 p-4'}>
            <Button onClick={() => saveView('list', null)} variant={'ghost'}>
              <ListBulletIcon />
            </Button>
            <Button onClick={() => saveView('grid', null)} variant={'ghost'}>
              <GridIcon />
            </Button>
            {[...Array.from(properties)].map((_property, key) =>
              <div key={key} onClick={() => {
                saveView('board', _property)
              }}>
                <Button variant={'ghost'}>
                  <LayoutIcon />
                </Button>
                <div>
                  {_property}
                </div>
              </div>
            )}
          </div>
        </CardDescription>
      </Card>
    </div>
  </div>
}

export default RealmConfig
