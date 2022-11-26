import { Add, CalendarViewWeek, Close, GridView as GridViewIcon, List } from '@mui/icons-material'
import { Fab, Grid, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './ItemListPresenter.module.css'
import Item from '../../../../../../Core/Item/domain/Item'
import InputButton from '../../components/inputButton'
import BoardView from '../Item/BoardView'
import GridView from '../Item/GridView'
import ListView from '../Item/ListView'
import Page from '../Item/Page'
import InlineTags from '../Tag/InlineTags'

interface itemRendererProps {
  item: Item;
}

const ItemRenderer = ({ item }: itemRendererProps) => <div><Page item={item}></Page></div>

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

  if (query.realm === undefined) return <div>Select any realm to start...</div>

  if (query.realm === '') return <div>Select any realm to start...</div>

  return <form onSubmit={registerItem}>
    <input type="hidden" name="realm" id="realm" value={decodeURIComponent(String(query.realm))}></input>
    <InputButton name="name" placeholder="add item..." extraClassses='' />
  </form>
}

const RealmView = ({ realm, tags }) => {
  /** @TODO: Use query params instead of state, ie.: ?...&view=board&property=state */
  const [view, setView] = useState('list')
  const [property, setProperty] = useState('')
  const [showItemAdd, setShowItemAdd] = useState(false)

  const properties = new Set([...tags.filter(tag => tag.group != '').map(tag => tag.group)])

  const [activeItem, setActiveItem] = useState(null)

  return <>
    <div style={{ width: '100vw' }}>
      <div className={`${styles.list} ${activeItem ? styles.closed : styles.open}`}>
        <div style={{ padding: '1rem' }}>
          <InlineTags tags={tags} />
          <Grid>
            <IconButton onClick={() => setView('list')}>
              <List />
            </IconButton>
            <IconButton onClick={() => setView('grid')}>
              <GridViewIcon />
            </IconButton>
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
          </Grid>
        </div>
        <div>
          {tags && view === 'list' && <ListView tags={tags} setActiveItem={setActiveItem} />}
          {tags && view === 'grid' && <GridView tags={tags} />}
          {tags && view === 'board' && <BoardView tags={tags} property={property} />}
        </div>
        <div style={{ boxSizing: 'border-box', position: 'fixed', bottom: 0, width: '100vw', left: `${showItemAdd ? 0 : '100vw'}`, padding: '1rem', backgroundColor: '#fff', height: '154px', transition: 'all ease-in-out 250ms' }}>
          <ItemForm />
        </div>
      </div>
      <div className={`${styles.item} ${activeItem ? styles.open : styles.closed}`}>
        {activeItem && <ItemRenderer item={activeItem} />}
      </div>

      {activeItem && <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Fab color="primary" aria-label="add" onClick={() => setActiveItem(null)}>
          <Close />
        </Fab>
      </div>}

      {!activeItem && <div style={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Fab color="primary" aria-label="add" onClick={() => setShowItemAdd(!showItemAdd)}>
          {showItemAdd ? <Close /> : <Add />}
        </Fab>
      </div>}
    </div>
  </>
}

export default RealmView
