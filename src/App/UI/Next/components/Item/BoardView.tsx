import Tag from '@Core/Tag/domain/Tag'
import Board from './Board'
import ShortCard from './ShortCard'
import UnboundDelegatedItemListPresenter from './UnboundDelegatedItemListPresenter'

interface props {
  tags: Array<Tag>;
  property: string;
}

const BoardView = ({ tags, property }: props) => {
  return <UnboundDelegatedItemListPresenter tags={tags} GroupRenderer={Board} ItemRowRenderer={ShortCard} groupParams={
    {
      property,
      values: tags.filter(tag => tag.group === property)
    }
  } />
}

export default BoardView
