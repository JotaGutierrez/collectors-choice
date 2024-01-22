import Tag from '@Core/Tag/domain/Tag'
import { useRealmContext } from '../../context/RealmContext'
import { useItems } from '../../hooks/swr'
import { Skeleton } from '@/components/ui/skeleton'

interface props {
  GroupRenderer: any;
  ItemRowRenderer: any;
}

const UnboundDelegatedItemListPresenter = ({ GroupRenderer, ItemRowRenderer }: props) => {
  const {
    tags,
    realm,
    filter
  } = useRealmContext() || {}
  const { items, loading } = useItems(realm?.name ?? '', filter ?? [])
  const properties = tags ? Array.from(new Set(tags.filter((tag: Tag) => tag.group === realm?.config?._property ?? ''))) : []

  return loading
    ? <Skeleton />
    : <GroupRenderer properties={properties} params={{
      property: realm?.config?._property,
      values: properties
    }} items={items} ItemRowRenderer={ItemRowRenderer} tags={tags} />
}

export default UnboundDelegatedItemListPresenter
