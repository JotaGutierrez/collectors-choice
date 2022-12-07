
const saveDescription = async (event, item) =>
  await fetch('/api/item/patch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: item._id,
      notes: event
    })
  })

export default saveDescription;