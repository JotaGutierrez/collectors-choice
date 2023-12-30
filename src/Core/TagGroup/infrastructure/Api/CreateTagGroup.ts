import Realm from "../../../Realm/domain/Realm";

const saveTagGroup = async (name: String, realm: Realm) => {

  const res = await fetch('/api/tag_group/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, realm: realm.name })
  })

  await res.json()
}

export default saveTagGroup;