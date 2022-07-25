import { PencilIcon } from "@heroicons/react/solid";
import { useRouter } from 'next/router';

interface Props {
    active,
    realm,
    activateRealm,
    activateRealmConfig,
    realmKey,
}

const RealmSelector = ({active, realm, activateRealm, activateRealmConfig, realmKey}: Props) =>
  <div key={realmKey} className="h-10">
    <div className="flex">
        <div className="grow">
            <a className={(active ? 'font-bold ' : '') + ' text-black py-4 px-0'} onClick={event => {event.preventDefault(); activateRealm(realm.name);}}>{realm.name}</a>
        </div>
        <div className="flex-none">
            <a onClick={event => {event.preventDefault(); activateRealmConfig(realm.name); }}>
              <PencilIcon className="h-5 w-5 text-black" />
            </a>
        </div>
    </div>
  </div>

export default RealmSelector;
