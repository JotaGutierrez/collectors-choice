
import Realm from '../domain/Realm';
import RealmRepository from '../domain/RealmRepository';
import CreateRealm from '../application/CreateRealm'; 
import { ObjectId } from '../../../App/UI/Next/node_modules/mongodb';


class MongoRealmRepository implements RealmRepository
{
    db;
    collection;

    constructor(client) {
        this.db = client.db('collectors_choice');
        this.collection = this.db.collection('realm');
    }

    create(realm: Realm): Realm {
        this.collection.insertOne(realm);

        return realm;
    }

    async update(realm: Realm): Promise<Realm> {
        const result = await this.collection.updateOne(
            {'_id': realm._id},
            {
                $set: {
                    'name': realm.name,
                    'items': realm.items,
                    'notes': realm.notes
                },
                $currentDate: {
                    "lastModified": true
                }
            }
        )

        return realm;
    }

    async findAll(): Promise<Array<Realm>> {
        return (await this.collection.find().toArray()) as Realm[];
    }

    async findById(id: string): Promise<Realm> {
        return (await this.collection.findOne({_id: new ObjectId(id)})) as Realm;
    }

    async findByName(name: string): Promise<Realm> {
        return (await this.collection.findOne({name: name})) as Realm;
    }

    async deleteById(id: string): Promise<any> {
        return await this.collection.deleteOne({_id: new ObjectId(id)});
    }
}

export default MongoRealmRepository;
