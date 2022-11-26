import { MongoClient } from 'mongodb'
import MongoRealmRepository from '../../../../../../Core/Realm/infrastructure/MongoRealmRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)

  const realm = await realmRepository.findByName(req.query.name)

  res.status(200).json(realm === null ? {} : realm)
}
