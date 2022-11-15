
import { Multiselect } from 'multiselect-react-dropdown'
import Item from '../../../../../Core/Item/domain/Item'

interface TagSelectProps {
    item: Item,
    tags?
}

const TagSelect = ({ item, tags } : TagSelectProps) => {
  const saveTags = async tags => await fetch('/api/item/setTags', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: item._id,
      tags
    })
  })

  const onSelect = async event => {
    event.preventDefault()
    saveTags(event)
  }

  const onRemove = async event => {
    event.preventDefault()
    saveTags(event)
  }

  return <Multiselect
      style={{ border: 0 }}
      options={tags.filter((tag: { group: string; }) => tag.group == '')}
      selectedValues={item.tags ?? []}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue="name"
    />
}

export default TagSelect
