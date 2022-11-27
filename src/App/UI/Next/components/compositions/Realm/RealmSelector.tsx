import { Edit } from '@mui/icons-material'
import { IconButton, ListItemText, MenuItem } from '@mui/material'
import { Key } from 'react'
import Realm from '../../../../../../Core/Realm/domain/Realm'

interface Props {
  active: boolean,
  realm: Realm,
  activateRealm: Function,
  activateRealmConfig: Function,
  realmKey: Key,
}

const RealmSelector = ({ active, realm, activateRealm, activateRealmConfig, realmKey }: Props) =>
  <MenuItem key={realmKey} selected={active}>
    <ListItemText onClick={event => { event.preventDefault(); activateRealm(realm.name) }}>{realm.name}</ListItemText>
    <IconButton onClick={event => { event.preventDefault(); activateRealmConfig(realm.name) }}>
      <Edit />
    </IconButton>
  </MenuItem>

export default RealmSelector
