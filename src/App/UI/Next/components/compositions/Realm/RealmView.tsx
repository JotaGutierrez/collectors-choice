import { useState } from 'react'
import { useRouter } from 'next/router'
import InputButton from '../../components/inputButton'
import BoardView from '../Item/BoardView'
import GridView from '../Item/GridView'
import ListView from '../Item/ListView'
import InlineTags from '../Tag/InlineTags'
import { IconButton } from '@mui/material'
import { List, GridView as GridViewIcon, CalendarViewWeek } from '@mui/icons-material'

/** @TODO: refactor */
const ItemForm = () => {
  const registerItem = async event => {
    event.preventDefault()

    const res = await fetch('/api/item/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.name.value,
        realm: event.target.realm.value
      })
    })

    const result = await res.json()
    event.target.name.value = ''
  }

  const { query } = useRouter()

  if (query.realm == undefined) return <div>Select any realm to start...</div>

  if (query.realm == '') return <div>Select any realm to start...</div>

  return <form onSubmit={registerItem}>
    <input type="hidden" name="realm" id="realm" value={decodeURIComponent(String(query.realm))}></input>
    <InputButton name="name" placeholder="add item..." extraClassses='' />
  </form>
}

const RealmView = ({ realm, tags }) => {
  /** @TODO: Use query params instead of state, ie.: ?...&view=board&property=state */
  const [view, setView] = useState('list')
  const [property, setProperty] = useState('')

  const properties = new Set([...tags.filter(tag => tag.group != '').map(tag => tag.group)])

  return <>
    <InlineTags tags={tags} />
    <div>
      <div>
          <div>
            <IconButton onClick={() => setView('list')}>
              <List />
            </IconButton>
          </div>
          <div>
            <IconButton onClick={() => setView('grid')}>
              <GridViewIcon />
            </IconButton>
          </div>
          {[...Array.from(properties)].map((_property, key) =>
            <div key={key} onClick={() => { setView('board'); setProperty(_property) }}>
              <IconButton>
                <CalendarViewWeek />
              </IconButton>
              <div>
                {_property}
              </div>
            </div>
          )}
      </div>
      <div>
          <ItemForm />
      </div>
    </div>
    <div>
      { tags && view == 'list' && <ListView tags={tags} /> }
      { tags && view == 'grid' && <GridView tags={tags} /> }
      { tags && view == 'board' && <BoardView tags={tags} property={property} /> }
    </div>
  </>
}

export default RealmView
