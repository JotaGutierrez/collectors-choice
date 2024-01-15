
const deleteTag = async (id: string) => {
  const res = await fetch('/api/tag/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  })

  await res.json()
}

export default deleteTag;