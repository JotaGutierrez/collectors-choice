import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const UnboundDelegatedItemListPresenter = ({ tags, GroupRenderer, ItemRowRenderer, groupParams }) => {
  const properties = Array.isArray(tags) ? [...Array.from(new Set(tags.filter(tag => tag.group != '').map(tag => tag.group)))] : []

  const { query } = useRouter()

  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('/api/item/fetch?filter=' + query.filter + '&realm=' + query.realm)
      .then(res => res.json())
      .then(data => {
        setItems(data)
      }).catch((e) => { console.log(e) })
  }, [query])

  return items
    ? <GroupRenderer properties={properties} params={groupParams} items={items} ItemRowRenderer={ItemRowRenderer} tags={tags} />
    : <>Loading...</>
}

export default UnboundDelegatedItemListPresenter
