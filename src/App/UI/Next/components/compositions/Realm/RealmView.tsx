
import { useState } from 'react';
import { ViewListIcon, ViewGridIcon, ViewBoardsIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import InputButton from '../../components/inputButton';
import ListView from '../Item/ListView';
import GridView from '../Item/GridView';
import BoardView from '../Item/BoardView';
import InlineTags from '../Tag/InlineTags';


/** @TODO: refactor */
function ItemForm() {
  const registerItem = async event => {
    event.preventDefault();

    const res = await fetch('/api/item/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        realm: event.target.realm.value,
      }),
    });

    const result = await res.json();
    event.target.name.value = '';
  }

  const { query } = useRouter();

  if (query.realm == undefined) return <div>Select any realm to start...</div>;

  if (query.realm == '') return <div>Select any realm to start...</div>;

  return <form onSubmit={registerItem}>
    <input type="hidden" name="realm" id="realm" value={decodeURIComponent(String(query.realm))}></input>
    <InputButton name="name" placeholder="add item..." extraClassses='' />
  </form>
}


const RealmView = ({realm, tags}) => {

  /** @TODO: Use query params instead of state, ie.: ?...&view=board&property=state */
  const [view, setView] = useState('list');
  const [property, setProperty] = useState('');

  const properties = new Set([...tags.filter(tag => tag.group != '').map(tag => tag.group)]);

  return <>
    <InlineTags tags={tags} />
      <div className="flex mt-10 mb-10">
        <div className="grow flex flex-row">
            <div className={"p-2 mr-2 " + (view === 'list' ? ' border-b-4 border-bg-slate-500' : '') }>
              <ViewListIcon onClick={() => setView('list')} className="h-5 w-5 text-black" />
            </div>
            <div className={"p-2 ml-2 mr-2 " + (view === 'grid' ? ' border-b-4 border-bg-slate-500' : '') }>
              <ViewGridIcon onClick={() => setView('grid')} className="h-5 w-5 text-black"/>
            </div>
            {[...Array.from(properties)].map((_property, key) =>
              <div key={key} className={"flex flex-row p-2 leading-5 align-middle ml-2 mr-2 " + (view === 'board' && property === _property ? ' border-b-4 border-bg-slate-500 ' : '')} onClick={() => {setView('board'); setProperty(_property)}}>
                <div>
                  <ViewBoardsIcon className="h-5 w-5 text-black mr-2" />
                </div>
                <div>
                  {_property}
                </div>
              </div>
            )}
        </div>
        <div className="">
            <ItemForm />
        </div>
      </div>
      <div>
        { tags && view == 'list' && <ListView tags={tags} /> }
        { tags && view == 'grid' && <GridView tags={tags} /> }
        { tags && view == 'board' && <BoardView tags={tags} property={property} /> }
      </div>
  </>
}

export default RealmView;
