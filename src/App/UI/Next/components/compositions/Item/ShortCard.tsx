import Modal from '../../layout/modal'
import Page from './Page'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'

const ShortCard = ({ rowKey, item, tags, properties }) => {
  const [showItemConfig, setItemConfig] = useState(false)

  const toggleItemConfig = () => setItemConfig(!showItemConfig)

  return <Draggable draggableId={item._id} index={rowKey}>
    {provided => <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div>
                &nbsp;
            </div>
            <div>
            <div>
                <h1>
                {item.name}
                </h1>
                <div>
                    <IconButton onClick={toggleItemConfig}>
                        <Edit />
                    </IconButton>
                </div>
            </div>
            <div>
                <div>
                    {item.notes}
                </div>
            </div>
            {showItemConfig && <Modal title={item.name} onClose={toggleItemConfig}><Page item={item}></Page></Modal>}
            </div>
        </div>
    }

  </Draggable>
}

export default ShortCard
