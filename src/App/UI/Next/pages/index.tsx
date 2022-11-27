import { ChevronLeft, Menu } from '@mui/icons-material'
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

import RealmConfig from '../components/compositions/Realm/RealmConfig'
import RealmView from '../components/compositions/Realm/RealmView'
import Aside from '../components/layout/aside'

import styles from '../styles/Home.module.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

interface Props {
  items?
}

/** @TODO: Refactor */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

const Home: NextPage<Props> = () => {
  const { query } = useRouter()
  const [isOpened, setIsOpened] = useState(false)

  const { data: realm, error: realmError } = useSWR(['/api/realm/fetchOne', '?name=' + query.realm], fetcher, { refreshInterval: 1000 })
  const { data: tags, error } = useSWR(['/api/tag/fetch', '?realm=' + query.realm], fetcher, { refreshInterval: 1000 })

  if (realmError) return <div>Failed to load</div>
  if (realm === undefined) return <div>Loading...</div>

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <div>Loading...</div>

  return (
    <>
      <Head>
        <title>Collectors Choice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.root}>
        <Box className={styles.header}>
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => setIsOpened(!isOpened)}
              >
                {isOpened ? <ChevronLeft /> : <Menu />}
              </IconButton>
              <Typography variant="h6">
                Collectors Choice
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box className={styles.container}>
          <Drawer
            variant="permanent"
            open={isOpened}
            style={{ zIndex: 1 }}
            className={`${styles.aside} ${isOpened ? '' : styles.closed}`}
          >
            <Aside closeMenu={() => setIsOpened(false)} />
          </Drawer>
          <Box className={`${styles.main} ${isOpened ? '' : styles.closed}`} component="main">
            {query.page === 'config' && <RealmConfig realm={realm} tags={tags} />}
            {query.page === '' && <RealmView realm={realm} tags={tags} />}
          </Box>
        </Box>
        <footer className={styles.footer} />
      </Box>
    </>
  )
}

export default Home
