import Board from './Board'
import ShortCard from './ShortCard'
import UnboundDelegatedItemListPresenter from './UnboundDelegatedItemListPresenter'
import { useRealmContext } from '../../context/RealmContext'

const BoardView = () => {
  const { tags, realm } = useRealmContext()

  return <UnboundDelegatedItemListPresenter tags={tags} GroupRenderer={Board} ItemRowRenderer={ShortCard} groupParams={
    {
      property: realm.config.property,
      values: tags?.filter(tag => tag.group === realm.config.property)
    }
  } />
}

export default BoardView
