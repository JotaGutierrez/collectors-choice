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
        <div className="sm:flex sm:flex-row w-full h-full h-screen">
          <div className={`sm:max-w-xs sm:w-xs p-0 border-r h-screen w-screen ${asideContext.isOpened ? 'block' : 'hidden sm:block'}`}>
            <Drawer
              open={asideContext.isOpened}
            >
              <Aside />
            </Drawer>
          </div>
          <div className={`sm:max-w-xl p-0 border-r h-screen w-screen ${!asideContext.isOpened && !(realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config')) ? 'block' : 'hidden sm:block'}`}>
              <div>
                {realmContext.realm && <RealmView
                    realm={realmContext.realm}
                    tags={realmContext.tags ?? []}
                />}
              </div>
          </div>
          <div className={`sm:max-w-5xl h-screen w-screen ${realmContext.activeItem || (realmContext.realm && realmContext.realmPage === 'config') ? 'block' : 'hidden sm:block'}`}>
            {realmContext.activeItem && <ItemRenderer item={realmContext.activeItem} tags={realmContext.tags ?? []}/>}
            {realmContext.realm && realmContext.realmPage === 'config' && <RealmConfig realm={realmContext.realm} tags={realmContext.tags ?? []} />}
          </div>
        </div>
        <footer className="styles.footer"/>
        <AlertBag/>
      </div>
    </>
  )
}

export default Home
