import { MongoClient } from "mongodb";
import MongoTagRepository from '../../../../../../Core/Tag/infrastructure/MongoTagRepository';
import DeleteTag from '../../../../../../Core/Tag/application/DeleteTag';

export default async function handler(req, res) {

  const client = await MongoClient.connect('mongodb://mongo:27017/lotion');

  const tagRepository = new MongoTagRepository(client);

  DeleteTag(tagRepository)(req.body.id);

  res.status(200).json(await tagRepository.findAll());
}
