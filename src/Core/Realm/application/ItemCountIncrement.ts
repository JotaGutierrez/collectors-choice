import RealmRepository from "../domain/RealmRepository";

const ItemCountIncrement = (repository: RealmRepository, owner: string) => async (realmName: string) => {
    const realm = await repository.findByName(realmName, owner)

    realm.itemCount = realm.itemCount === undefined ? 1 : realm.itemCount + 1

    await repository.update(realm)
}

export default ItemCountIncrement