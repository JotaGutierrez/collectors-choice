const createItem = async (name: string, realm: string) => {
  const res = await fetch('/api/item/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      realm
    })
  })

  await res.json()
}

export default createItem;
