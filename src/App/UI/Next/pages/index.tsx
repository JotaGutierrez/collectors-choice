import { ChevronLeft, FilterList, Menu } from '@mui/icons-material'
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import useSWR from 'swr'

import { AsideContext, RealmContext } from './_app'
import RealmConfig from '../components/compositions/Realm/RealmConfig'
import RealmView from '../components/compositions/Realm/RealmView'
import AlertBag from '../components/layout/AlertBag'
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

  const realmContext = useContext(RealmContext)
  const asideContext = useContext(AsideContext)

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
        <AlertBag />
        <Box className={styles.header}>
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={() => asideContext.setIsOpened(!asideContext.isOpened)}
              >
                {asideContext.isOpened ? <ChevronLeft /> : <Menu />}
              </IconButton>
              <Typography variant="body1" sx={{ flexGrow: 1, fontWeight: 700 }}>
                {realmContext.activeRealm ?? 'Collectors Choice'}
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => realmContext.toggleFilterTags()}
              >
                <FilterList />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Box>
        <Box className={styles.container}>
          <Drawer
            variant="permanent"
            open={asideContext.isOpened}
            style={{ zIndex: 1 }}
            className={`${styles.aside} ${asideContext.isOpened ? '' : styles.closed}`}
          >
            <Aside closeMenu={() => asideContext.setIsOpened(false)} />
          </Drawer>
          <Box className={`${styles.main} ${asideContext.isOpened ? '' : styles.closed}`} component="main">
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
