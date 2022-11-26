import ItemListPresenter from './ItemListPresenter'
import ItemRow from './ItemRow'
import Table from './Table'
import Tag from '../../../../../../Core/Tag/domain/Tag'

interface props {
  tags: Array<Tag>;
  setActiveItem: Function;
}

const ListView = ({ tags, setActiveItem }: props) =>
  <ItemListPresenter setActiveItem={setActiveItem} tags={tags} GroupRenderer={Table} ItemRowRenderer={ItemRow} groupParams={[]} />

export default ListView
