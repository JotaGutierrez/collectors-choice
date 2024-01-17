import Realm from './Realm';

interface RealmRepository {
    create(realm: Realm): Realm;
    update(item: Realm): Promise<Realm>;
    findAll(owner: string): Promise<Array<Realm>>;
    findById(id: string): Promise<Realm>;
    findByName(name: string, owner: string): Promise<Realm>;
    deleteById(id: string): Promise<any>;
}

export default RealmRepository;
