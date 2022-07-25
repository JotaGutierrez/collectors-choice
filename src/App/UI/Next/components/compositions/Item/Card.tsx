
import { PencilIcon } from '@heroicons/react/solid';
import Modal from '../../layout/modal';
import Page from './Page';
import { useState } from 'react';
import TagSelect from '../../atoms/TagsSelect';

const Card = ({rowKey, item, tags, properties}) => {

    const [showItemConfig, setItemConfig] = useState(false);

    const toggleItemConfig = () => setItemConfig(!showItemConfig);

    const saveProperty = async (item, value, property) =>
        await fetch('/api/item/setProperty', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: item._id,
                property: property,
                value: tags.find(tag => tag.name == value)
            }),
        }
    );

    return <div className="flex font-sans border-b border-l border-t border-r rounded-lg border-slate-300 bg-white" key={rowKey}>
    <div className="flex-none w-2 relative bg-red">
        &nbsp;
    </div>
    <form className="flex-auto pr-2 py-2">
      <div className="flex">
        <h1 className="flex-grow text-lg font-semibold text-slate-900">
          {item.name}
        </h1>
        <div className="text-lg font-semibold text-slate-500">
            <PencilIcon className="h-5 w-5 text-black" onClick={toggleItemConfig} />
        </div>
      </div>
      <div>
        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2 mb-6 pb-6 border-b border-slate-200">
            {item.notes}
        </div>
      </div>
      <div className="flex space-x-4 mb-6 text-sm font-medium pb-6 border-b border-slate-200">
        <div className="flex-auto flex space-x-4">
            <TagSelect tags={tags} item={item} />
        </div>
      </div>
        {properties.map((property, key) => {
            const selectedTag = (item.tags ?? [{"name": "", "group": property}]).find(tag => tag.group == property);
            return <div key={key} className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div className="space-x-2 flex text-sm">
                {tags.filter(tag => tag.group == property).map((tag, optionKey) => <label key={optionKey}>
                    <input className="sr-only peer" name={property} type="radio" value={tag.name} checked={selectedTag && selectedTag.name == tag.name} onChange={event => saveProperty(item, event.target.value, property)} />
                    <div className="w-auto h-9 px-2 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-300 peer-checked:text-white">
                        {tag.name}
                    </div>
                </label>)}
            </div>
            </div>
        })}
      {showItemConfig && <Modal title={item.name} onClose={toggleItemConfig}><Page item={item}></Page></Modal>}
    </form>
  </div>
}

export default Card;
