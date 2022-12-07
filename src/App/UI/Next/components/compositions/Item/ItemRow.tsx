import { Delete, Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Item from '../../../../../../Core/Item/domain/Item'
import deleteItem from '../../../../../../Core/Item/infrastructure/Api/DeleteItem'
import saveProperty from '../../../../../../Core/Item/infrastructure/Api/SaveProperty'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import Select from '../../atoms/Select'
import TagSelect from '../../atoms/TagsSelect'

interface props {
  rowKey: string;
  item: Item;
  tags?: Array<Tag>;
  properties: Array<string>;
  setActiveItem: Function;
}

const ItemRow = ({ rowKey, item, tags, properties, setActiveItem }: props) =>
  <div key={rowKey} style={{ borderBottom: '1px solid #000', padding: '1rem' }}>
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
    {tags && tags.length > 0 && <div><TagSelect tags={tags} item={item} /></div>}
    <div><Typography>{item.notes}</Typography></div>
    {
      properties.map((property, key) => {
        const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
        return <div key={key}>
          <Select name="" onChange={event => saveProperty(item, event.target.value, property, tags)} selected={selectedTag && selectedTag.name}>
            <option value=""></option>
            {tags.filter(tag => tag.group === property).map((tag, key) => <option key={key} value={tag.name}>{tag.name}</option>)}
          </Select>
        </div>
      })
    }
  </div>

export default ItemRow
