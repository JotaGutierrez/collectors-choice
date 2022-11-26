import ItemListPresenter from './ItemListPresenter'
import ItemRow from './ItemRow'
import Table from './Table'

const ListView = ({ tags, setActiveItem }) =>
    <ItemListPresenter setActiveItem={setActiveItem} tags={tags} GroupRenderer={Table} ItemRowRenderer={ItemRow} groupParams={[]} />

export default ListView
