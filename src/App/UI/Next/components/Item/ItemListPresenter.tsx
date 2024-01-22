import Item from '@Core/Item/domain/Item'
import { useRealmContext } from '../../context/RealmContext'
import { useItems } from '../../hooks/swr'
import { Skeleton } from '@/components/ui/skeleton'

interface itemListPresenterProps {
  GroupRenderer: any;
  ItemRowRenderer: any;
  groupParams: Array<string>;
}

const ItemListPresenter = ({ GroupRenderer, ItemRowRenderer, groupParams }: itemListPresenterProps) => {
  const { tags } = useRealmContext() || {}
  const properties = Array.isArray(tags) ? [...Array.from(new Set(tags.filter(tag => tag.group !== '').map(tag => tag.group)))] : []

  const realmContext = useRealmContext()
  const { items, loading } = useItems(realmContext?.activeRealm ?? '', realmContext?.filter ?? [])

  return loading
    ? <Skeleton />
    : <GroupRenderer properties={properties} params={groupParams}>
    {!!items && items.map(function (item: Item, key: number) {
      return <ItemRowRenderer key={key} rowKey={key} item={item} tags={tags} properties={properties} />
    })}
  </GroupRenderer>
}

export default ItemListPresenter
