import { Add, CalendarViewWeek, Close, FilterList, GridView as GridViewIcon, List } from '@mui/icons-material'
import { Fab, Grid, Grow, IconButton, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import styles from './ItemListPresenter.module.css'
import Item from '../../../../../../Core/Item/domain/Item'
import Realm from '../../../../../../Core/Realm/domain/Realm'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import { AlertBagContext, RealmContext } from '../../../pages/_app'
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

interface ItemFormProps {
  onSuccess: Function;
}

/** @TODO: refactor */
const ItemForm = ({ onSuccess }: ItemFormProps) => {
  const alertBag = useContext(AlertBagContext)

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
    onSuccess()
    alertBag.pushAlert(`Item guardado: ${event.target.name.value}`)
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

  const realmContext = useContext(RealmContext)

  const properties = new Set([...tags.filter(tag => tag.group !== '').map(tag => tag.group)])

  const [activeItem, setActiveItem] = useState(null)

  return <>
    <div className={styles.listContainer}>
      <div className={`${styles.list} ${activeItem ? styles.closed : styles.open}`}>
        {realmContext.showFilterTags && <div style={{ padding: '1rem' }}><InlineTags tags={tags} /></div>}
        { /*
            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
          */ }
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
          <ItemForm onSuccess={() => setShowItemAdd(false)} />
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
