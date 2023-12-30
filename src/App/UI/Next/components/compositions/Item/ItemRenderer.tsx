import Item from '@Core/Item/domain/Item'
import Tag from '@Core/Tag/domain/Tag'
import Page from './Page'

interface itemRendererProps {
  item: Item;
  tags: Array<Tag>;
}

const ItemRenderer = ({ item, tags }: itemRendererProps) => <>
  <Page item={item} tags={tags}></Page>
</>

export default ItemRenderer
