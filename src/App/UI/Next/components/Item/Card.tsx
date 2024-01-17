import { Key, useState } from 'react'
import Item from '../../../../../Core/Item/domain/Item'
import Tag from '../../../../../Core/Tag/domain/Tag'
import TagSelect from '../Tag/TagsSelect'
import { Button } from '@/components/ui/button'

interface props {
  rowKey: Key;
  item: Item;
  tags: Array<Tag>;
  properties: Array<string>;
}

const Card = ({ rowKey, item, tags, properties }: props) => {
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
        value: tags.find(tag => tag.name === value)
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
          <Button onClick={toggleItemConfig}>
            Edit
          </Button>
        </div>
      </div>
      <div>
        <div>
          {item.notes}
        </div>
      </div>
      <div>
        <div>
          <TagSelect tags={tags} item={item} allowAdd={false} />
        </div>
      </div>
      {properties.map((property, key) => {
        const selectedTag = (item.tags ?? [{ name: '', group: property }]).find(tag => tag.group === property)
        return <div key={key}>
          <div>
            {tags.filter(tag => tag.group === property).map((tag, optionKey) => <label key={optionKey}>
              <input name={property} type="radio" value={tag.name} checked={selectedTag && selectedTag.name === tag.name} onChange={event => saveProperty(item, event.target.value, property)} />
              <div>
                {tag.name}
              </div>
            </label>)}
          </div>
        </div>
      })}
    </form>
  </div>
}

export default Card
