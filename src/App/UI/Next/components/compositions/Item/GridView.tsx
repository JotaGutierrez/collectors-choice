
import ItemListPresenter from './ItemListPresenter'
import Grid from './Grid'
import Card from './Card'

const GridView = ({ tags }) => {
  return <ItemListPresenter tags={tags} GroupRenderer={Grid} ItemRenderer={Card} groupParams={[]} />
}

export default GridView
