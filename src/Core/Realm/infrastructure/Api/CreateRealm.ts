const saveRealm = async (event) => {
  event.preventDefault()

  const res = await fetch('/api/realm/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: event.target.name.value })
  })

  await res.json()
}

export default saveRealm;