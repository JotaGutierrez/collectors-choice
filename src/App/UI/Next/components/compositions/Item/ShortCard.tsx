
import { PencilIcon } from '@heroicons/react/solid';
import Modal from '../../layout/modal';
import Page from './Page';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ShortCard = ({rowKey, item, tags, properties}) => {

    const [showItemConfig, setItemConfig] = useState(false);

    const toggleItemConfig = () => setItemConfig(!showItemConfig);

    return <Draggable draggableId={item._id} index={rowKey}>
    {provided => <div className="flex font-sans border-b border-l border-t border-r rounded-lg border-slate-300 bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className="flex-none w-2 relative bg-red">
                &nbsp;
            </div>
            <div className="flex-auto p-2">
            <div className="flex">
                <h1 className="flex-grow text-lg font-semibold text-slate-900">
                {item.name}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                    <PencilIcon className="h-5 w-5 text-black" onClick={toggleItemConfig} />
                </div>
            </div>
            <div>
                <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2 mb-6">
                    {item.notes}
                </div>
            </div>
            {showItemConfig && <Modal title={item.name} onClose={toggleItemConfig}><Page item={item}></Page></Modal>}
            </div>
        </div>
    }

  </Draggable>
}

export default ShortCard;
