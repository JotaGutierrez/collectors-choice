
import Card from './Card'
import Grid from './Grid'
import ItemListPresenter from './ItemListPresenter'
import Tag from '../../../../../../Core/Tag/domain/Tag'

const GridView = ({ tags }: { tags: Array<Tag> }) => {
  return <ItemListPresenter setActiveItem={() => { }} tags={tags} GroupRenderer={Grid} ItemRowRenderer={Card} groupParams={[]} />
}

export default GridView
