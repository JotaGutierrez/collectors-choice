import { MongoClient } from 'mongodb';
import MongoTagGroupRepository from '../../../../../../Core/TagGroup/infrastructure/MongoTagGroupRepository';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const tagGroupRepository = new MongoTagGroupRepository(client);

    res.status(200).json(await tagGroupRepository.findByRealm(req.query.realm));
}
