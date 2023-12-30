const saveRealmConfig = async (config, realm) => {
  const res = await fetch('/api/realm/patch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ config, realm })
  })

  await res.json()
}

export default saveRealmConfig;