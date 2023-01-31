import { Box, Paper, Select, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Autosave } from 'react-autosave'
import Item from '../../../../../../Core/Item/domain/Item'
import saveDescription from '../../../../../../Core/Item/infrastructure/Api/SaveDescription'
import saveProperty from '../../../../../../Core/Item/infrastructure/Api/SaveProperty'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import TagSelect from '../../atoms/TagsSelect'

const Page = ({ item, tags }: { item: Item, tags: Array<Tag> }) => {
  const [itemNotes, setItemNotes] = useState(null)

  const properties = new Set([...tags.filter(tag => tag.group !== '').map(tag => tag.group)])

  useEffect(() => {
    setItemNotes(item.notes)
  }, [item])

  return <>
    <Typography sx={{ mb: '1rem' }} variant={'h2'}>{item.name}</Typography>
    <Paper elevation={0} sx={{ mb: '1rem', p: '1rem' }}>
      <Box sx={{ mb: '1rem' }}>
        {tags && tags.length > 0 && <TagSelect tags={tags} item={item} />}
        {
          [...properties].map((property, key) => {
            const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
            return <div key={key}>
              <Select name="" onChange={event => saveProperty(item, event.target.value, property, tags)} selected={selectedTag && selectedTag.name}>
                <option value=""></option>
                {tags.filter(tag => tag.group === property).map((tag, key) => <option key={key} value={tag.name}>{tag.name}</option>)}
              </Select>
            </div>
          })
        }
      </Box>
      <Box>
        <TextField
          label={'Notes'}
          rows={10}
          multiline
          fullWidth
          defaultValue={itemNotes}
          onChange={(e) => setItemNotes(e.target.value)}
        />
        <Autosave data={itemNotes} onSave={event => saveDescription(event, item)}></Autosave>
      </Box>
    </Paper>
  </>
}

export default Page
