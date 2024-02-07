import Item from '../domain/Item';
import ItemRepository from '../domain/ItemRepository';
import {ObjectId} from '../../../App/UI/Next/node_modules/mongodb';
import Criteria from '../domain/Criteria';
import EventBus from "../../Shared/Infrastructure/EventBus/EventBus";
import ItemCreatedEvent from "../domain/ItemCreatedEvent";
import ItemDeletedEvent from "../domain/ItemDeletedEvent";

class MongoItemRepository implements ItemRepository
{
    db;
    collection;

    constructor(client) {
        this.db = client.db('collectors_choice');
        this.collection = this.db.collection('item');
    }

    create(item: Item): Item {
        this.collection.insertOne(item);

        EventBus.getInstance().dispatch<any>(ItemCreatedEvent, item.realm)

        return item;
    }

    async update(item: Item): Promise<Item> {
        await this.collection.updateOne(
            {'_id': item._id},
            {
                $set: {
                    'name': item.name,
                    'notes': item.notes,
                    'tags': item.tags,
                    'realm': item.realm,
                    'itemTagOrders': item.itemTagOrders,
                },
                $currentDate: {
                    "lastModified": true
                }
            }
        )

        return item;
    }

    async findAll(): Promise<Array<Item>> {
        return (await this.collection.find().sort({order: -1}).toArray()) as Item[];
    }

    async findById(id: string): Promise<Item> {
        return (await this.collection.findOne({_id: new ObjectId(id)})) as Item;
    }

    async findByTags(tags: Array<string>) : Promise<Array<Item>> {
        return (await this.collection.find(
            {"tags.name": {"$all": [...tags] }}
        ).sort({order: -1}).toArray()) as Item[];
    }

    async findByRealm(realm: string) : Promise<Array<Item>> {
        return (await this.collection.find(
            {"realm": realm }
        ).sort({order: -1}).toArray()) as Item[];
    }

    async deleteById(id: string): Promise<any> {
        const item = await this.findById(id);

        EventBus.getInstance().dispatch<any>(ItemDeletedEvent, item.realm)

        return await this.collection.deleteOne({_id: new ObjectId(id)});
    }

    async findByCriteria(criteria: Criteria): Promise<Item[]> {
        return (
            await this.collection.find(
                criteria.criteria()
            )
            .sort({order: -1})
            .toArray()
        ) as Item[];
    }
}

export default MongoItemRepository;
