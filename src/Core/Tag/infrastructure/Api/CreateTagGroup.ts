const saveTag = async (event) => {
  event.preventDefault()

  const res = await fetch('/api/tag/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: event.target.name.value,
      realm: event.target.realm.value,
      group: event.target.group.value
    })
  })

  await res.json()
}

export default saveTag;