
import Tag from '../domain/Tag';
import TagRepository from '../domain/TagRepository';
import { ObjectId } from 'mongodb';
import create from '../application/CreateTag';

class MongoTagRepository implements TagRepository
{
    db;
    collection;

    constructor(client) {
        this.db = client.db('collectors_choice');
        this.collection = this.db.collection('tag');
    }

    create(tag: Tag): Tag {
        this.collection.insertOne(tag);

        return tag;
    }

    async findById(id: string): Promise<Tag> {
        return (await this.collection.findOne({_id: new ObjectId(id)})) as Tag;
    }

    async findByName(name: string): Promise<Tag> {
        return (await this.collection.findOne({'name': name})) as Tag;
    }

    async findByRealm(realm: string): Promise<Array<Tag>> {
        return (await this.collection.find({'realm': realm}).toArray()) as Tag[];
    }

    async findAll(): Promise<Array<Tag>> {
        return (await this.collection.find().toArray()) as Tag[];
    }

    async deleteById(id: string): Promise<any> {
        return await this.collection.deleteOne({_id: new ObjectId(id)});
    }
}

export default MongoTagRepository;
