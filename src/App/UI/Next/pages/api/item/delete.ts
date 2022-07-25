import { MongoClient } from 'mongodb';
import MongoItemRepository from '../../../../../../Core/Item/infrastructure/MongoItemRepository';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const itemRepository = new MongoItemRepository(client);

    const id = req?.body?.id;

    try {
        const result = await itemRepository.deleteById(id);

        if (result && result.deletedCount) {
            res.status(202).send();
        } else if (!result) {
            res.status(400).send();
        } else if (!result.deletedCount) {
            res.status(404).send();
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}
