import { ChevronLeft, FilterList, Menu } from '@mui/icons-material'
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { NextPage } from 'next'

import Head from 'next/head'
import { useContext } from 'react'

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

const Home: NextPage<Props> = () => {
  const realmContext = useContext(RealmContext)
  const asideContext = useContext(AsideContext)

  return (
    <>
      <Head>
        <title>Collectors Choice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.root}>
        <AlertBag />
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
        <Box className={styles.container}>
          <Box sx={{ height: 'calc(100vh - var(--header-height))', overflowX: 'scroll' }}>
            <Drawer
              variant="permanent"
              open={asideContext.isOpened}
              style={{ zIndex: 1 }}
              className={`${styles.aside} ${asideContext.isOpened ? '' : styles.closed}`}
            >
              <Aside closeMenu={() => asideContext.setIsOpened(false)} />
            </Drawer>
          </Box>
          <Box className={`${styles.main} ${asideContext.isOpened ? '' : styles.closed}`} component="main">
            <Box sx={{ height: 'calc(100vh - var(--header-height))', overflowX: 'scroll' }}>
              {realmContext.realm && realmContext.realmPage === 'config' && <RealmConfig realm={realmContext.realm} tags={realmContext.tags ?? []} />}
              {realmContext.realm && <RealmView realm={realmContext.realm} tags={realmContext.tags ?? []} />}
            </Box>
          </Box>
        </Box>
        <footer className={styles.footer} />
      </Box>
    </>
  )
}

export default Home
