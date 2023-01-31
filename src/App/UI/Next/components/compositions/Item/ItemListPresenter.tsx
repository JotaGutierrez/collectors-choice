import { useContext } from 'react'
import Item from '../../../../../../Core/Item/domain/Item'
import Tag from '../../../../../../Core/Tag/domain/Tag'
import { RealmContext } from '../../../pages/_app'

interface itemListPresenterProps {
  tags?: Array<Tag>;
  GroupRenderer: any;
  ItemRowRenderer: any;
  groupParams: Array<string>;
}

const ItemListPresenter = ({ tags, GroupRenderer, ItemRowRenderer, groupParams }: itemListPresenterProps) => {
  const properties = Array.isArray(tags) ? [...Array.from(new Set(tags.filter(tag => tag.group !== '').map(tag => tag.group)))] : []

  const realmContext = useContext(RealmContext)

  return <GroupRenderer properties={properties} params={groupParams}>
    {realmContext.items && realmContext.items.map(function (item: Item, key: number) {
      return <ItemRowRenderer key={key} rowKey={key} item={item} tags={tags} properties={properties} />
    })}
  </GroupRenderer>
}

export default ItemListPresenter
