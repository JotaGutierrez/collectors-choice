const saveRealm = async name => {
  const res = await fetch('/api/realm/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name: name 
    })
  })

  await res.json()
}

export default saveRealm;