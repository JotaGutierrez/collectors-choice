import fetcher from '@Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '@Core/Tag/domain/Tag'
import { useContext } from 'react'
import useSWR from 'swr'
import { RealmContext } from '../../../pages/_app'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

interface props {
  tags: Array<Tag>;
}

const InlineTags = ({ tags }: props) => {
  const realmContext = useContext(RealmContext)
  const setFilter = realmContext.setFilter

  const toggleFilter = tag => {
    const index = realmContext.filter?.indexOf(tag)

    if (index > -1) {
      realmContext.filter?.splice(index, 1)
      setFilter([...realmContext.filter ?? []].sort())
    } else {
      setFilter([...realmContext.filter ?? [], tag].sort())
    }
  }

  /** @TODO: Use groups to visually group properties */
  // eslint-disable-next-line no-unused-vars
  const { data: groups, error } = useSWR('/api/tag_group/fetch?realm=' + realmContext.activeRealm, fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <Skeleton />

  return <div className={'flex flex-row gap-2 justify-end'}>
    {Array.isArray(tags) && tags.map((tag, key) =>
      <Badge
        key={key}
        variant={realmContext.filter?.indexOf(tag.name) > -1 ? 'default' : 'outline'}
        onClick={(event) => { event.preventDefault(); toggleFilter(tag.name) }}
      >{tag.name}</Badge>
    )}
  </div>
}

export default InlineTags
