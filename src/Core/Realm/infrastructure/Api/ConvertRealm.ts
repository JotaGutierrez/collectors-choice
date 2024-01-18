const convertRealm = async (realm) => {
  const res = await fetch('/api/realm/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      realm
    })
  })

  await res.json()
}

export default convertRealm;