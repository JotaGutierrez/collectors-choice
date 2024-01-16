const createItem = async (name: string, realm: string, owner: string) => {
  const res = await fetch('/api/item/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      realm,
      owner
    })
  })

  await res.json()
}

export default createItem;
