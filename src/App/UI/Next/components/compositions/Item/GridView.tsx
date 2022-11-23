
import Card from './Card'
import Grid from './Grid'
import ItemListPresenter from './ItemListPresenter'

const GridView = ({ tags }) => {
  return <ItemListPresenter tags={tags} GroupRenderer={Grid} ItemRenderer={Card} groupParams={[]} />
}

export default GridView
