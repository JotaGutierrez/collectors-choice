import { MongoClient } from 'mongodb';
import MongoTagGroupRepository from '../../../../../../Core/TagGroup/infrastructure/MongoTagGroupRepository';
import deleteTagGroup from '../../../../../../Core/TagGroup/application/DeleteTagGroup';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const tagGroupRepository = new MongoTagGroupRepository(client);

    deleteTagGroup(tagGroupRepository)(req.body.id);

    res.status(200).json(await tagGroupRepository.findByRealm(req.body.realm));
}
