import { Multiselect } from 'multiselect-react-dropdown'
import * as React from 'react'
import Item from '../../../../../Core/Item/domain/Item'
import Tag from '../../../../../Core/Tag/domain/Tag'

interface TagSelectProps {
  item: Item;
  tags?: Array<Tag>;
}

const TagSelect = ({ item, tags }: TagSelectProps) => {
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

  const onSelect = async event => saveTags(event)

  const onRemove = async event => saveTags(event)

  return <Multiselect
    style={{ border: 0 }}
    options={tags.filter((tag: { group: string; }) => tag.group === '')}
    selectedValues={item.tags ? item.tags.filter(tag => tag !== null) : []}
    onSelect={onSelect}
    onRemove={onRemove}
    displayValue="name"
  />
}

export default TagSelect
