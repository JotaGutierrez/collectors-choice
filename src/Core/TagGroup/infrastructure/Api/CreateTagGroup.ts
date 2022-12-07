const saveTagGroup = async (event, realm) => {
  event.preventDefault()

  const res = await fetch('/api/tag_group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: event.target.name.value, realm: realm.name })
  })

  await res.json()
}

export default saveTagGroup;