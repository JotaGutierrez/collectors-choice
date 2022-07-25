import Realm from './Realm';

interface RealmRepository {
    create(realm: Realm): Realm;
    update(item: Realm): Promise<Realm>;
    findAll(): Promise<Array<Realm>>;
    findById(id: string): Promise<Realm>;
    findByName(name: string): Promise<Realm>;
    deleteById(id: string): Promise<any>;
}

export default RealmRepository;
