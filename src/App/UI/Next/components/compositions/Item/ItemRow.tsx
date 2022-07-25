
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Select from '../../atoms/Select';
import TagSelect from '../../atoms/TagsSelect';
import { useState } from 'react';
import Page from './Page';
import Modal from '../../layout/modal';

const ItemRow = ({rowKey, item, tags, properties}) => {

    const [showItemConfig, setItemConfig] = useState(false);

    const toggleItemConfig = () => setItemConfig(!showItemConfig);

    const deleteItem = async (event, id) => {
        event.preventDefault();

        const res = await fetch('/api/item/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: id}),
        });
      }

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

    return <tr key={rowKey}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.name}
            <br />
            <TagSelect tags={tags} item={item} />
        </td>
        {properties.map((property, key) => {
            const selectedTag = (item.tags ?? [{"name": "", "group": property}]).find(tag => tag.group == property);
            return <td key={key} className="px-6 py-4 whitespace-nowrap">
            <Select name="" onChange={event => saveProperty(item, event.target.value, property)} selected={selectedTag && selectedTag.name}>
                <option value=""></option>
                {tags.filter(tag => tag.group == property).map((tag, key) => <option key={key} value={tag.name}>{tag.name}</option>)}
            </Select>
            </td>
        })}
        <td>{item.notes}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <PencilIcon className="h-5 w-5 text-black" onClick={toggleItemConfig} />
            <TrashIcon onClick={(event) => deleteItem(event, item._id)} className="h-5 w-5 text-black" />
            {showItemConfig && <Modal title={item.name} onClose={toggleItemConfig}><Page item={item}></Page></Modal>}
        </td>
    </tr>
}

export default ItemRow;
