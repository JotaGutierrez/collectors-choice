import { NextPage } from 'next'

import Head from 'next/head'
import { useContext } from 'react'

import { AsideContext, RealmContext } from './_app'
import ItemRenderer from '../components/compositions/Item/ItemRenderer'
import RealmConfig from '../components/compositions/Realm/RealmConfig'
import RealmView from '../components/compositions/Realm/RealmView'
import AlertBag from '../components/layout/AlertBag'
import Aside from '../components/layout/Aside'

import { Drawer } from '@/components/ui/drawer'

interface Props {
  items?: any
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
      <div className="w-full data-[panel-group-direction=vertical]:flex-col h-screen items-stretch relative min-h-screen">
        <div className="grid w-full h-full grid-cols-4 sm:grid-cols-12 h-screen">
          {asideContext.isOpened &&
          <div className={`col-span-4 sm:col-span-2 p-0 border-r h-screen ${asideContext.isOpened ? 'open' : 'close'}`}>
            <Drawer
              open={asideContext.isOpened}
            >
              <Aside />
            </Drawer>
          </div>
          }
          {!asideContext.isOpened && !(realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config')) &&
          <div className={`col-span-4 sm:col-span-4 p-0 border-r h-screen ${!asideContext.isOpened && !(realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config')) ? 'open' : 'close'}`}>
              <div>
                {realmContext.realm && <RealmView
                    realm={realmContext.realm}
                    tags={realmContext.tags ?? []}
                />}
              </div>
          </div>}
          {(realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config')) &&
          <div className={`col-span-4 sm:col-span-6 h-screen ${realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config') ? 'open' : 'close'}`}>
            {realmContext.activeItem && <ItemRenderer item={realmContext.activeItem} tags={realmContext.tags ?? []}/>}
            {realmContext.realm && realmContext.realmPage === 'config' && <RealmConfig realm={realmContext.realm} tags={realmContext.tags ?? []} />}
          </div>}
        </div>
        <footer className="styles.footer"/>
        <AlertBag/>
      </div>
    </>
  )
}

export default Home
