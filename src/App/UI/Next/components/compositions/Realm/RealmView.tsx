import { Add, CalendarViewWeek, Close, FilterList, GridView as GridViewIcon, List } from '@mui/icons-material'
import { Fab, Grid, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './ItemListPresenter.module.css'
import Item from '../../../../../../Core/Item/domain/Item'
import Realm from '../../../../../../Core/Realm/domain/Realm'
import Tag from '../../../../../../Core/Tag/domain/Tag'
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

    await res.json()
    event.target.name.value = ''
  }

  const { query } = useRouter()

  if (query.realm === undefined) return <div>Select any realm to start...</div>

  if (query.realm === '') return <div>Select any realm to start...</div>

  return <form onSubmit={registerItem}>
    <input type="hidden" name="realm" id="realm" value={decodeURIComponent(String(query.realm))}></input>
    <InputButton name="name" placeholder="add item..." />
  </form>
}

interface props {
  realm: Realm;
  tags: Array<Tag>;
}

const RealmView = ({ realm, tags }: props) => {
  /** @TODO: Use query params instead of state, ie.: ?...&view=board&property=state */
  const [view, setView] = useState('list')
  const [property, setProperty] = useState('')
  const [showItemAdd, setShowItemAdd] = useState(false)
  const [showTagsFilter, setShowTagsFilter] = useState(true)

  const properties = new Set([...tags.filter(tag => tag.group !== '').map(tag => tag.group)])

  const [activeItem, setActiveItem] = useState(null)

  return <>
    <div className={styles.listContainer}>
      <div className={`${styles.list} ${activeItem ? styles.closed : styles.open}`}>
        <div style={{ padding: '1rem' }}>
          <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div>
              <IconButton onClick={() => setShowTagsFilter(!showTagsFilter)}>
                <FilterList />
              </IconButton>
            </div>
            <div style={{ flexGrow: 1, paddingLeft: '1rem' }}>
              <Typography variant='h6'>{realm.name}</Typography>
            </div>
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
        <div style={{ padding: '0 1rem' }}>{showTagsFilter && <InlineTags tags={tags} />}</div>
        <div>
          {view === 'list' && <ListView tags={tags} setActiveItem={setActiveItem} />}
          {view === 'grid' && <GridView tags={tags} />}
          {view === 'board' && <BoardView tags={tags} property={property} />}
        </div>
        <div style={{
          zIndex: 1,
          boxSizing: 'border-box',
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          left: `${showItemAdd ? 0 : '100vw'}`,
          padding: '1rem',
          backgroundColor: '#fff',
          height: '154px',
          transition: 'all ease-in-out 250ms',
          textAlign: 'right'
        }}>
          <ItemForm />
        </div>
      </div>
      <div className={`${styles.item} ${activeItem ? styles.open : styles.closed}`}>
        {activeItem && <ItemRenderer item={activeItem} />}
      </div>

      {activeItem && <div style={{ zIndex: 2, position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Fab color="primary" aria-label="add" onClick={() => setActiveItem(null)}>
          <Close />
        </Fab>
      </div>}

      {!activeItem && <div style={{ zIndex: 2, position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Fab color="primary" aria-label="add" onClick={() => setShowItemAdd(!showItemAdd)}>
          {showItemAdd ? <Close /> : <Add />}
        </Fab>
      </div>}
    </div>
  </>
}

export default RealmView
