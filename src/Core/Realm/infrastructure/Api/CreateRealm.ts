const saveRealm = async (name, owner) => {
  const res = await fetch('/api/realm/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: name,
      owner: owner
    })
  })

  await res.json()
}

export default saveRealm;