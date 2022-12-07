import { Edit } from '@mui/icons-material'
import { IconButton, ListItemText, MenuItem } from '@mui/material'
import { Key, useContext } from 'react'
import Realm from '../../../../../../Core/Realm/domain/Realm'
import { RealmContext } from '../../../pages/_app'

interface Props {
  active: boolean,
  realm: Realm,
  activateRealm: Function,
  activateRealmConfig: Function,
  realmKey: Key,
}

const RealmSelector = ({ active, realm, activateRealm, activateRealmConfig, realmKey }: Props) => {
  const realmContext = useContext(RealmContext)

  return <MenuItem key={realmKey} selected={realmContext.activeRealm === realm.name}>
    <ListItemText onClick={() => realmContext.setActiveRealm(realm.name)}>{realm.name}</ListItemText>
    <IconButton onClick={event => { event.preventDefault(); activateRealmConfig(realm.name) }}>
      <Edit />
    </IconButton>
  </MenuItem>
}

export default RealmSelector
