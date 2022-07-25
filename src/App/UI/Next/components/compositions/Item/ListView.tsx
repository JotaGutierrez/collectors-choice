
import ItemListPresenter from './ItemListPresenter';
import Table from './Table';
import ItemRow from './ItemRow';

const ListView = ({tags}) =>
    <ItemListPresenter tags={tags} GroupRenderer={Table} ItemRenderer={ItemRow} groupParams={[]} />

export default ListView;
