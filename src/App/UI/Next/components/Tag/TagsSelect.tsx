import Item from '@Core/Item/domain/Item'
import Tag from '@Core/Tag/domain/Tag'
import { useEffect, useState } from 'react'
import TagInput from './TagInput'
import { useTags } from '../../hooks/swr'
import { Badge } from '@/components/ui/badge'

interface TagSelectProps {
  item: Item;
  tags?: Array<Tag>;
  allowAdd: boolean;
}

const TagSelect = ({ item, allowAdd }: TagSelectProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const { tags, loadingTags } = useTags(item.realm)

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
    {!loadingTags && tags.map((tag, key) => <Badge
      className="w-[fit-content]"
      key={key}
      onClick={() => toggleTag(tag)}
      variant={selectedTags.filter(itemTag => tag.name === itemTag.name).length > 0 ? 'default' : 'outline'}
    >{tag.name}</Badge>)}
    {allowAdd && <TagInput realm={item.realm} />}
  </div>
}

export default TagSelect
