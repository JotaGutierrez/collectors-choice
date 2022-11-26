import { MongoClient } from 'mongodb'
import MongoTagRepository from '../../../../../../Core/Tag/infrastructure/MongoTagRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagRepository = new MongoTagRepository(client)

  res.status(200).json(await tagRepository.findByRealm(req.query.realm))
}
