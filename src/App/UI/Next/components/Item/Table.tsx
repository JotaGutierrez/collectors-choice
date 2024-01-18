import { ReactNodeArray } from 'prop-types'

interface TableInterface {
  children: ReactNodeArray
}

const Table = ({ children }: TableInterface) => <div className={'flex flex-col gap-2'}>
  {children}
</div>

export default Table
