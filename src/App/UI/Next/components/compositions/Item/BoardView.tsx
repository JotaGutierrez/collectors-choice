
import Board from './Board';
import ShortCard from './ShortCard';
import UnboundDelegatedItemListPresenter from './UnboundDelegatedItemListPresenter';

const BoardView = ({tags, property}) =>
{
    return <UnboundDelegatedItemListPresenter tags={tags} GroupRenderer={Board} ItemRenderer={ShortCard} groupParams={
        {
            property: property,
            values: tags.filter(tag => tag.group == property)
        }
    } />
}

export default BoardView;
