import Item from '@Core/Item/domain/Item'
import { Edit } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'

interface props {
  rowKey: number;
  item: Item;
}

const ShortCard = ({ rowKey, item }: props) => {
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
          <Typography variant='h3'>
            {item.name}
          </Typography>
          <div>
            <IconButton onClick={toggleItemConfig}>
              <Edit />
            </IconButton>
          </div>
        </div>
        <div>
          <Typography>
            {item.notes}
          </Typography>
        </div>
      </div>
    </div>
    }

  </Draggable>
}

export default ShortCard
