import { ChevronLeftIcon, TrashIcon } from "@heroicons/react/solid";
import { Transition } from '@tailwindui/react';
import Select from '../../atoms/Select';
import InputButton from "../../components/inputButton";
import { useState } from 'react';
import useSWR from 'swr';
import { Autosave } from 'react-autosave';

const fetcher = (url, queryParams = '') => fetch(`${url}${queryParams}`).then(r => r.json());

/** @TODO: Refactor. Split modules */
const RealmConfig = ({realm, tags}) => {

  const [showDescription, setShowDescription] = useState(false);
  const [showTagGroups, setShowTagGroups] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);

  const [realmNotes, setRealmNotes] = useState(realm.notes);

  const saveTagGroup = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/tag_group/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: event.target.name.value, realm: realm.name}),
    });

    const result = await res.json();
  }

  const saveRealmNotes = async notes => {
    const res = await fetch('/api/realm/patch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({description: notes, realm: realm}),
    });

    const result = await res.json();
  }

  const saveTag = async (event) => {
    event.preventDefault();

    const res = await fetch('/api/tag/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: event.target.name.value,
        realm: event.target.realm.value,
        group: event.target.group.value,
      }),
    });

    const result = await res.json();
  }

  const deleteTag = async (id: string) => {

    const res = await fetch('/api/tag/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const result = await res.json();
  }

  const deleteTagGroup = async (id: string) => {

    const res = await fetch('/api/tag_group/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const result = await res.json();
  }


  const { data, error } = useSWR(['/api/tag_group/fetch', '?realm=' + realm.name], fetcher);

  if (error) return <div>Failed to load</div>
  if (data === undefined) return <div>Loading...</div>

  return <div className="space-x-2 flex text-sm">
    <div className="flex flex-col grow">
      <div className=" mt-4 mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="grow text-sm font-bold text-gray-400 px-6 py-2 text-left">Realm description</div>
          <div className={showDescription ? "-rotate-90" : ""}>
            <ChevronLeftIcon className="h-5 w-5 text-black" onClick={() => setShowDescription(!showDescription)} />
          </div>
        </div>
        <Transition
          show={showDescription}
          enter="transition-opacity duration-750"
          enterFrom="opacity-0"
          enterTo="opacity-auto"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex mt-4 mb-6 px-6 pb-6">
            <div className="grow">
              <textarea className="inline-block focus:ring-1 focus:ring-slate-200 rounded
                        focus:outline-none appearance-none w-full h-20 text-sm
                        text-slate-900 placeholder-slate-400 p-4 ring-1
                        ring-slate-200 shadow-sm"
                        name="notes"
                        id="notes"
                        placeholder="Add realm notes..."
                        defaultValue={realm.notes}
                        onChange={e => setRealmNotes(e.target.value)}
              />
              <Autosave data={realmNotes} onSave={saveRealmNotes} />
            </div>
          </div>
        </Transition>
      </div>

      <div className=" mt-4 mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center">
          <div className="grow text-sm font-bold text-gray-400 px-6 py-2 text-left">Realm properties</div>
          <div className={showTagGroups ? "-rotate-90" : ""}><ChevronLeftIcon className="h-5 w-5 text-black" onClick={() => setShowTagGroups(!showTagGroups)} /></div>
        </div>
        <Transition
          show={showTagGroups}
          enter="transition-opacity duration-750"
          enterFrom="opacity-0"
          enterTo="opacity-auto"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm items-center">{data.map(((data, groupKey) =>
              <>
                <div className="font-bold py-1 pl-6 rounded-full" key={groupKey}>{data.name}</div>
                <TrashIcon className="h-5 w-5 text-black mr-6" onClick={() => deleteTagGroup(data._id)} />
              </>
          ))}</div>
          </div>
          <form onSubmit={saveTagGroup} className="grow">
            <div className="grow">
              <div className="flex">
                <div className="w-full text-right">
                  <InputButton name="name" placeholder="Add realm property..." />
                </div>
              </div>
            </div>
          </form>
        </Transition>
      </div>

      <div className=" mt-4 mb-6 pb-6 ">
        <div className="flex items-center">
          <div className="grow text-sm font-bold text-gray-400 px-6 py-2 text-left">Realm tags</div>
          <div className={showAddTag ? "-rotate-90" : ""}><ChevronLeftIcon onClick={() => setShowAddTag(!showAddTag)} className="h-5 w-5 text-black" /></div>
        </div>

        <Transition
          show={showAddTag}
          enter="transition-opacity duration-750"
          enterFrom="opacity-0"
          enterTo="opacity-auto"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            {/**
             * @TODO: Refactor tag inline component
             */}
            <div className="flex mt-4 mb-6 pb-6 border-b border-slate-200">
                <div className="space-x-2 flex text-sm items-center">
                    { Array.isArray(tags) && tags.map((function(tag, key) {
                        return <>
                          <button className="font-bold py-1 pl-6 rounded-full" key={key}>{tag.name}</button>
                          <TrashIcon className="h-5 w-5 text-black mr-6" onClick={() => deleteTag(tag._id)} />
                        </>;
                    })) }
                </div>
            </div>
          <div className="space-x-2 flex text-sm justify-end">
            <form onSubmit={saveTag}>
              <div className="flex items-baseline">
                <input type="hidden" name="realm" id="realm" value={realm.name}></input>
                <div className="inline-flex pr-2">
                  <Select name="group" onChange={null} selected={null}>
                    <option value="">(optional) property...</option>{Array.isArray(data) && data.map((group, key) => <option key={key}>{group.name}</option>)}
                  </Select>
                </div>
                <InputButton name="name" placeholder="Add tag..." />
              </div>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </div>
}

export default RealmConfig;
