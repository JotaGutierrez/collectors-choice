import Item from '@Core/Item/domain/Item'
import deleteItem from '@Core/Item/infrastructure/Api/DeleteItem'
import { Delete } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { useContext } from 'react'
import { RealmContext } from '../../../pages/_app'

interface props {
  rowKey: string;
  item: Item;
}

const ItemRow = ({ rowKey, item }: props) => {
  const realmContext = useContext(RealmContext)

  return <ListItem
    key={rowKey}
    sx={{ backgroundColor: '#ffffff', mb: '2px', padding: '1rem' }}
    alignItems='flex-start'
    secondaryAction={
      <IconButton onClick={event => deleteItem(event, item._id)}>
        <Delete />
      </IconButton>
    }
  >
    <ListItemAvatar>
      <Avatar>{Array.from(item.name)[0].toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={item.name}
      secondary={item.notes?.substring(0, 40)}
      onClick={() => realmContext.setActiveItem(item)}
    />
  </ListItem>
}

export default ItemRow
