'use client'

import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ItemRenderer from '../components/compositions/Item/ItemRenderer'
import RealmConfig from '../components/compositions/Realm/RealmConfig'
import RealmView from '../components/compositions/Realm/RealmView'
import Aside from '../components/layout/Aside'

import { useRealmContext } from '../context/RealmContext'
import { Drawer } from '@/components/ui/drawer'

const Page: NextPage = () => {
  const realmContext = useRealmContext()
  const { data: session } = useSession()

  if (!session) {
    return redirect('/login')
  }

  return (
    <>
      <div className="w-full data-[panel-group-direction=vertical]:flex-col h-dvh items-stretch relative min-h-dvh">
        <div className="sm:flex sm:flex-row w-full h-full h-dvh">
          <div className={`sm:max-w-xs sm:w-xs p-0 border-r h-dvh w-screen ${realmContext?.isOpened ? 'block' : 'hidden sm:block'}`}>
            <Drawer
              open={realmContext?.isOpened}
            >
              <Aside />
            </Drawer>
          </div>
          <div className={`sm:max-w-xl p-0 border-r h-dvh w-screen ${!realmContext?.isOpened && !(realmContext?.activeItem || (realmContext?.realm && realmContext?.realmPage === 'config')) ? 'block' : 'hidden sm:block'}`}>
            <div>
              {realmContext?.realm && <RealmView
                  realm={realmContext?.realm}
              />}
            </div>
          </div>
          <div className={`sm:max-w-5xl h-dvh w-screen ${realmContext?.activeItem || (realmContext?.realm && realmContext?.realmPage === 'config') ? 'block' : 'hidden sm:block'}`}>
            {realmContext?.activeItem && <ItemRenderer item={realmContext?.activeItem} />}
            {realmContext?.realm && realmContext?.realmPage === 'config' && <RealmConfig realm={realmContext?.realm} tags={realmContext?.tags ?? []} />}
          </div>
        </div>
        <footer className="styles.footer"/>
      </div>
    </>
  )
}

export default Page
