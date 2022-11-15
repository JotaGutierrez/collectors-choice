
import { useState } from 'react'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import Page from './Page'
import TagSelect from '../../atoms/TagsSelect'
import Modal from '../../layout/modal'

const Card = ({ rowKey, item, tags, properties }) => {
  const [showItemConfig, setItemConfig] = useState(false)

  const toggleItemConfig = () => setItemConfig(!showItemConfig)

  const saveProperty = async (item, value, property) =>
    await fetch('/api/item/setProperty', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item._id,
        property,
        value: tags.find(tag => tag.name == value)
      })
    }
    )

  return <div key={rowKey}>
    <div>
      &nbsp;
    </div>
    <form>
      <div>
        <h1>
          {item.name}
        </h1>
        <div>
          <IconButton>
            <Edit onClick={toggleItemConfig} />
          </IconButton>
        </div>
      </div>
      <div>
        <div>
          {item.notes}
        </div>
      </div>
      <div>
        <div>
          <TagSelect tags={tags} item={item} />
        </div>
      </div>
      {properties.map((property, key) => {
        const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
        return <div key={key}>
          <div>
            {tags.filter(tag => tag.group === property).map((tag, optionKey) => <label key={optionKey}>
              <input name={property} type="radio" value={tag.name} checked={selectedTag && selectedTag.name == tag.name} onChange={event => saveProperty(item, event.target.value, property)} />
              <div>
                {tag.name}
              </div>
            </label>)}
          </div>
        </div>
      })}
      {showItemConfig && <Modal title={item.name} onClose={toggleItemConfig}><Page item={item}></Page></Modal>}
    </form>
  </div>
}

export default Card
