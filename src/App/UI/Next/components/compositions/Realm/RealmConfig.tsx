import Select from '../../atoms/Select'
import InputButton from '../../components/inputButton'
import { useState } from 'react'
import useSWR from 'swr'
import { Autosave } from 'react-autosave'
import { IconButton } from '@mui/material'
import { Delete, ChevronLeft } from '@mui/icons-material'

const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

/** @TODO: Refactor. Split modules */
const RealmConfig = ({ realm, tags }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showTagGroups, setShowTagGroups] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)

  const [realmNotes, setRealmNotes] = useState(realm.notes)

  const saveTagGroup = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/tag_group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: event.target.name.value, realm: realm.name })
    })

    const result = await res.json()
  }

  const saveRealmNotes = async notes => {
    const res = await fetch('/api/realm/patch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: notes, realm })
    })

    const result = await res.json()
  }

  const saveTag = async (event) => {
    event.preventDefault()

    const res = await fetch('/api/tag/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.name.value,
        realm: event.target.realm.value,
        group: event.target.group.value
      })
    })

    const result = await res.json()
  }

  const deleteTag = async (id: string) => {
    const res = await fetch('/api/tag/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })

    const result = await res.json()
  }

  const deleteTagGroup = async (id: string) => {
    const res = await fetch('/api/tag_group/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })

    const result = await res.json()
  }

  const { data, error } = useSWR(['/api/tag_group/fetch', '?realm=' + realm.name], fetcher)

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <div>
    <div>
      <div>
        <div>
          <div>Realm description</div>
          <div>
            <IconButton onClick={() => setShowDescription(!showDescription)}>
              <ChevronLeft />
            </IconButton>
          </div>
        </div>
        {showDescription &&
          <div>
            <div>
              <textarea
                name="notes"
                id="notes"
                placeholder="Add realm notes..."
                defaultValue={realm.notes}
                onChange={e => setRealmNotes(e.target.value)}
              />
              <Autosave data={realmNotes} onSave={saveRealmNotes} />
            </div>
          </div>
        }
      </div>
      <div>
        <div>
          <div>Realm properties</div>
          <div>
            <IconButton onClick={() => setShowTagGroups(!showTagGroups)}>
              <ChevronLeft />
            </IconButton>
        </div>
        {showTagGroups && <>
          <div>
            <div>{data.map((data, groupKey) =>
              <>
                <div key={groupKey}>{data.name}</div>
                  <IconButton onClick={() => deleteTagGroup(data._id)}>
                    <Delete />
                  </IconButton>
              </>
            )}</div>
            </div>
            <form onSubmit={saveTagGroup}>
              <div>
                <div>
                  <div>
                    <InputButton name="name" placeholder="Add realm property..." />
                  </div>
                </div>
              </div>
            </form>
          </>
        }
      </div>
      <div>
        <div>
          <div>Realm tags</div>
          <div>
            <IconButton onClick={() => setShowAddTag(!showAddTag)} >
              <ChevronLeft />
            </IconButton>
          </div>
        </div>
        {showAddTag &&
          <>
            {/**
            * @TODO: Refactor tag inline component
            */}
            <div>
              <div>
                { Array.isArray(tags) && tags.map(function (tag, key) {
                  return <>
                    <button key={key}>{tag.name}</button>
                      <IconButton onClick={() => deleteTag(tag._id)}>
                        <Delete />
                      </IconButton>
                  </>
                }) }
              </div>
            </div>
            <div>
              <form onSubmit={saveTag}>
                <div>
                  <input type="hidden" name="realm" id="realm" value={realm.name}></input>
                  <div>
                    <Select name="group" onChange={null} selected={null}>
                      <option value="">(optional) property...</option>{Array.isArray(data) && data.map((group, key) => <option key={key}>{group.name}</option>)}
                    </Select>
                  </div>
                  <InputButton name="name" placeholder="Add tag..." />
                </div>
              </form>
            </div>
          </>
        }
      </div>
    </div>
    </div>
  </div>
}

export default RealmConfig
