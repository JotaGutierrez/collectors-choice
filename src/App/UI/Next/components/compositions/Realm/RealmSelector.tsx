import Realm from '@Core/Realm/domain/Realm'
import { Key, useContext } from 'react'
import { RealmContext } from '../../../pages/_app'
import { TypographyNav } from '../../atoms/Typography'

interface Props {
  realm: Realm,
  activateRealm: Function,
  realmKey: Key,
}

const RealmSelector = ({ realm, activateRealm, realmKey }: Props) => {
  const realmContext = useContext(RealmContext)

  return <div
    key={realmKey}
    className={`flex flex-row items-center rounded p-2 hover:bg-slate-100 ${realmContext.activeRealm === realm.name ? 'bg-primary text-white hover:text-foreground' : ''}`}
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
