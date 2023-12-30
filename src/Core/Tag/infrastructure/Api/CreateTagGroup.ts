const saveTag = async ({tagName, realm, group}) => {

  const res = await fetch('/api/tag/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: tagName,
      realm: realm,
      group: group
    })
  })

  await res.json()
}

export default saveTag;