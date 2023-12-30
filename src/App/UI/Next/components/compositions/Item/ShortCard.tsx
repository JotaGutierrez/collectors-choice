import Item from '@Core/Item/domain/Item'
import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { TypographyH3 } from '../../atoms/Typography'
import { Button } from '@/components/ui/button'

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
          <TypographyH3 text={item.name} className={undefined} />
          <div>
            <Button onClick={toggleItemConfig}>
              Edit
            </Button>
          </div>
        </div>
        <div>
          <TypographyH3 text={item.notes} className={undefined} />
        </div>
      </div>
    </div>
    }

  </Draggable>
}

export default ShortCard
