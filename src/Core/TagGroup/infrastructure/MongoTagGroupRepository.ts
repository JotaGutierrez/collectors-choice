
import TagGroup from '../domain/TagGroup';
import TagGroupRepository from '../domain/TagGroupRepository';
import { ObjectId } from 'mongodb';

class MongoTagGroupRepository implements TagGroupRepository
{
    db;
    collection;

    constructor(client) {
        this.db = client.db('collectors_choice');
        this.collection = this.db.collection('tag_group');
    }

    create(tagGroup: TagGroup): TagGroup {
        this.collection.insertOne(tagGroup);

        return tagGroup;
    }

    async findByName(name: string): Promise<TagGroup> {
        return (await this.collection.findOne({'name': name})) as TagGroup;
    }

    async findByRealm(realm: string): Promise<Array<TagGroup>> {
        return (await this.collection.find({'realm': realm}).toArray()) as TagGroup[];
    }

    async deleteById(id: string): Promise<any> {
        return await this.collection.deleteOne({_id: new ObjectId(id)});
    }
}

export default MongoTagGroupRepository;
