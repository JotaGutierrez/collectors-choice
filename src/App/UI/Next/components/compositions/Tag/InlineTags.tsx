import { FilterList } from '@mui/icons-material'
import { Button, Grid, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

/** @TODO: Refactor */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

const InlineTags = ({ tags }) => {
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
  const { data: groups, error } = useSWR(['/api/tag_group/fetch', '?realm=' + query.realm], fetcher, { refreshInterval: 1000 })

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <div>Loading...</div>
  if (query.realm === '') return <div>Select any realm</div>

  return <Grid>
    <IconButton>
      <FilterList />
    </IconButton>
    {Array.isArray(tags) && tags.map(function (tag, key) {
      const active = filter.indexOf(tag.name) > -1
      return <Button variant={active ? 'contained' : ''} onClick={(event) => { event.preventDefault(); toggleFilter(tag.name) }} key={key}>{tag.name}</Button>
    })}
  </Grid>
}

export default InlineTags
