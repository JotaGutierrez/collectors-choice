import { MongoClient } from 'mongodb';
import MongoItemRepository from '../../../../../../Core/Item/infrastructure/MongoItemRepository';
import CreateItem from '../../../../../../Core/Item/application/CreateItem';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const itemRepository = new MongoItemRepository(client);

    /** @TODO: Use DI from yaml files */
    const itemCreator = CreateItem(itemRepository);

    itemCreator(req.body.name, req.body.realm);

    res.status(200).json(await itemRepository.findAll());
}
