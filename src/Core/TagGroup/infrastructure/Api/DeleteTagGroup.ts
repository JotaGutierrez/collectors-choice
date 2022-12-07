const deleteTagGroup = async (id: string) => {
  const res = await fetch('/api/tag_group/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  })

  await res.json()
}

export default deleteTagGroup;