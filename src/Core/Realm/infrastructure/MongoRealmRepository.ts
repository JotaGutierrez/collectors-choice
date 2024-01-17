import Realm from '../domain/Realm';
import RealmRepository from '../domain/RealmRepository';
import {ObjectId} from '../../../App/UI/Next/node_modules/mongodb';


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
        await this.collection.updateOne(
            {'_id': realm._id},
            {
                $set: {
                    'name': realm.name,
                    'items': realm.items,
                    'notes': realm.notes,
                    'itemCount': realm.itemCount,
                    'config': realm.config
                },
                $currentDate: {
                    "lastModified": true
                }
            }
        )

        return realm;
    }

    async findAll(owner: string): Promise<Array<Realm>> {
        return (await this.collection.find({owner: owner}).toArray()) as Realm[];
    }

    async findById(id: string): Promise<Realm> {
        return (await this.collection.findOne({_id: new ObjectId(id)})) as Realm;
    }

    async findByName(name: string, owner: string): Promise<Realm> {
        return (await this.collection.findOne({name: name, owner: owner})) as Realm;
    }

    async deleteById(id: string): Promise<any> {
        return await this.collection.deleteOne({_id: new ObjectId(id)});
    }
}

export default MongoRealmRepository;
