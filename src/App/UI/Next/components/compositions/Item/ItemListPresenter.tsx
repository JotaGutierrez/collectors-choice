import { useRouter } from 'next/router'
import useSWR from 'swr'
import Item from '../../../../../../Core/Item/domain/Item'
import Tag from '../../../../../../Core/Tag/domain/Tag'

const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

interface itemListPresenterProps {
  tags?: Array<Tag>;
  GroupRenderer: any;
  ItemRowRenderer: any;
  groupParams: Array<string>;
  setActiveItem: Function;
}

const ItemListPresenter = ({ tags, GroupRenderer, ItemRowRenderer, groupParams, setActiveItem }: itemListPresenterProps) => {
  const properties = Array.isArray(tags) ? [...Array.from(new Set(tags.filter(tag => tag.group !== '').map(tag => tag.group)))] : []

  const { query } = useRouter()

  const { data, error } = useSWR(['/api/item/fetch', '?filter=' + query.filter + '&realm=' + query.realm], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <GroupRenderer properties={properties} params={groupParams}>
    {data.map(function (item: Item, key: number) {
      return <ItemRowRenderer key={key} rowKey={key} item={item} tags={tags} setActiveItem={setActiveItem} properties={properties} />
    })}
  </GroupRenderer>
}

export default ItemListPresenter
