import Board from './Board'
import ShortCard from './ShortCard'
import UnboundDelegatedItemListPresenter from './UnboundDelegatedItemListPresenter'

const BoardView = () => {
  return <UnboundDelegatedItemListPresenter GroupRenderer={Board} ItemRowRenderer={ShortCard} />
}

export default BoardView
