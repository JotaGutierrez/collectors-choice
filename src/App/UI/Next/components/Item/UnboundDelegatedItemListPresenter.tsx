import Tag from '@Core/Tag/domain/Tag'
import { useRealmContext } from '../../context/RealmContext'
import { useItems } from '../../hooks/swr'
import { Skeleton } from '@/components/ui/skeleton'

interface props {
  tags: Array<Tag>;
  GroupRenderer: any;
  ItemRowRenderer: any;
  groupParams: any;
}

const UnboundDelegatedItemListPresenter = ({ tags, GroupRenderer, ItemRowRenderer, groupParams }: props) => {
  const properties = Array.isArray(tags) ? [...Array.from(new Set(tags.filter(tag => tag.group !== '').map(tag => tag.group)))] : []

  const realmContext = useRealmContext()
  const { items, loading } = useItems(realmContext?.activeRealm ?? '', realmContext?.filter ?? [])

  return loading
    ? <Skeleton />
    : <GroupRenderer properties={properties} params={groupParams} items={items} ItemRowRenderer={ItemRowRenderer} tags={tags} />
}

export default UnboundDelegatedItemListPresenter
