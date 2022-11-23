import { Edit } from '@mui/icons-material'
import { IconButton, ListItemText, MenuItem } from '@mui/material'

interface Props {
  active,
  realm,
  activateRealm,
  activateRealmConfig,
  realmKey,
}

const RealmSelector = ({ active, realm, activateRealm, activateRealmConfig, realmKey }: Props) =>
  <MenuItem key={realmKey}>
    <ListItemText>
      <a onClick={event => { event.preventDefault(); activateRealm(realm.name) }}>{realm.name}</a>
    </ListItemText>
    <IconButton onClick={event => { event.preventDefault(); activateRealmConfig(realm.name) }}>
      <Edit />
    </IconButton>
  </MenuItem>

export default RealmSelector
