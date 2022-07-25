
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import RealmSelector from '../compositions/Realm/RealmSelector';
import InputButton from '../components/inputButton';
import Logo from '../components/Logo';

/**
 * @TODO Refactor
 */
const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json());

const Aside = () => {
  const router = useRouter();

  const [activeRealm, setActiveRealm] = useState(decodeURIComponent(String(router.query.realm ?? '')));
  const [realmPage, setRealmPage] = useState(decodeURIComponent(String(router.query.page ?? '')));

  const activateRealm = realm => {
    setRealmPage('');
    setActiveRealm(realm);
  }

  const activateRealmConfig = realm => {
    setRealmPage('config');
    setActiveRealm(realm);
  }

  useEffect(() => {
      if(!router.isReady) return;
      if (router.query.realm === encodeURIComponent(activeRealm)
          && router.query.page === realmPage
      ) return;

      router.query = {
        realm: encodeURIComponent(activeRealm),
        page: realmPage,
      };

      router.push(
        {
          pathname: router.route,
          query: { ...router.query }
        }
      );
    }, [activeRealm, realmPage, router] );

  const saveRealm = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/realm/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: event.target.name.value}),
    });

    const result = await res.json();
  }

  const { data, error } = useSWR(['/api/realm/fetch'], fetcher);

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return (
    <>
      <Logo />
      <div className="flex text-sm flex-col">
          {
              data.map(((realm, key) =>
                <RealmSelector
                  key={key}
                  realm={realm}
                  realmKey={key}
                  activateRealm={activateRealm}
                  activateRealmConfig={activateRealmConfig}
                  active={activeRealm == realm.name}
                />
              ))
          }
      </div>
      <div className="space-x-2 flex text-sm">
        <form onSubmit={saveRealm}>
          <InputButton name="name" placeholder="Add realm..." />
        </form>
      </div>
    </>
  )
}

export default Aside;
