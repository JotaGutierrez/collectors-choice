
const deleteItem = async (id) => {

  await fetch('/api/item/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  })
}

export default deleteItem;