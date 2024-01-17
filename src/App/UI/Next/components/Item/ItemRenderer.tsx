import Item from '@Core/Item/domain/Item'
import Page from './Page'

interface itemRendererProps {
  item: Item;
}

const ItemRenderer = ({ item }: itemRendererProps) => <>
  <Page _item={item}></Page>
</>

export default ItemRenderer
