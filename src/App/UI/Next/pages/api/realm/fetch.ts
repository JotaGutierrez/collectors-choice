import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)

  res.status(200).json(await realmRepository.findAll())
}
