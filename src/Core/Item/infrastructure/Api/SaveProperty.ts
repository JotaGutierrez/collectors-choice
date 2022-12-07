const saveProperty = async (item, value, property, tags) =>
  await fetch('/api/item/setProperty', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: item._id,
      property,
      value: tags.find(tag => tag.name === value)
    })
  })

export default saveProperty;