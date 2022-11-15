import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Head from 'next/head'
import useSWR from 'swr'

import Aside from '../components/layout/aside'
import RealmConfig from '../components/compositions/Realm/RealmConfig'
import RealmView from '../components/compositions/Realm/RealmView'

import styles from '../styles/Home.module.css'

interface Props {
  items?
}

/** @TODO: Refactor */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json())

const Home: NextPage<Props> = () => {
  const { query } = useRouter()

  const { data: realm, error: realmError } = useSWR(['/api/realm/fetchOne', '?name=' + query.realm], fetcher)
  const { data: tags, error } = useSWR(['/api/tag/fetch', '?realm=' + query.realm], fetcher)

  if (realmError) return <div>Failed to load</div>
  if (realm === undefined) return <div>Loading...</div>

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Collectors Choice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <aside>
          <Aside />
        </aside>

        <main>
          <h1>
            {realm && realm.name}
          </h1>

          {query.page === 'config' && <RealmConfig realm={realm} tags={tags} />}
          {query.page === '' && <RealmView realm={realm} tags={tags} />}

        </main>
      </div>

      <footer className={styles.footer} />
    </div>
  )
}

export default Home
