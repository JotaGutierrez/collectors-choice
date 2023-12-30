import RealmRepository from "../domain/RealmRepository";

const ItemCountDecrement = (repository: RealmRepository) => async (realmName) => {
  const realm = await repository.findByName(realmName)

  realm.itemCount = realm.itemCount === undefined ? 0 : realm.itemCount - 1

  if (realm.itemCount < 0)
    realm.itemCount = 0

  await repository.update(realm)
}

export default ItemCountDecrement