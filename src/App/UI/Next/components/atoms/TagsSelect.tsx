import { Chip, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import Item from '../../../../../Core/Item/domain/Item'
import Tag from '../../../../../Core/Tag/domain/Tag'

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
    saveTags(_tags)
    setSelectedTags(_tags)
  }

  return <Stack direction="row" spacing={1}>
    {tags.map((tag, key) => <Chip
      key={key}
      label={tag.name}
      onClick={() => toggleTag(tag)}
      variant={selectedTags.filter(itemTag => tag.name === itemTag.name).length > 0 ? 'filled' : 'outlined'}
    />)}
  </Stack>
}

export default TagSelect
