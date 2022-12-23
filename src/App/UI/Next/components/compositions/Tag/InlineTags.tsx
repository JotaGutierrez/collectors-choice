import { Chip, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../../../../../../Core/Shared/Infrastructure/Http/Fetcher'
import Tag from '../../../../../../Core/Tag/domain/Tag'

interface props {
  tags: Array<Tag>
}

const InlineTags = ({ tags }: props) => {
  const router = useRouter()
  const [filter, setFilter] = useState([])

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.filter === encodeURIComponent(JSON.stringify(filter))) return

    router.query.filter = encodeURIComponent(JSON.stringify(filter))

    router.push(
      {
        pathname: router.route,
        query: { ...router.query }
      }
    )
  }, [filter, router])

  const toggleFilter = tag => {
    const index = filter.indexOf(tag)

    if (index > -1) {
      filter.splice(index, 1)
      setFilter([...filter].sort())
    } else {
      setFilter([...filter, tag].sort())
    }
  }

  const { query } = useRouter()

  /** @TODO: Use groups to visually group properties */
  // eslint-disable-next-line no-unused-vars
  const { data: groups, error } = useSWR(['/api/tag_group/fetch', '?realm=' + query.realm], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <div>Loading...</div>
  if (query.realm === '') return <div>Select any realm</div>

  return <Grid container columnSpacing={1}>
    {Array.isArray(tags) && tags.map((tag, key) => <Grid key={key} item>
      <Chip
        variant={filter.indexOf(tag.name) > -1 ? 'filled' : 'outlined'}
        onClick={(event) => { event.preventDefault(); toggleFilter(tag.name) }}
        label={tag.name}
      />
    </Grid>
    )}
  </Grid>
}

export default InlineTags
