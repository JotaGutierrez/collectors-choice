import Item from '@Core/Item/domain/Item'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useEffect, useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

interface props {
  params: any;
  items: Array<Item>;
}

const Board = ({ params, items }: props) => {
  /** We need a copy in the state to reflect dnd changes without depending on hooks reloading */
  const memoColumns = useMemo(() => {
    const initialColumns = {
      UNSET: items.filter(item => item.tags ? item.tags.filter(tag => tag.group === params.property).length === 0 : true)
    }

    // eslint-disable-next-line no-return-assign
    params.values.map(property =>
      initialColumns[property._id] = items.filter(
        item => item.tags ? item.tags.filter(tag => tag.group === params.property && tag.name === property.name).length > 0 : false
      ).sort(
        (a, b) => {
          const itemTagOrdersA = a.itemTagOrders
            ? a.itemTagOrders.filter(
              tagOrder => tagOrder.tag.group === params.property && tagOrder.tag.name === property.name
            )
            : [{ order: 0 }]

          const orderA = itemTagOrdersA[0] ? itemTagOrdersA[0].order : 0

          const itemTagOrdersB = b.itemTagOrders
            ? b.itemTagOrders.filter(
              tagOrder => tagOrder.tag.group === params.property && tagOrder.tag.name === property.name
            )
            : [{ order: 0 }]

          const orderB = itemTagOrdersB[0] ? itemTagOrdersB[0].order : 0

          if (orderA < orderB) {
            return -1
          }

          if (orderA > orderB) {
            return 1
          }

          return 0
        }
      ))
    return initialColumns
  }, [items, params])

  const [columns, setColumns] = useState(memoColumns)

  useEffect(() => setColumns(memoColumns), [memoColumns])

  /** @TODO: Refactor */
  const saveProperty = async (item: Item, tagId: number, property: string, index: number) => {
    await fetch('/api/item/setProperty', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item._id,
        tagId,
        property,
        index
      })
    })
  }

  const onDragEnd = async result => {
    const { destination, source } = result

    if (!result.destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    const property = params.property
    const value = result.destination.droppableId

    if (start === finish) {
      const newItems = Array.from(start)
      const droppedItem = newItems.slice(source.index, source.index + 1)

      newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, ...droppedItem)

      const newColumns = {
        ...columns,
        [source.droppableId]: newItems
      }

      /** @TODO: This makes a call for each item. Create a controller for column reordering operation */
      newItems.map(async (item, index) => await saveProperty(item as Item, value, property, index))

      setColumns(newColumns)
      return
    }

    const startItems = Array.from(start)
    const droppedItem = startItems.slice(source.index, source.index + 1)

    startItems.splice(source.index, 1)

    const finishItems = Array.from(finish)
    finishItems.splice(destination.index, 0, ...droppedItem)

    const newState = {
      ...columns,
      [source.droppableId]: startItems,
      [destination.droppableId]: finishItems
    }

    /** @TODO: This makes a call for each item. Create a controller for column reordering operation */
    finishItems.map(async (item, index) => await saveProperty(item as Item, destination.droppableId, property, index))

    setColumns(newState)
  }

  return <div className={'grid w-full border-collapse gap-4 grid-cols-' + (params.values.length + 1)}>
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div>
        <div className='text-sm font-bold text-gray-400 px-6 py-2 text-left'>Unset</div>
        <Droppable droppableId={'UNSET'}>
          {provided =>
            <div
              className="flex gap-2 flex-col bg-slate-100 p-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columns.UNSET && columns.UNSET.map((item, itemKey) =>
                <Draggable draggableId={item._id} index={itemKey} key={item._id}>
                  {provided => <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                  </Card>}
                </Draggable>
              )}
              {provided.placeholder}
            </div>
          }
        </Droppable>
      </div>
      {params.values.map((property, key) =>
        <div key={key}>
          <div className='text-sm font-bold text-gray-400 px-6 py-2 text-left'>{property.name}</div>
          <Droppable droppableId={property._id.toString()}>
            {provided =>
              <div
                className="flex gap-2 flex-col bg-slate-100 p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns[property._id] && columns[property._id].map((item, itemKey) =>
                  <Draggable draggableId={item._id} index={itemKey} key={item._id}>
                    {provided => <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                    </Card>}
                  </Draggable>
                )}
                {provided.placeholder}
              </div>
            }
          </Droppable>
        </div>
      )}
    </DragDropContext>
  </div>
}

export default Board
