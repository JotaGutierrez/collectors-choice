import ItemListPresenter from './ItemListPresenter'
import ItemRow from './ItemRow'
import Table from './Table'

const ListView = () =>
  <ItemListPresenter
    GroupRenderer={Table}
    ItemRowRenderer={ItemRow}
    groupParams={[]}
  />

export default ListView
