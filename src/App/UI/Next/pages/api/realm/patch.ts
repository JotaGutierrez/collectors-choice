import MongoRealmRepository from '@Core/Realm/infrastructure/MongoRealmRepository'
import { MongoClient } from 'mongodb'

export default async function handler (req, res) {
  const client = await MongoClient.connect(process.env.DB_URI)

  const realmRepository = new MongoRealmRepository(client)
  const realm = await realmRepository.findById(req.body.realm._id)

  realm.notes = req.body.description ?? realm.notes
  realm.config = req.body.config ?? realm.config

  await realmRepository.update(realm)

  res.status(200).json(await realmRepository.findAll())
}
