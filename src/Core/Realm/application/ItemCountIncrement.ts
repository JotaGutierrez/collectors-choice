import RealmRepository from "../domain/RealmRepository";

const ItemCountIncrement = (repository: RealmRepository) => async (realmName) => {
    const realm = await repository.findByName(realmName)

    realm.itemCount = realm.itemCount === undefined ? 1 : realm.itemCount + 1

    await repository.update(realm)
}

export default ItemCountIncrement