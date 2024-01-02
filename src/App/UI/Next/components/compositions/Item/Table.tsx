import TagGroup from '@Core/TagGroup/domain/TagGroup'
import { ReactNodeArray } from 'prop-types'

interface TableInterface {
  properties?: Array<TagGroup>;
  groupParams: Array<string>;
  children: ReactNodeArray
}

const Table = ({ properties, groupParams, children }: TableInterface) => <div className={'flex flex-col gap-2'}>
  {children}
</div>

export default Table
