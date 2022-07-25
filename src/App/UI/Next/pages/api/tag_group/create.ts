import { MongoClient } from 'mongodb';
import createTagGroup from '../../../../../../Core/TagGroup/application/CreateTagGroup';
import MongoTagGroupRepository from '../../../../../../Core/TagGroup/infrastructure/MongoTagGroupRepository';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const tagGroupRepository = new MongoTagGroupRepository(client);

    const propertyCreator = createTagGroup(tagGroupRepository);

    propertyCreator(req.body.name, req.body.realm);

    res.status(200).json(await tagGroupRepository.findByRealm(req.body.realm));
}
