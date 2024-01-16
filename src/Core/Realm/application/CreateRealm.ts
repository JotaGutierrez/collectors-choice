import Realm from '../domain/Realm';
import RealmRepository from '../domain/RealmRepository';

/** @TODO: Find realm by name to avoid duplicates */
const CreateRealm = (repository: RealmRepository) => (name: string, owner: string) => repository.create(new Realm(name, owner));

export default CreateRealm;
