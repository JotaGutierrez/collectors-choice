import { NextPage } from "next";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import useSWR from "swr";
import { useRouter } from "next/router";
import Aside from '../components/layout/aside';
import RealmConfig from '../components/compositions/Realm/RealmConfig';
import RealmView from '../components/compositions/Realm/RealmView';

interface Props{
  items?
}

/** @TODO: Refactor */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json());

const Home: NextPage<Props> = () => {
  const { query } = useRouter();

  const { data: realm, error: realmError } = useSWR(['/api/realm/fetchOne', '?name=' + query.realm], fetcher);
  const { data: tags, error } = useSWR(['/api/tag/fetch', '?realm=' + query.realm], fetcher);

  if (realmError) return <div>Failed to load</div>
  if (realm === undefined) return <div>Loading...</div>

  if (error) return <div>Failed to load</div>
  if (tags === undefined) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Lotion - the dumb cousin</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className='grid md:grid-cols-12 xl:grid-cols-12 gap-5 p-0 m-2'>
        <aside className='md:col-span-3 xl:col-span-2 md:pt-0 p-0 border-1 border-gray-100'>
          <Aside />
        </aside>

        <main className='md:col-span-9 xl:col-span-10 xl:col-start-3 p-4'>
          <h1 className="text-3xl font-bold underline">
            {realm && realm.name}
          </h1>

          { query.page === 'config' && <RealmConfig realm={realm} tags={tags} /> }
          { query.page === '' && <RealmView realm={realm} tags={tags} /> }

        </main>
      </div>

      <footer className={styles.footer} />
    </div>
  )
}

export default Home;
