import Realm from '../domain/Realm';
import RealmRepository from '../domain/RealmRepository';
import RealmConfig from "../domain/RealmConfig";

const CreateRealm = (repository: RealmRepository) => async (name: string, owner: string) => {
  const realm = await repository.findByName(name, owner)

  if (!realm) {
    const realm = new Realm(name, owner)
    realm.config = new RealmConfig({view: 'list', property: null})

    repository.create(realm)
  }
}

export default CreateRealm;
