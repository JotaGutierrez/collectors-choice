import { MongoClient } from 'mongodb';
import MongoRealmRepository from '../../../../../../Core/Realm/infrastructure/MongoRealmRepository';

export default async function handler(req, res) {
    const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

    const realmRepository = new MongoRealmRepository(client);
    const realm = await realmRepository.findById(req.body.realm._id);

    realm.notes = req.body.description;

    realmRepository.update(realm);

    res.status(200).json(await realmRepository.findAll());
}
