import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Autosave } from 'react-autosave'
import Item from '../../../../../../Core/Item/domain/Item'
import saveDescription from '../../../../../../Core/Item/infrastructure/Api/SaveDescription'

const Page = ({ item }: { item: Item }) => {
  const [itemNotes, setItemNotes] = useState(item.notes)

  return <div style={{ padding: '1rem' }}>
    <Typography variant='h6'>{item.name}</Typography>
    <TextField rows={10} multiline fullWidth defaultValue={item.notes} onChange={(e) => setItemNotes(e.target.value)}></TextField>
    <Autosave data={itemNotes} onSave={event => saveDescription(event, item)}></Autosave>
  </div>
}

export default Page
