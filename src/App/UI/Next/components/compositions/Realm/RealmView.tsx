import { Add, CalendarViewWeek, Close, GridView as GridViewIcon, List } from '@mui/icons-material'
import { Box, Fab, Grid, IconButton, Paper } from '@mui/material'
import { useContext, useState } from 'react'
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
  tags: Array<Tag>;
}

const ItemRenderer = ({ item, tags }: itemRendererProps) => <Paper elevation={0} sx={{ p: '1rem' }}>
  <Page item={item} tags={tags}></Page>
</Paper>

interface ItemFormProps {
  onSuccess: Function;
  activeRealm: String;
}

/** @TODO: refactor */
const ItemForm = ({ onSuccess, activeRealm }: ItemFormProps) => {
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

  return <form onSubmit={registerItem}>
    <input type="hidden" name="realm" id="realm" value={activeRealm}></input>
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

  return <>
    <Grid container sx={{ height: 'calc(100vh - var(--header-height))', overflowX: 'scroll' }}>
      <Grid item xs={12} sx={{ borderBottom: '1px solid rgba(0,0,0,.12)' }}>
        {realmContext.showFilterTags && <div style={{ padding: '1rem' }}><InlineTags tags={tags} /></div>}
      </Grid>
      <Grid item xs={12} md={4} sx={{ backgroundColor: '#f5f5f5', height: `calc(100vh - var(--header-height) - ${realmContext.showFilterTags ? '65px' : '0px'} - 73px)`, overflowX: 'scroll' }} className={`${styles.list} ${realmContext.activeItem ? styles.closed : styles.open}`}>
        {view === 'list' && <ListView />}
        {view === 'grid' && <GridView tags={tags} />}
        {view === 'board' && <BoardView tags={tags} property={property} />}
      </Grid>
      <Grid item xs={12} md={8} className={`${styles.item} ${realmContext.activeItem ? styles.open : styles.closed}`}>
        {realmContext.activeItem && <ItemRenderer item={realmContext.activeItem} tags={tags} />}
      </Grid>
      <Grid item xs={12} sx={{ p: '1rem', borderTop: '1px solid rgba(0,0,0,.12)' }}>
        <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} spacing={2}>
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
      </Grid>
    </Grid>

    <Box sx={{
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
      <ItemForm onSuccess={() => setShowItemAdd(false)} activeRealm={realmContext.activeRealm} />
    </Box>

    {realmContext.activeItem && <div style={{ zIndex: 2, position: 'fixed', bottom: '1rem', right: '1rem' }}>
      <Fab color="primary" aria-label="add" onClick={() => realmContext.setActiveItem(null)}>
        <Close />
      </Fab>
    </div>}

    {!realmContext.activeItem && <div style={{ zIndex: 2, position: 'fixed', bottom: '1rem', right: '1rem' }}>
      <Fab color="primary" aria-label="add" onClick={() => setShowItemAdd(!showItemAdd)}>
        {showItemAdd ? <Close /> : <Add />}
      </Fab>
    </div>}
  </>
}

export default RealmView
