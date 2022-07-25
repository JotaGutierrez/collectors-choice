import { MongoClient } from 'mongodb';
import MongoItemRepository from '../../../../../../Core/Item/infrastructure/MongoItemRepository';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const itemRepository = new MongoItemRepository(client);
    const item = await itemRepository.findById(req.body._id);

    item.notes = req.body.notes;

    const result = await itemRepository.update(item);

    res.status(200).json(await itemRepository.findAll());
}
