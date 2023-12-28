import MongoTagGroupRepository from '@Core/TagGroup/infrastructure/MongoTagGroupRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const tagGroupRepository = new MongoTagGroupRepository(client)

  res.status(200).json(await tagGroupRepository.findByRealm(req.query.realm))
}
