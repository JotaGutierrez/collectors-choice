import Realm from '@Core/Realm/domain/Realm'
import { Key } from 'react'
import { useRealmContext } from '../../../context/RealmContext'
import { TypographyNav } from '../../atoms/Typography'

interface Props {
  realm: Realm,
  activateRealm: Function,
  realmKey: Key,
}

const RealmSelector = ({ realm, activateRealm, realmKey }: Props) => {
  const realmContext = useRealmContext()

  return <div
    key={realmKey}
    className={`flex flex-row items-center rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-700 ${realmContext?.activeRealm === realm.name ? 'bg-primary text-white hover:text-foreground' : ''}`}
  >
    <TypographyNav
      className='grow'
      onClick={event => { event.preventDefault(); activateRealm(realm.name) }}
      text={realm.name}
    />
    <TypographyNav text={realm.itemCount} className="" />
  </div>
}

export default RealmSelector
