const saveRealmNotes = async (notes, realm) => {
  const res = await fetch('/api/realm/patch', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ description: notes, realm })
  })

  await res.json()
}

export default saveRealmNotes;