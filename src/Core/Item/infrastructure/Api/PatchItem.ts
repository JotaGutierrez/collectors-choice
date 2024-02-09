import Item from "../../domain/Item";

const patchItem = async (event: any, item: Item) =>
  await fetch('/api/item/patch', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: item._id,
      ...event
    })
  })

export default patchItem;