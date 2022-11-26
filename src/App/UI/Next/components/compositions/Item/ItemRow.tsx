import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Item from '../../../../../../Core/Item/domain/Item'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import Select from '../../atoms/Select'
import TagSelect from '../../atoms/TagsSelect'

interface props {
  rowKey: string;
  item: Item;
  tags: Array<Tag>;
  properties: Array<string>;
  setActiveItem: Function;
}

const ItemRow = ({ rowKey, item, tags, properties, setActiveItem }: props) => {
  const deleteItem = async (event, id) => {
    event.preventDefault()

    await fetch('/api/item/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
  }

  const saveProperty = async (item, value, property) =>
    await fetch('/api/item/setProperty', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item._id,
        property,
        value: tags.find(tag => tag.name === value)
      })
    }
    )

  return <div key={rowKey} style={{ borderBottom: '1px solid #000', padding: '1rem' }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
      <div style={{ flexGrow: '1' }}>
        <Typography>{item.name}</Typography>
      </div>
      <div>
        <IconButton onClick={() => setActiveItem(item)}>
          <Edit />
        </IconButton>
        <IconButton onClick={event => deleteItem(event, item._id)}>
          <Delete />
        </IconButton>
      </div>
    </div>
    <div><TagSelect tags={tags} item={item} /></div>
    <div><Typography>{item.notes}</Typography></div>
    {
      properties.map((property, key) => {
        const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
        return <div key={key}>
          <Select name="" onChange={event => saveProperty(item, event.target.value, property)} selected={selectedTag && selectedTag.name}>
            <option value=""></option>
            {tags.filter(tag => tag.group === property).map((tag, key) => <option key={key} value={tag.name}>{tag.name}</option>)}
          </Select>
        </div>
      })
    }
  </div >
}

export default ItemRow
