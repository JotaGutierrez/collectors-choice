import Realm from '../domain/Realm';
import RealmRepository from '../domain/RealmRepository';

/** @TODO: Find realm by name to avoid duplicates */
const CreateRealm = (repository: RealmRepository) => (name: string) => repository.create(new Realm(name));

export default CreateRealm;
