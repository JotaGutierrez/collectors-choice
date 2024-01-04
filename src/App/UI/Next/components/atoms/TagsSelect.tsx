import Item from '@Core/Item/domain/Item'
import Tag from '@Core/Tag/domain/Tag'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface TagSelectProps {
  item: Item;
  tags?: Array<Tag>;
}

const TagSelect = ({ item, tags }: TagSelectProps) => {
  const [selectedTags, setSelectedTags] = useState([])

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

  useEffect(() => setSelectedTags(item.tags ?? []), [item])

  const toggleTag = async tag => {
    const _tags = selectedTags.includes(tag) ? selectedTags.filter(selectedTag => selectedTag.name !== tag.name) : [...selectedTags, tag]
    await saveTags(_tags)
    setSelectedTags(_tags)
  }

  return <div className={'flex flex-row gap-2'}>
    {!!tags && tags.map((tag, key) => <Badge
      key={key}
      onClick={() => toggleTag(tag)}
      variant={selectedTags.filter(itemTag => tag.name === itemTag.name).length > 0 ? 'default' : 'outline'}
    >{tag.name}</Badge>)}
  </div>
}

export default TagSelect
