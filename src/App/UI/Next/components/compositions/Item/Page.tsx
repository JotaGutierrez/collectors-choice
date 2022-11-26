import { TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Autosave } from 'react-autosave'
import Item from '../../../../../../Core/Item/domain/Item'

const Page = ({ item }: { item: Item }) => {
  const [itemNotes, setItemNotes] = useState(item.notes)

  const saveDescription = async event => {
    const res = await fetch('/api/item/patch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: item._id,
        notes: event
      })
    })
  }

  return <div style={{ padding: '1rem' }}>
    <Typography variant='h6'>{item.name}</Typography>
    <TextField rows={10} multiline fullWidth defaultValue={item.notes} onChange={(e) => setItemNotes(e.target.value)}></TextField>
    <Autosave data={itemNotes} onSave={saveDescription}></Autosave>
  </div>
}

export default Page
