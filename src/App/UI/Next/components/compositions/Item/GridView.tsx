import Tag from '@Core/Tag/domain/Tag'
import Card from './Card'
import Grid from './Grid'
import ItemListPresenter from './ItemListPresenter'

const GridView = ({ tags }: { tags: Array<Tag> }) => {
  return <ItemListPresenter tags={tags} GroupRenderer={Grid} ItemRowRenderer={Card} groupParams={[]} />
}

export default GridView
