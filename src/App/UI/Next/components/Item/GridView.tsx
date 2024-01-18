import Card from './Card'
import Grid from './Grid'
import ItemListPresenter from './ItemListPresenter'

const GridView = () => {
  return <ItemListPresenter GroupRenderer={Grid} ItemRowRenderer={Card} groupParams={[]} />
}

export default GridView
