import RealmRepository from "../domain/RealmRepository";
import {User} from "../../../App/UI/Next/middleware";

const ItemCountDecrement = (repository: RealmRepository, owner: User) => async (realmName) => {
  const realm = await repository.findByName(realmName, owner.email)

  realm.itemCount = realm.itemCount === undefined ? 0 : realm.itemCount - 1

  if (realm.itemCount < 0)
    realm.itemCount = 0

  await repository.update(realm)
}

export default ItemCountDecrement