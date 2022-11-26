import { MongoClient } from 'mongodb'
import CreateRealm from '../../../../../../Core/Realm/application/CreateRealm'
import MongoRealmRepository from '../../../../../../Core/Realm/infrastructure/MongoRealmRepository'

export default async function handler (req, res) {
  const client = await MongoClient.connect('mongodb://mongo:27017/lotion')

  const realmRepository = new MongoRealmRepository(client)

  CreateRealm(realmRepository)(req.body.name)

  res.status(200).json(await realmRepository.findAll())
}
