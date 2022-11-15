import ItemListPresenter from './ItemListPresenter'
import ItemRow from './ItemRow'
import Table from './Table'

const ListView = ({ tags }) =>
    <ItemListPresenter tags={tags} GroupRenderer={Table} ItemRenderer={ItemRow} groupParams={[]} />

export default ListView
