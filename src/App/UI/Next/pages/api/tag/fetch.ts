import { MongoClient } from "mongodb";
import MongoTagRepository from '../../../../../../Core/Tag/infrastructure/MongoTagRepository';

export default async function handler(req, res) {

  const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

  const tagRepository = new MongoTagRepository(client);

  res.status(200).json(await tagRepository.findByRealm(req.query.realm));
}
