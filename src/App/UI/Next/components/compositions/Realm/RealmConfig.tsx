import { ChevronLeft } from '@mui/icons-material'
import { Chip, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Autosave } from 'react-autosave'
import useSWR from 'swr'
import Realm from '../../../../../../Core/Realm/domain/Realm'
import saveRealmNotes from '../../../../../../Core/Realm/infrastructure/Api/SaveRealmNotes'
import fetcher from '../../../../../../Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import saveTag from '../../../../../../Core/Tag/infrastructure/Api/CreateTagGroup'
import deleteTag from '../../../../../../Core/Tag/infrastructure/Api/DeleteTag'
import deleteTagGroup from '../../../../../../Core/TagGroup/application/DeleteTagGroup'
import saveTagGroup from '../../../../../../Core/TagGroup/infrastructure/Api/CreateTagGroup'
import InputButton from '../../components/inputButton'

interface props {
  realm: Realm;
  tags: Array<Tag>;
}

/** @TODO: Refactor. Split modules */
const RealmConfig = ({ realm, tags }: props) => {
  const [showDescription, setShowDescription] = useState(false)
  const [showTagGroups, setShowTagGroups] = useState(false)
  const [showAddTag, setShowAddTag] = useState(false)

  const [realmNotes, setRealmNotes] = useState(realm.notes)

  const { data, error } = useSWR(['/api/tag_group/fetch', '?realm=' + realm.name], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <Grid style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
    <div>
      <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Grid item style={{ flexGrow: 1 }}>
          <Typography>Realm description</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setShowDescription(!showDescription)}>
            <ChevronLeft />
          </IconButton>
        </Grid>
      </Grid>
      {showDescription &&
        <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <TextField
            minRows={5}
            multiline
            fullWidth
            name="notes"
            id="notes"
            placeholder="Add realm notes..."
            defaultValue={realm.notes}
            onChange={e => setRealmNotes(e.target.value)}
          />
          <Autosave data={realmNotes} onSave={event => saveRealmNotes(event, realm)} />
        </Grid>
      }
    </div>
    <div>
      <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Grid item sx={{ flexGrow: 1 }}>
          <Typography>Realm properties</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setShowTagGroups(!showTagGroups)}>
            <ChevronLeft />
          </IconButton>
        </Grid>
      </Grid>
      {showTagGroups && <>
        <Grid style={{ display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem 0' }}>
          {data.map((data, groupKey) => <Chip key={groupKey} label={data.name} variant='outlined' onDelete={() => deleteTagGroup(data._id)} />)}
        </Grid>
        <form onSubmit={event => saveTagGroup(event, realm)}>
          <InputButton name="name" placeholder="Add realm property..." />
        </form>
      </>
      }
    </div>
    <div>
      <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Grid item style={{ flexGrow: 1 }}>
          <Typography>Realm tags</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setShowAddTag(!showAddTag)} >
            <ChevronLeft />
          </IconButton>
        </Grid>
      </Grid>
      {showAddTag &&
        <>
          {/**
              * @TODO: Refactor tag inline component
              */}
          <Grid style={{ display: 'flex', flexDirection: 'row', gap: '1rem', padding: '1rem 0' }}>
            {Array.isArray(tags) && tags.map((tag, key) =>
              <Chip key={key} label={tag.name} variant='outlined' onDelete={() => deleteTag(tag._id)} />
            )}
          </Grid>
          <form onSubmit={saveTag}>
            <input type="hidden" name="realm" id="realm" value={realm.name}></input>
            <Select fullWidth name="group" onChange={null} placeholder='Optional property group'>
              {Array.isArray(data) && data.map((group, key) => <MenuItem key={key}>{group.name}</MenuItem>)}
            </Select>
            <InputButton name="name" placeholder="Add tag..." />
          </form>
        </>
      }
    </div>
  </Grid >
}

export default RealmConfig
