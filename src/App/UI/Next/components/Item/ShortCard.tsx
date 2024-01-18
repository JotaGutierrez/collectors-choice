import Item from '@Core/Item/domain/Item'
import { Draggable } from '@hello-pangea/dnd'
import { TypographyH3, TypographyH4 } from '../Shared/Typography'

interface props {
  rowKey: number;
  item: Item;
}

const ShortCard = ({ rowKey, item }: props) => {
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
          <TypographyH3 text={item.name} />
        </div>
        <div>
          <TypographyH4 text={item.notes} />
        </div>
      </div>
    </div>
    }

  </Draggable>
}

export default ShortCard
