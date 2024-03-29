import Realm from '@Core/Realm/domain/Realm'
import convertRealm from '@Core/Realm/infrastructure/Api/ConvertRealm'
import saveRealmConfig from '@Core/Realm/infrastructure/Api/SaveRealmConfig'
import saveRealmNotes from '@Core/Realm/infrastructure/Api/SaveRealmNotes'
import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '@Core/Tag/domain/Tag'
import deleteTag from '@Core/Tag/infrastructure/Api/DeleteTag'
import deleteTagGroup from '@Core/TagGroup/application/DeleteTagGroup'
import saveTagGroup from '@Core/TagGroup/infrastructure/Api/CreateTagGroup'
import {
  CheckIcon,
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
import { useRealmContext } from '../../context/RealmContext'
import { TypographyH4, TypographyNav } from '../Shared/Typography'
import TagInput from '../Tag/TagInput'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'

interface props {
  realm: Realm;
  tags: Array<Tag>;
}

const convertToTodo = async (realm) => {
  await convertRealm(realm)
}

const saveView = async (view: string, property: string|null, realm: Realm) => await saveRealmConfig({ view, property }, realm)

/** @TODO: Refactor. Split modules */
const RealmConfig = ({ realm, tags }: props) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showTagGroups, setShowTagGroups] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const realmContext = useRealmContext()
  const [realmNotes, setRealmNotes] = useState(realm.notes)

  const [tagGroupName, setTagGroupName] = useState('')

  const { data, error } = useSWR(`/api/tag_group/fetch?realm=${realm.name}`, fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <>
    <div className='flex flex-col w-full h-dvh overflow-scroll'>
      <div className={'flex flex-col gap-2 snap-x'}>
        <div className='border-b snap-top sticky top-0 backdrop-blur-md'>
          <div className='flex flex-row items-center p-4'>
            <Button
              color="inherit"
              onClick={() => realmContext?.hideRealmConfig()}
              variant="ghost"
            >
              <ChevronLeftIcon/>
            </Button>
            <TypographyH4 text="Realm Configuration" className="grow"/>
            <Button
              color="inherit"
              onClick={() => null}
              variant={'ghost'}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
        <div className={'p-4 snap-top'}>
          <div className={'flex flex-row pb-4'}>
            <TypographyNav text="Realm description" className={'grow'}/>
            <Button
              color="inherit"
              onClick={() => setShowDescription(!showDescription)}
              variant={'ghost'}
            >
              {showDescription ? <ChevronDownIcon/> : <ChevronLeftIcon/>}
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
        <Separator />
        <div className={'p-4 snap-top'}>
          <div className={'flex flex-row pb-4'}>
            <TypographyNav text="Realm properties" className={'grow'}/>
            <Button
              color="inherit"
              onClick={() => setShowTagGroups(!showTagGroups)}
              variant={'ghost'}
            >
              {showTagGroups ? <ChevronDownIcon/> : <ChevronLeftIcon/>}
            </Button>
          </div>
          {showTagGroups && <>
              <div className={'flex flex-col gap-4 mb-4'}>
                  <Table>
                      <TableCaption>Current Tag Groups</TableCaption>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Tag</TableHead>
                              <TableHead className={'text-right'}>Actions</TableHead>
                          </TableRow>
                      </TableHeader>
                    <TableBody>
                      {Array.isArray(data) && data.map((data, groupKey) =>
                        <TableRow key={groupKey}>
                          <TableCell className={'font-medium'}>{data.name}</TableCell>
                          <TableCell className={'text-right'}>
                            <Button
                              variant='ghost'
                              onClick={() => deleteTagGroup(data._id)}
                            >
                              <TrashIcon/>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
              </div>
              <div className="flex w-full items-center space-x-2">
                  <Input name="name-group-name"
                         onChange={event => setTagGroupName(event.target.value)}
                         placeholder="Add Tag Group..."
                  />
                {
                  submitting
                    ? <Progress/>
                    : <Button
                      onClick={async () => {
                        setSubmitting(true)
                        await saveTagGroup(tagGroupName, realm)
                        setSubmitting(false)
                      }}
                    ><PlusIcon/></Button>
                }
              </div>
          </>
          }
        </div>
        <Separator />
        <div className={'p-4 snap-top'}>
          <div className={'flex flex-row pb-4'}>
            <TypographyNav text="Realm tags" className={'grow'}/>
            <Button
              color="inherit"
              onClick={() => setShowAddTag(!showAddTag)}
              variant={'ghost'}
            >
              {showAddTag ? <ChevronDownIcon/> : <ChevronLeftIcon/>}
            </Button>
          </div>
          {showAddTag &&
              <>
                  <div className={'flex flex-col gap-4 mb-4'}>
                      <Table>
                          <TableCaption>Current Tags</TableCaption>
                          <TableHeader>
                              <TableRow>
                                  <TableHead>Tag</TableHead>
                                  <TableHead className={'text-right'}>Actions</TableHead>
                              </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Array.isArray(tags) && tags.map((tag, key) =>
                              <TableRow key={key}>
                                <TableCell className={'font-medium'}>{tag.name}</TableCell>
                                <TableCell className={'text-right'}>
                                  <Button
                                    variant='ghost'
                                    onClick={() => deleteTag(tag._id)}
                                  >
                                    <TrashIcon/>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                      </Table>
                  </div>
                  <div className={'w-full flex justify-end'}>
                    <TagInput realm={realm.name} />
                  </div>
              </>
          }
        </div>
        <Separator />
        <div className={'p-4 snap-top'}>
          <Card>
            <CardHeader>
              <TypographyNav text={'View Settings'}></TypographyNav>
              <CardDescription>Choose the default view. You can change it at any time.</CardDescription>
            </CardHeader>

            <CardDescription>
              <div className={'flex flex-row gap-2 p-4'}>
                <Button onClick={() => saveView('list', null, realm)}
                        variant={realm.config?.view === 'list' ? 'default' : 'ghost'}>
                  <ListBulletIcon/>
                </Button>
                <Button onClick={() => saveView('grid', null, realm)}
                        variant={realm.config?.view === 'grid' ? 'default' : 'ghost'}>
                  <GridIcon/>
                </Button>
                {Array.isArray(data) && data.map((property, key) =>
                  <div key={key} onClick={() => {
                    saveView('board', property.name, realm)
                  }}>
                    <Button
                      variant={realm.config?.view === 'board' && realm.config?.property === property.name ? 'default' : 'ghost'}>
                      <LayoutIcon/>
                    </Button>
                    <div>
                      {property.name}
                    </div>
                  </div>
                )}
              </div>
            </CardDescription>
          </Card>
        </div>
        <Separator />
        <div className={'p-4 snap-top'}>
          <Card>
            <CardHeader>
              <TypographyNav text={'Actions over Collection'}></TypographyNav>
              <CardDescription>Transform collection in specific types of realm. This configures a predefined property and view</CardDescription>
            </CardHeader>
            <CardDescription>
              <div className={'flex flex-row gap-2 p-4'}>
                <Card className={'w-[380px]'}>
                  <CardHeader>
                    <CardTitle>TODO list</CardTitle>
                    <CardDescription>This creates a group of tags PENDING/DOING/DONE which mutually exclude</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <CheckIcon className="mr-2 h-4 w-4"
                                 onClick={() => convertToTodo(realm)}
                      /> Transform to TODO list
                    </Button>
                  </CardFooter>
                </Card>
                <Card className={'w-[380px]'}>
                  <CardHeader>
                    <CardTitle>COLLECTOR list</CardTitle>
                    <CardDescription>This creates a group of tags WANT/HAVE which mutually exclude</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={'ghost'}>
                      <CheckIcon className="mr-2 h-4 w-4" /> Transform to COLLECTOR list
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardDescription>
          </Card>
        </div>
      </div>
    </div>
  </>
}

export default RealmConfig
